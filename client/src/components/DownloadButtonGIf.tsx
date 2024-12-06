import React from 'react';

type DownloadButtonProps = {
  imageURL: string | null;
  filename?: string;
};

const DownloadButtonGif: React.FC<DownloadButtonProps> = ({ imageURL, filename = 'qrcode.gif' }) => {
  const handleDownload = () => {
    if (!imageURL) {
      alert('ダウンロードできる画像がありません。');
      return;
    }
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
      disabled={!imageURL}
    >
      ダウンロード
    </button>
  );
};

export default DownloadButtonGif;
