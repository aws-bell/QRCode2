import React, { useState } from "react";
import Header  from "./Header";

const CreateQR: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200">
        <Header/>
      {/* Main Content */}
      <main className="flex justify-center items-center py-12">
        <div className="bg-white shadow-md p-6 rounded-md flex space-x-8">
          {/* QR Code */}
          <div className="flex justify-center items-center bg-white p-4 rounded-md shadow-md">
            <img src="/logo512.png" alt="QR Code" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">タイトル</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">テキスト</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-blue-100"
              />
            </div>
            <div className="flex items-center">
              <label className="mr-3 text-sm">お気に入り</label>
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="h-5 w-5"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateQR;
