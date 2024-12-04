package model

import (
	"mime/multipart"
	"time"
)

type QRCode struct {
	ID         int64     `gorm:"primaryKey" json:"id"`
	Title      string    `json:"title"`
	Text       string    `json:"text"`
	Image      []byte    `json:"image"`
	IsFavorite bool      `json:"is_favorite" gorm:"default:false"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	User       User      `json:"user"`
	UserId     uint      `json:"user_id"`
}

type RequestQRCode struct {
	QRCodeFile     *multipart.FileHeader `json:"qrcode_file"`
	EmbedImageFile *multipart.FileHeader `json:"embed_image_file"`
	Color          string                `json:"color"`
	Title          string                `json:"title"`
	IsFavorite     bool                  `json:"is_favorite" gorm:"default:false"`
}

type QRCodeResponse struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Title      string    `json:"Title"`
	Text       string    `json:"text" gorm:"not null"`
	Image      []byte    `json:"image"`
	IsFavorite bool      `json:"is_favorite"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
