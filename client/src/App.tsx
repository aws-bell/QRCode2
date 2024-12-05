import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import axios from 'axios'
import { CsrfToken } from './types'
import CreateQR from './components/CreateQR';
import QRList from './components/QRList';
import FavoriteQRList from './components/FavoriteQRList';
import EditQR from './components/EditQR';
import EditResultQR from './components/EditResultQR'

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/createQR" element={<CreateQR />} />
        <Route path="/QRList" element={<QRList />} />
        <Route path="/favoriteQRList" element={<FavoriteQRList />} />
        <Route path="/editQR" element={<EditQR />} />
        <Route path="editresultQR" element={<EditResultQR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
