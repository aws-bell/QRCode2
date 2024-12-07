import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { QRCode } from '../types';
import { useQueryTasks } from '../hooks/useQueryTasks';

const QRList = () => {
    const [QRList, setQRList] = useState<QRCode[]>([]);
    const {data} = useQueryTasks();

    useEffect(() => {
        const getQRList = async () => {
            const response = await axios.get<QRCode[]>(
                `${process.env.REACT_APP_API_URL}/qrcode/favorite`,
                { withCredentials: true }
            )
            setQRList(response.data);
            console.log("1"+QRList);
        }    
        getQRList();
    },[])

    console.log("カスタムフックからの" + data);

    /*useEffect(() => {
        const fetchQRList = async() => {
            try{
                const response = await axios.get<QRCode[]>(`${process.env.REACT_APP_API_URL}/qrcode/recent`, {
                    headers: {
                        Authorization: `Bearer YOUR_ACCESS_TOKEN`, 
                      },
                },
            );
                setQRList(response.data);
                console.log(QRList);
            }catch(err){
                console.log(err)
            }
        }
        fetchQRList();
    },[]);*/
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
                            <tr className='text-2xl'>
                                <th className='px-10 py-4'></th>
                                <th className='px-10 py-4'>タイトル</th>
                                <th className='px-10 py-4'>テキスト</th>
                                <th className='px-10 py-4'>お気に入り</th>
                            </tr>
                            {data?.map((info) => (
                                <tr className='text-xl  border-b-2 m-10'>
                                    <td><img src='https://www.illust-box.jp/db_img/sozai/00008/88925/watermark.jpg' alt='QRこーど' height="50px" width="50px"></img></td>
                                    <td>{info.title}</td>
                                    <td>{info.text}</td>
                                    <td>{info.isFavorite}</td>
                                    <td><a href='/editQR'>編集</a></td>
                                </tr>                
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
    )
}

export default QRList