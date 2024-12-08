import React, { useState } from 'react';
import axios from 'axios';
import DownloadButtonGif from './DownloadButtonGIf';
import Header from './Header';
import { Audio } from 'react-loader-spinner'


const GifQR: React.FC = () => {
  const [text, setText] = useState('');
  const [gifImage, setGifImage] = useState<File | null>(null);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gifImage || !text) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append('text', text);
    formData.append('gif_image', gifImage);

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/generate',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const { qr_gif } = response.data;
      setQrResult(`data:image/gif;base64,${qr_gif}`);

    } catch (err) {
      console.error(err);
      alert("Error generating QR");
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
        <Header />
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">アニメーションQRコード生成</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Text for QR:</label>
          <input 
            type="text" 
            value={text} 
            onChange={e => setText(e.target.value)}
            className="block w-full border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">GIF Image:</label>
          <input 
            type="file" 
            accept="image/gif" 
            onChange={e => {
              if(e.target.files && e.target.files[0]) {
                setGifImage(e.target.files[0]);
              }
            }} 
            className="block w-full border border-gray-300 p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">送信</button>
      </form>

      {qrResult && (
        <div className="max-w-md mx-auto p-4 text-center">
          <h2 className="text-xl font-bold mb-2">生成されたアニメーションQRコード:</h2>
          <img src={qrResult} alt="Animated QR" className="mx-auto border border-gray-300"/>
          <DownloadButtonGif imageURL={qrResult} />
        </div>
      )}
    </div>
 
    {loading &&    
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div  className='bg-white rounded-full flex'>
        <div className='m-10'> 
        <Audio
          height="80"
          width="80"
          color="blue"
          ariaLabel="loading"
        />
        </div>
        <div className='m-10 text-2xl font-bold  flex text-center items-center'>
          gifQRコードの生成中です。
        </div>
      </div>
    </div>
    }
    </div>
  );
}

export default GifQR;
