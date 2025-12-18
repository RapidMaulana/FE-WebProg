import RecipeCard from "../components/RecipesCard";

import { getAllRecipes } from "../api/services";

import { useState, useEffect } from "react";

export default function Recipes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllRecipes()
      .then((response) => setData(response.data.data))
      .catch((response) => console.log(response));
  }, []);

  const dataCamilan = data.filter((v) => v.category === "camilan");
  const dataMakanan = data.filter(
    (v) => v.category === "hidangan utama"
  );

  return (
    <>
      <div
        className="header h-[60vh] w-full"
        style={{
          backgroundImage: "url(/images/header/RecipesPage.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "0 75%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="header-text flex flex-col items-center justify-center gap-4 bg-black/45 w-full h-full text-white text-center">
          <h1 className="font-bold text-6xl w-[40%] leading-20">
            Temukan resep yang rasanya luar biasa!
          </h1>
        </div>
      </div>
      <div className="content flex flex-col items-center w-[90%] text-center mt-8">
        <div className="makanan-berat w-full">
          <h1 className="text-4xl font-semibold">Makanan Berat</h1>
          <p className=" my-10 text-xl font-light">
            Beragam pilihan sarapan lezat, dari hidangan klasik yang
            mengenyangkan hingga penuh energi yang menjadikan hari terasa
            istimewa.
          </p>
          <div className="items-wrapper flex flex-row flex-wrap mt-5 gap-10 justify-center items-center">
            {dataMakanan.map((v, i) => {
              return <RecipeCard key={i} {...v} />;
            })}
          </div>
        </div>
        <div className="camilan w-full my-20">
          <h1 className="text-4xl font-semibold">Makanan Ringan</h1>
          <p className=" my-10 text-xl font-light">
            Beragam camilan lezat yang menggugah selera hingga kreasi unik yang
            membuat setiap gigitan terasa menyenangkan
          </p>
          <div className="items-wrapper flex flex-row flex-wrap mt-5 gap-10 justify-center items-center">
            {dataCamilan.map((v, i) => {
              return <RecipeCard key={i} {...v} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
