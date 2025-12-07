import { Link } from "react-router-dom";

import data from "../data/dummy.json";
import RecipeCard from "../components/RecipesCard";

export default function Home() {

  return (
    <>
      <div
        id="Header"
        className="flex flex-row justify-around items-center min-h-screen"
      >
        <div className="content-left max-w-[30%]">
          <h1 className="font-bold text-[64px] leading-17 mb-4">
            Memasak Jadi Menyenangkan dan Mudah
          </h1>
          <p className="opacity-25 text-[16px] mb-[100px]">
            Temukan resep terbaik dalam membantu anda <br />
            menemukan cara memasak termudah.
          </p>
          <a
            href="#Menu"
            className="bg-org text-white p-5 px-10 shadow-xl hover:shadow-2xl text-[20px] font-bold rounded-2xl transition-all ease-in-out duration-500"
          >
            Jelajahi Resep
          </a>
        </div>
        <div className="relative content-right max-w-[45%] h-full">
          <img
            className="object-cover m-auto"
            src="/icons/FoodHome.png"
            alt="masakan"
          />
          <img
            className="absolute h-[120px] w-[120px] bottom-0 right-0 animate-bouncing object-cover m-auto"
            src="/icons/Broccoli.png"
            alt="masakan"
          />
          <img
            className="absolute h-[120px] w-[120px] top-0 animate-[bouncing_2.5s_ease-in-out_infinite] object-cover m-auto"
            src="/icons/Tomato.png"
            alt="masakan"
          />
        </div>
      </div>

      <div id="Menu" className="w-[80%] pt-18">
        <div className="header flex flex-row items-start justify-between">
          <div className="text-wrapper">
            <h1 className="font-bold text-[46px]">Temukan & Ciptakan</h1>
            <p className="text-[24px] opacity-50">Resep Rekomendasi</p>
          </div>
          <Link
            to={"/recipes"}
            className="bg-org text-white py-2.5 px-10 shadow-xl hover:shadow-2xl text-[20px] font-bold rounded-2xl transition-all ease-in-out duration-500 align-middle"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="items-wrapper flex flex-row flex-wrap mt-5 gap-10 justify-center items-center">
          {data.recipes.slice(0, 3).map((v, key) => {
            return (
              <RecipeCard key={key} {...v}/>
            );
          })}
        </div>
      </div>

      <div
        id="About"
        className="relative min-h-[80vh] w-full mt-20"
        style={{
          backgroundImage: `url("/images/header/AboutBg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "0 -230px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="about-content absolute flex flex-col gap-2 bottom-[30%] right-[25%] bg-white h-[45%] max-w-[30%] rounded-3xl  shadow-2xl p-10 border-2">
          <h1 className="font-bold text-[40px]">Tentang Kami</h1>
          <p className="text-[20px] max-w-[75%] mb-6">
            mengubah makanan sisa menjadi inspirasi baru yang lezat, kreatif,
            dan penuh makna.
          </p>
          <Link
            to={"/about"}
            className="text-white bg-org w-fit p-3 px-10 rounded-xl font-bold shadow-lg"
          >
            <p>Lebih Lanjut</p>
          </Link>
        </div>
      </div>
    </>
  );
}
