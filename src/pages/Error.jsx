import { Link } from "react-router-dom";

export default function Error(){
    return(
        <div className="error-page min-h-screen min-w-screen flex flex-col items-center justify-center text-start">
            <h1 className="font-bold text-4xl">Oops... Kayanya kamu salah halaman deh</h1>
            <Link to={"/"} className="text-org underline text-2xl">Kembali ke halaman utama</Link>
        </div>
    );
}