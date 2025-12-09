import { Link } from "react-router-dom";

export default function Login(){
    return(
        <div
      className="content"
      style={{
        backgroundImage: "url(/images/header/LogIn.jpg)",
        width: "100vw",
        height: "100vh",
        backgroundSize: "110%",
        backgroundPosition: "-180% 0%",
      }}
    >
      <div className="wrapper w-[50%] h-screen bg-white shadow-2xl flex flex-col justify-center items-center gap-3">
        <img className="w-[55%]" src="/favicon.png" alt="" />
        <div className="header text-center">
          <h1 className="text-6xl font-bold">Selamat Datang!</h1>
          <p className="text-4xl">Masuk ke akun anda</p>
        </div>
        <div className="form-wrapper flex flex-col w-[90%]">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="example@gmail.com" />
          <label htmlFor="username">Password</label>
          <input type="password" placeholder="*****" />
        </div>
        <Link
          to={"/"}
          className="bg-org text-white py-2.5 px-10 shadow-xl hover:shadow-2xl text-2xl font-semibold rounded-2xl transition-all ease-in-out duration-500 align-middle"
        >
          Masuk
        </Link>
        <div className="bottom-text-wrapper">
          <p className="text-xl">
            Belum punya akun?{" "}
            <Link to={"/auth/register"} className="text-org font-semibold">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
}