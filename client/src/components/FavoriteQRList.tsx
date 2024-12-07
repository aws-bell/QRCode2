import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { QRCode } from '../types';

const FavoriteQRList = () => {
    const [favoriteQRList, setFavoriteQRList] = useState<QRCode[]>([]);

    useEffect(() => {
        const fetchQRList = async() => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/qrcode/favorite`);
                setFavoriteQRList(response.data);
                console.log(favoriteQRList);
            }catch(err){
                console.log(err)
            }
        }
        fetchQRList();
    },[]);
    
    return(
        <>
        <Header/>
            <div className='flex bg-slate-100 h-screen'>
                <div className='basis-5/12  flex justify-center items-center'>
                    <div className='bg-sky-200 rounded-full p-40'>3Dモデル</div>
                </div>
                <div className='basis-7/12 bg-white rounded-3xl m-36 overflow-y-auto'>
                    <table className='text-center m-5'>
                        <tbody>
                            <tr className='text-2xl px-10'>
                                <th className='px-10 py-4'></th>
                                <th className='px-10 py-4'>タイトル</th>
                                <th className='px-10 py-4'>テキスト</th>
                            </tr>
                            <tr className='text-xl  border-b-2 m-10'>
                                <td><img src='https://www.illust-box.jp/db_img/sozai/00008/88925/watermark.jpg' alt='QRこーど' height="50px" width="50px"></img></td>
                                <td>テスト１</td>
                                <td>あああああ</td>
                                <td>編集</td>
                            </tr>
                            <tr className='text-xl  border-b-2 m-10'>
                                <td><img src='https://www.illust-box.jp/db_img/sozai/00008/88925/watermark.jpg' alt='QRこーど' height="50px" width="50px"></img></td>
                                <td>テスト2</td>
                                <td>いいい</td>
                                <td>編集</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </>
    )
}

export default FavoriteQRList