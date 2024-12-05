import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DownloadButton from './DownloadButton';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 前の画面からstateでimageURLを受け取る（ない場合はnullになる）
  const { imageURL }: { imageURL?: string } = location.state || {};

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-xl font-bold mb-2">生成されたQRコード</h2>
      {imageURL ? (
        <>
          <img src={imageURL} alt="Generated QR Code" className="mx-auto border border-gray-300" />
          <DownloadButton imageURL={imageURL} />
        </>
      ) : (
        <p>画像がありません。</p>
      )}
      <button 
        onClick={handleBack}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        戻る
      </button>
    </div>
  );
};

export default ResultPage;
