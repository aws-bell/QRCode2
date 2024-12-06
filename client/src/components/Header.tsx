import { motion } from "framer-motion";
import '../App.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="container bg-black mx-auto px-4 sm:px-20">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.5,
          stiffness: 130,
        }}
        className="flex flex-col sm:flex-row justify-between items-center text-white py-4"
      >
        {/* Protfolio Site のテキスト */}
        <span className="rainbow-text text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">QRCode Blender</span>
        
        {/* ナビゲーションメニュー */}
        <nav>
          <ul className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-xs sm:text-lg text-white">
            <li>
              <a href="/createQR" className="hover:underline">生成</a>
            </li>
            <li>
              <a href="/gifQR" className="hover:underline">GIF生成</a>
            </li>
            <li>
              <a href="/editQR" className="hover:underline">編集</a>
            </li>
            <li>
              <Link to="/favoriteQRList" className="hover:underline">お気に入り</Link>
            </li>
            <li>
              <Link to="/QRList" className="hover:underline">履歴</Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">ログアウト</Link>
            </li>
          </ul>
        </nav>
      </motion.header>
    </div>
  );
};