import React, { useState } from "react";
import Header  from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQR: React.FC = () => {
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Text, setText] = useState("");
  const [isFavorite, setFavorite] = useState(false);
  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append('Text', Text);
    formData.append('Title', Title);
    formData.append('is_Favorite', String(isFavorite));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/qrcode/generate`, formData, {
        responseType: 'blob'
      });
      const blob = response.data;
      const imgURL = URL.createObjectURL(blob);

      // 送信後にResultPageへ移動し、stateでimgURLを渡す
      navigate('/CreateQRResult', { state: { imageURL: imgURL } });
    } catch (error) {
      console.error(error);
      alert('画像の処理に失敗しました。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
        <Header/>
      {/* Main Content */}
      <main className="flex justify-center items-center py-12">
        <div className="bg-white shadow-md p-6 rounded-md flex space-x-8">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block Text-sm font-medium mb-1">タイトル</label>
              <input
                type="Text"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-blue-100"
              />
            </div>
            <div>
              <label className="block Text-sm font-medium mb-1">テキスト</label>
              <input
                type="Text"
                value={Text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-blue-100"
              />
            </div>
            <div className="flex items-center">
              <label className="mr-3 Text-sm">お気に入り</label>
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="h-5 w-5"
              />
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 Text-white px-4 py-2 rounded">
              生成
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateQR;
