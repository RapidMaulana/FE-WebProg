import { Link } from "react-router-dom";

export default function RecipeCard({
  id,
  image,
  cook_time,
  servings,
  difficulty,
  title,
}) {
  return (
    <Link
      to={`/recipes/${id}`}
      className="item w-[calc(100%/3.2)] h-[370px] shadow-xl hover:shadow-2xl hover:translate-y-[-5px] cursor-pointer transition-all ease-in-out duration-300 rounded-xl bg-white"
    >
      <img
        src={`${image}`}
        className="h-[200px] rounded-t-xl w-full object-cover object-center"
        alt={"Gambar " + title}
      />
      <div className="detail flex flex-row text-grn justify-around py-2">
        <div className="detail-item flex flex-row gap-2">
          <img
            className="h-5 w-5"
            src="/icons/vector/waktu.png"
            alt=""
          />
          <p>{cook_time} Menit</p>
        </div>
        <div className="detail-item flex flex-row gap-2">
          <img
            className="h-5 w-5"
            src="/icons/vector/orang.png"
            alt=""
          />
          <p>{servings} Porsi</p>
        </div>
        <div className="detail-item flex flex-row gap-2">
          <img
            className="h-5 w-5"
            src="/icons/vector/level.png"
            alt=""
          />
          <p>{difficulty}</p>
        </div>
      </div>
      <div className="title m-5 text-start">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-org underline text-lg">Lihat Resep</p>
      </div>
    </Link>
  );
}
