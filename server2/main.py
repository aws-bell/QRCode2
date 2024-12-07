from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from amzqr import amzqr
import io
import os
import base64

app = FastAPI()

# CORS設定（フロントエンドがhttp://localhost:3000などで動いている場合）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて特定のオリジンに絞る
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate(
    text: str = Form(...),
    gif_image: UploadFile = File(...)
):
    # 一時ファイルに保存
    gif_path = "temp_gif.gif"

    # アップロードファイルを保存
    with open(gif_path, "wb") as f:
        f.write(await gif_image.read())

    # amzqrを使用してアニメーションQRコードを生成
    output_path = "output.gif"
    amzqr.run(
        text,  # QRコードに埋め込むデータ
        version=1,  # QRコードのバージョン（サイズ）
        level='H',  # 誤り訂正レベル（L, M, Q, Hのいずれか）
        picture=gif_path,  # GIF背景画像
        colorized=True,  # カラーQRコードを生成
        save_name=output_path,  # 保存先
        save_dir="."  # 保存ディレクトリ
    )

    # 生成されたGIFをメモリに読み込む
    with open(output_path, "rb") as f:
        gif_data = f.read()

    # 一時ファイル削除
    os.remove(gif_path)
    os.remove(output_path)

    # Base64エンコードしてJSONで返す
    gif_base64 = base64.b64encode(gif_data).decode('utf-8')
    return JSONResponse(content={"qr_gif": gif_base64}, status_code=200)
