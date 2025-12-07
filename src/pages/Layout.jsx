import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <nav className=" nav flex flex-row font-sen text-[20px] justify-between p-[10px] px-[40px] items-center bg-wht">
        <img
          className="h-[50px] object-contain"
          src="/favicon.png"
          alt="logo"
        />
        <ul className="flex flex-row gap-[40px] font-medium">
          <li>
            <Link to={"/"}>Beranda</Link>
          </li>
          <li>
            <Link to={"/recipes"}>Resep</Link>
          </li>
          <li>
            <Link to={"/about"}>Tentang Kami</Link>
          </li>
        </ul>
        <Link to={"/login"}>
          <p className="border-2 px-8 py-2 rounded-lg hover:bg-black hover:text-wht transition all ease-in-out">
            Login
          </p>
        </Link>
      </nav>

      <div className="children flex flex-col items-center w-full min-h-[100vh]">
        <Outlet />
      </div>

      <footer className="relative bottom-0 footer w-full bg-wht z-10 flex flex-row font-sen text-[16px] text-black justify-between p-[40px] items-center">
        <div className="item-lists flex flex-row gap-[100px]">
            <ul>
                <h1 className="font-semibold text-[24px] mb-5">Menu</h1>
                <li>
                    <Link to={"/"}>
                        Beranda
                    </Link>
                </li>
                <li>
                    <Link to={"/recipes"}>
                        Resep
                    </Link>
                </li>
                <li>
                    <Link to={"/about"}>
                        Tentang Kami
                    </Link>
                </li>
            </ul>
            <ul>
                <h1 className="font-semibold text-[24px] mb-5">Kategori</h1>
                <li>
                    <Link to={"/recipes"}>
                        Makanan Berat
                    </Link>
                </li>
                <li>
                    <Link to={"/recipes"}>
                        Makanan Ringan
                    </Link>
                </li>
            </ul>
        </div>
        <div className="relative item-left w-[550px] h-[200px] bg-cover bg-no-repeat bg-center" style={{backgroundImage:`url('/favicon.png')`}}>
            <img className="absolute left-[-100px] w-[70px] h-[70px] object-cover" src="/icons/Salad.png" alt="salad" />
            <img className="absolute right-0 w-[70px] h-[70px] object-cover" src="/icons/FriedEggs.png" alt="telor" />
            <img className="absolute bottom-0 w-[70px] h-[70px] object-cover" src="/icons/Eggplant.png" alt="terong" />
        </div>
      </footer>
    </div>
  );
}
