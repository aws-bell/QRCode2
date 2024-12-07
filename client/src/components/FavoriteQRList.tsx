import React from 'react'
import Header from './Header'
import { useQueryTasks } from '../hooks/useQueryTasks';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const FavoriteQRList = () => {
    const {data} = useQueryTasks();
    const {setEditTitle, setEditImage} = useAppContext();
    const navigate = useNavigate();
    const shiftToEdit = (title: string, img : Uint8Array)=> {
        const blob = new Blob([img], {type: "image/png"});
        const receptimg = new File([blob], "image/png", {type: "image/png"});
        setEditTitle(title);
        setEditImage(receptimg);
        navigate("/editQR");
        console.log(title);
    }
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
                            {data?.map((info, index) => {
                                return(
                                    <>
                                    {info.isFavorite ? 
                                <div>
                                    <tr key={index} className='text-xl  border-b-2 m-10'>
                                        <td><img src={`data:image/png;base64,${info.image}`} alt='QRこーど' height="50px" width="50px"></img></td>
                                        <td>{info.title}</td>
                                        <td>{info.text}</td>
                                        <td>{info.isFavorite}</td>
                                        <td><button onClick={() => shiftToEdit(info.title, info.image)}>編集</button></td>
                                    </tr> 
                                </div>: 
                                <div></div>}
                                </>         
                                )    
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
    )
}

export default FavoriteQRList