import { Link } from "react-router-dom";


export default function Footer(){
    return(
        <footer className="footer w-full bg-wht z-10 flex flex-row font-sen text-[16px] text-black justify-between p-10 items-center">
        <div className="item-lists flex flex-row gap-[100px]">
          <ul>
            <h1 className="font-semibold text-[24px] mb-5">Menu</h1>
            <li>
              <Link className="underline-link" to={"/"}>
                Beranda
              </Link>
            </li>
            <li>
              <Link className="underline-link" to={"/recipes"}>
                Resep
              </Link>
            </li>
            <li>
              <Link className="underline-link" to={"/about"}>
                Tentang Kami
              </Link>
            </li>
          </ul>

          <ul>
            <h1 className="font-semibold text-[24px] mb-5">Kategori</h1>
            <li>
              <Link className="underline-link" to={"/recipes"}>
                Makanan Berat
              </Link>
            </li>
            <li>
              <Link className="underline-link" to={"/recipes"}>
                Makanan Ringan
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="relative item-left w-[550px] h-[200px] bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url('/favicon.png')` }}
        >
          <img
            className="absolute left-[-100px] w-[70px]"
            src="/icons/Salad.png"
          />
          <img
            className="absolute right-0 w-[70px]"
            src="/icons/FriedEggs.png"
          />
          <img
            className="absolute bottom-0 w-[70px]"
            src="/icons/Eggplant.png"
          />
        </div>
      </footer>
    );
}