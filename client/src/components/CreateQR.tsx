import React, { useState } from "react";

const CreateQR: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-blue-200 py-4 px-8 flex justify-between items-center">
        <h1 className="text-lg font-bold">QRコード生成アプリ</h1>
        <nav className="flex space-x-4">
          <a href="favoriteQRList" className="text-sm text-gray-700 hover:underline">
            お気に入り
          </a>
          <a href="QRList" className="text-sm text-gray-700 hover:underline">
            履歴
          </a>
          <a href="/" className="text-sm text-gray-700 hover:underline">
            ログアウト
          </a>
        </nav>
      </header>

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
