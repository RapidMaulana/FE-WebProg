import { useParams } from "react-router-dom";

import data from "../data/dummy.json";

export default function Details() {
  const { id } = useParams();

  const res = data.recipes[id - 1];
  const rate = Math.floor(res.rating);

  let ratings = [1, 2, 3, 4, 5];

  const star = 5;

  return (
    <>
      <div className="content m-20 flex flex-col items-start w-[80%] gap-5">
        <h1 className="font-bold text-5xl">{res.title}</h1>
        <div className="rating max-w-[40%] flex flex-row gap-1">
          {ratings.map((v, key) => {
            if (v <= rate) {
              return (
                <>
                  <img
                    className="w-5 h-5"
                    src="/icons/rating/Star.png"
                    alt=""
                  />
                </>
              );
            } else {
              return (
                <>
                  <img
                    className="w-5 h-5"
                    src="/icons/rating/StarGrey.png"
                    alt=""
                  />
                </>
              );
            }
          })}
        </div>
        <div className="image-placeholder w-full h-[730px] bg-wht rounded-3xl animate-[pulse_2s_ease-in-out_infinite]"></div>
        <div className="ringkasan w-full">
          <h1 className="font-semibold text-5xl my-5">Ringkasan</h1>
          <p className="font-light">{res.description}</p>
          <div className="persiapan-wrapper flex flex-row justify-around bg-wht2 max-w-[60%] max-h-[200px] rounded-xl mx-auto  my-5 p-10">
            <div className="item text-center flex w-[calc(100%/3)] flex-col items-center gap-2">
              <img
                className="w-16 h-16 object-cover"
                src="/icons/recipes/bake.png"
                alt=""
              />
              <h1 className="font-medium text-2xl">Waktu Persiapan</h1>
              <p className="font-normal text-2xl opacity-50">
                {res.prepTime} Menit
              </p>
            </div>
            <div className="item border-l border-r w-[calc(100%/3)] flex flex-col items-center gap-2">
              <img
                className="w-16 h-16 object-cover"
                src="/icons/recipes/cooking.png"
                alt=""
              />
              <h1 className="font-medium text-2xl">Waktu Masak</h1>
              <p className="font-normal text-2xl opacity-50">
                {res.cookTime} Menit
              </p>
            </div>
            <div className="item flex flex-col w-[calc(100%/3)] items-center gap-2">
              <img
                className="w-16 h-16 object-cover"
                src="/icons/recipes/serving.png"
                alt=""
              />
              <h1 className="font-medium text-2xl">Porsi</h1>
              <p className="font-normal text-2xl opacity-50">
                {res.servings} Porsi
              </p>
            </div>
          </div>
        </div>
        <div className="bahan">
          <h1 className="font-semibold text-5xl my-5">Bahan</h1>
        </div>
        <div className="instruksi">
          <h1 className="font-semibold text-5xl my-5">Instruksi</h1>
          <ul className="list-decimal text-xl ml-8">
            {res.instructions.map((v, key) => {
              return <li className="my-4    ">
                {v}
              </li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
