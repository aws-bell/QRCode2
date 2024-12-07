import React from 'react'
import Header from './Header'
import { useQueryTasks } from '../hooks/useQueryTasks';

const QRList = () => {
    const {data} = useQueryTasks();

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
                            {data?.map((info, index) => (
                                <tr key={index} className='text-xl  border-b-2 m-10'>
                                    <td><img src={`data:image/png;base64,${info.image}`} alt='QRこーど' height="50px" width="50px"></img></td>
                                    <td>{info.title}</td>
                                    <td>{info.text}</td>
                                    <td>{info.isFavorite? <p>★</p> : <p>☆</p>}</td>
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