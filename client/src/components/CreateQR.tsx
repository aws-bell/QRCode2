import React, { useState } from "react";
import Header  from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQR: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const handleSubmit = async () => {

    const requestBody = {
      text: text,
      is_favorite: isFavorite,
      title: title
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/qrcode/generate`, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      });

      // response.dataはblob(画像)として返される
      const blob = response.data;
      const imgURL = URL.createObjectURL(blob);
      navigate('/createQRresult', { state: { imageURL: imgURL } });
      // <img src={imgURL} />で表示可能
    } catch (error: any) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-blue-100"
              />
            </div>
            <div>
              <label className="block Text-sm font-medium mb-1">テキスト</label>
              <input
                type="Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-blue-100"
              />
            </div>
            <div className="flex items-center">
              <label className="mr-3 Text-sm">お気に入り</label>
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
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
