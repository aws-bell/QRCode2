import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const App: React.FC = () => {
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [embedImageFile, setEmbedImageFile] = useState<File | null>(null);
  const [colorCode, setColorCode] = useState('#000000');
  const [title, setTitle] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  const handleQRCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQrCodeFile(e.target.files[0]);
    }
  };

  const handleEmbedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEmbedImageFile(e.target.files[0]);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorCode(e.target.value);
  };

  const handleSubmit = async () => {
    if (!qrCodeFile || !embedImageFile) {
      alert('QRコードと埋め込み画像を選択してください。');
      return;
    }

    const formData = new FormData();
    formData.append('qrcode', qrCodeFile);
    formData.append('embed_image', embedImageFile);
    formData.append('color', colorCode);
    formData.append('title', title);
    formData.append('is_favorite', String(isFavorite));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/qrcode/edit`, formData, {
        responseType: 'blob'
      });
      const blob = response.data;
      const imgURL = URL.createObjectURL(blob);

      // 送信後にResultPageへ移動し、stateでimgURLを渡す
      navigate('/editresultQR', { state: { imageURL: imgURL } });
    } catch (error) {
      console.error(error);
      alert('画像の処理に失敗しました。');
    }
  };

  return (
    <div>
        <Header />
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">QRコードの加工と保存</h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">QRコード画像:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleQRCodeChange} 
          className="block w-full border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">埋め込み画像:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleEmbedImageChange} 
          className="block w-full border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">QRコードの色:</label>
        <input 
          type="color" 
          value={colorCode} 
          onChange={handleColorChange} 
          className="border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">タイトル:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="block w-full border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={(e) => setIsFavorite(e.target.checked)}
          className="mr-2"
        />
        <label className="font-semibold">お気に入り登録</label>
      </div>
      <button 
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        送信
      </button>
    </div>
    </div>
  );
};

export default App;
