package usecase

import (
	"bytes"
	"fmt"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"strconv"

	"github.com/disintegration/imaging"
	"github.com/matthewyuh246/qrcode_go/model"
	"github.com/matthewyuh246/qrcode_go/repository"
	"github.com/skip2/go-qrcode"
)

type IQRCodeUsecase interface {
	GenerateQRCode(text string, title string, is_favorite bool) (*model.QRCode, error)
	SaveQRCode(qrCode *model.QRCode) error
	GetRecentQRCodes(limit int, userId uint) ([]model.QRCode, error)
	GetFavoriteQRCodes(limit int, userId uint) ([]model.QRCode, error)
	ChangeQRCode(req *model.RequestQRCode) (*model.QRCode, error)
}

type qrcodeUsecase struct {
	qr repository.IQRCodeRepository
}

func NewQRCodeUsecase(qr repository.IQRCodeRepository) IQRCodeUsecase {
	return &qrcodeUsecase{qr}
}

func (qu *qrcodeUsecase) GenerateQRCode(text string, title string, is_favorite bool) (*model.QRCode, error) {
	qr, err := qrcode.New(text, qrcode.High)
	if err != nil {
		return nil, err
	}

	data, err := qr.PNG(256)
	if err != nil {
		return nil, err
	}

	return &model.QRCode{
		Text:       text,
		Title:      title,
		IsFavorite: is_favorite,
		Image:      data,
	}, nil
}

func (qu *qrcodeUsecase) SaveQRCode(qrCode *model.QRCode) error {
	return qu.qr.Save(qrCode)
}

func (qu *qrcodeUsecase) GetRecentQRCodes(limit int, userId uint) ([]model.QRCode, error) {
	return qu.qr.FindRecent(limit, userId)
}

func (qu *qrcodeUsecase) GetFavoriteQRCodes(limit int, userId uint) ([]model.QRCode, error) {
	return qu.qr.FindFavorite(limit, userId)
}

func (qu *qrcodeUsecase) ChangeQRCode(req *model.RequestQRCode) (*model.QRCode, error) {
	qrFile, err := req.QRCodeFile.Open()
	if err != nil {
		return nil, err
	}
	defer qrFile.Close()
	qrImg, _, err := image.Decode(qrFile)
	if err != nil {
		return nil, err
	}

	embedFile, err := req.EmbedImageFile.Open()
	if err != nil {
		return nil, err
	}
	defer embedFile.Close()
	embedImg, _, err := image.Decode(embedFile)
	if err != nil {
		return nil, err
	}

	// 埋め込む画像のサイズを調整
	embedSize := qrImg.Bounds().Size().X / 4
	embedImg = imaging.Resize(embedImg, embedSize, embedSize, imaging.Lanczos)

	// 埋め込み位置の計算
	offset := image.Pt(
		(qrImg.Bounds().Dx()-embedImg.Bounds().Dx())/2,
		(qrImg.Bounds().Dy()-embedImg.Bounds().Dy())/2,
	)

	// QRコードの色を変更
	qrRGBA := imaging.Clone(qrImg)
	targetColor, err := parseHexColor(req.Color)
	if err != nil {
		return nil, err
	}
	for x := 0; x < qrRGBA.Bounds().Dx(); x++ {
		for y := 0; y < qrRGBA.Bounds().Dy(); y++ {
			r, g, b, a := qrRGBA.At(x, y).RGBA()
			// 黒いピクセルを特定し、新しい色に変更
			if r == 0 && g == 0 && b == 0 && a != 0 {
				qrRGBA.Set(x, y, targetColor)
			}
		}
	}

	// 新しい画像を作成し、QRコードと埋め込み画像を描画
	outImg := image.NewRGBA(qrImg.Bounds())
	draw.Draw(outImg, qrImg.Bounds(), qrRGBA, image.Point{0, 0}, draw.Src)
	draw.Draw(outImg, embedImg.Bounds().Add(offset), embedImg, image.Point{0, 0}, draw.Over)

	// 画像をPNG形式でエンコード
	var buf bytes.Buffer
	err = png.Encode(&buf, outImg)
	if err != nil {
		return nil, err
	}
	imageData := buf.Bytes()

	qrCode := &model.QRCode{
		Title:      req.Title,
		Image:      imageData,
		IsFavorite: false,
	}

	return qrCode, nil
}

// 16進数の色コードをcolor.RGBAに変換
func parseHexColor(s string) (color.RGBA, error) {
	c := color.RGBA{A: 255}
	if len(s) != 7 || s[0] != '#' {
		return c, fmt.Errorf("invalid color format")
	}
	r, err := strconv.ParseUint(s[1:3], 16, 8)
	if err != nil {
		return c, err
	}
	g, err := strconv.ParseUint(s[3:5], 16, 8)
	if err != nil {
		return c, err
	}
	b, err := strconv.ParseUint(s[5:7], 16, 8)
	if err != nil {
		return c, err
	}
	c.R = uint8(r)
	c.G = uint8(g)
	c.B = uint8(b)
	return c, nil
}
