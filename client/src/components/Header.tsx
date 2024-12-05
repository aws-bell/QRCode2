export default function Header() {
    return (
        <div className="header">
            <header className="bg-blue-200 py-4 px-8 flex justify-between items-center">
                <h1 className="text-lg font-bold"><a href="createQR">QRコード生成アプリ</a></h1>
                <nav className="flex space-x-4">
                    <a href="favoriteQRList" className="text-sm text-gray-700 hover:underline">
                        お気に入り
                    </a>
                    <a href="QRList" className="text-sm text-gray-700 hover:underline">
                        履歴
                    </a>
                    <a href="/" className="text-sm text-gray-700 hover:underline">
                        ログアウト
                    </a>
                </nav>
            </header>
        </div>
    )
}