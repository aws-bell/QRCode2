package controller

import (
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/matthewyuh246/qrcode_go/model"
	"github.com/matthewyuh246/qrcode_go/usecase"
)

type IQRCodeController interface {
	GenerateQRCode(c echo.Context) error
	GetRecentQRCodes(c echo.Context) error
	GetFavoriteQRCodes(c echo.Context) error
	EditQRCode(c echo.Context) error
}

type qrcodeController struct {
	qu usecase.IQRCodeUsecase
}

func NewQRCodeController(qu usecase.IQRCodeUsecase) IQRCodeController {
	return &qrcodeController{qu}
}

func (qc *qrcodeController) GenerateQRCode(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"].(float64)

	var requestBody struct {
		Text       string `json:"text"`
		IsFavorite bool   `json:"is_favorite"`
		Title      string `json:"title"`
	}

	if err := c.Bind(&requestBody); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request"})
	}

	qrCode, err := qc.qu.GenerateQRCode(requestBody.Text, requestBody.Title, requestBody.IsFavorite)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to generate QR code"})
	}

	qrCode.UserId = uint(userId)

	err = qc.qu.SaveQRCode(qrCode)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to save QR code"})
	}

	return c.Blob(http.StatusOK, "image/png", qrCode.Image)
}

func (qc *qrcodeController) GetRecentQRCodes(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"].(float64)
	limitStr := c.QueryParam("limit")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 4
	}

	qrCodes, err := qc.qu.GetRecentQRCodes(limit, uint(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch recent QR codes"})
	}

	return c.JSON(http.StatusOK, qrCodes)
}

func (qc *qrcodeController) GetFavoriteQRCodes(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"].(float64)
	limitStr := c.QueryParam("limit")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10
	}

	qrCodes, err := qc.qu.GetFavoriteQRCodes(limit, uint(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch favorite QR codes"})
	}

	return c.JSON(http.StatusOK, qrCodes)
}

func (qc *qrcodeController) EditQRCode(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"].(float64)

	qrCodeFile, err := c.FormFile("qrcode")
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Could not get QR code image"})
	}

	embedImageFile, err := c.FormFile("embed_image")
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Could not get embedded image"})
	}

	colorCode := c.FormValue("color")
	if colorCode == "" {
		colorCode = "#000000"
	}

	title := c.FormValue("title")

	isFavoriteStr := c.FormValue("is_favorite")
	isFavorite := false
	if isFavoriteStr != "" {
		val, err := strconv.ParseBool(isFavoriteStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid value for is_favorite"})
		}
		isFavorite = val
	}

	req := &model.RequestQRCode{
		QRCodeFile:     qrCodeFile,
		EmbedImageFile: embedImageFile,
		Color:          colorCode,
		Title:          title,
		IsFavorite:     isFavorite,
	}

	ChangedImage, err := qc.qu.ChangeQRCode(req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Image processing failed"})
	}

	ChangedImage.UserId = uint(userId)

	err = qc.qu.SaveQRCode(ChangedImage)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to save QR code"})
	}

	return c.Blob(http.StatusOK, "image/png", ChangedImage.Image)
}
