import React from 'react'
import Header from './Header'

const QRList = () => {
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
                            <tr className='text-xl  border-b-2 m-10'>
                                <td><img src='https://www.illust-box.jp/db_img/sozai/00008/88925/watermark.jpg' alt='QRこーど' height="50px" width="50px"></img></td>
                                <td>テスト１</td>
                                <td>あああああ</td>
                                <td>★</td>
                                <td>編集</td>
                            </tr>
                            <tr className='text-xl  border-b-2 m-10'>
                                <td><img src='https://www.illust-box.jp/db_img/sozai/00008/88925/watermark.jpg' alt='QRこーど' height="50px" width="50px"></img></td>
                                <td>テスト２</td>
                                <td>いいいいい</td>
                                <td>★</td>
                                <td>編集</td>
                            </tr>
                            <tr className='text-xl  border-b-2 m-10'>
                                <td><img src='https://www.illust-box.jp/db_img/sozai/00008/88925/watermark.jpg' alt='QRこーど' height="50px" width="50px"></img></td>
                                <td>テスト３</td>
                                <td>あああああ</td>
                                <td>☆</td>
                                <td>編集</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </>
    )
}

export default QRList