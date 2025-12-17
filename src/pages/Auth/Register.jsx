import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

export default function Register() {
  return (
    <>
      <Navbar />
      <div
        className="content"
        style={{
          backgroundImage: "url(/images/header/SignUp.jpg)",
          width: "100vw",
          height: "100vh",
          backgroundSize: "110%",
          backgroundPosition: "-180% 0%",
        }}
      >
        <div className="wrapper w-[50%] h-screen bg-white shadow-2xl flex flex-col justify-center items-center gap-3">
          <img className="w-[55%]" src="/favicon.png" alt="" />
          <div className="header text-center">
            <h1 className="text-6xl font-bold">Halo!</h1>
            <p className="text-4xl">Daftar menjadi anggota</p>
          </div>
          <div className="form-wrapper flex flex-col w-[90%]">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Binus Keren" />
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="example@gmail.com" />
            <label htmlFor="username">Password</label>
            <input type="password" placeholder="*****" />
            <label htmlFor="username">Confirm Password</label>
            <input type="password" placeholder="*****" />
          </div>
          <Link
            to={"/"}
            className="bg-org text-white py-2.5 px-10 shadow-xl hover:shadow-2xl text-2xl font-semibold rounded-2xl transition-all ease-in-out duration-500 align-middle"
          >
            Daftar
          </Link>
          <div className="bottom-text-wrapper">
            <p className="text-xl">
              Sudah Punya akun?{" "}
              <Link to={"/auth/login"} className="text-org font-semibold">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
