import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from "../api/services";

export default function RecipeCard({
  id,
  image,
  cook_time,
  servings,
  difficulty,
  title,
}) {
  const { isAuthenticated } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if recipe is in wishlist saat component mount
  useEffect(() => {
    const checkRecipeWishlist = async () => {
      if (!isAuthenticated) return;

      try {
        const isInWishlist = await checkWishlist({ recipeId: id });
        setInWishlist(isInWishlist);
      } catch (err) {
        console.error("Error checking wishlist:", err);
      }
    };

    checkRecipeWishlist();
  }, [id, isAuthenticated]);

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); // Prevent Link navigation

    if (!isAuthenticated) {
      setError("Silahkan login terlebih dahulu");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (inWishlist) {
        await removeFromWishlist({ recipeId: id });
        setInWishlist(false);
      } else {
        await addToWishlist({ recipe_id: id });
        setInWishlist(true);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      setError("Gagal mengubah wishlist");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`/recipes/${id}`}
      className="item relative w-[calc(100%/3.2)] h-[370px] shadow-xl hover:shadow-2xl hover:translate-y-[-5px] cursor-pointer transition-all ease-in-out duration-300 rounded-xl bg-white group"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={`${image}`}
          className="h-[200px] rounded-t-xl w-full object-cover object-center"
          alt={"Gambar " + title}
        />

        {/* Error Message */}
        {error && (
          <div className="absolute top-12 right-3 bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs whitespace-nowrap">
            {error}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="detail flex flex-row text-grn justify-around py-2">
        <div className="detail-item flex flex-row gap-2">
          <img className="h-5 w-5" src="/icons/vector/waktu.png" alt="" />
          <p>{cook_time} Menit</p>
        </div>
        <div className="detail-item flex flex-row gap-2">
          <img className="h-5 w-5" src="/icons/vector/orang.png" alt="" />
          <p>{servings} Porsi</p>
        </div>
        <div className="detail-item flex flex-row gap-2">
          <img className="h-5 w-5" src="/icons/vector/level.png" alt="" />
          <p>{difficulty}</p>
        </div>
      </div>

      {/* Title */}
      <div className="title m-5 text-start flex flex-row justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="text-org underline text-lg">Lihat Resep</p>
        </div>
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          disabled={loading}
          className={`rounded-sm transition-all duration-300 flex flex-col items-center gap-1 w-[35%] px-2 py-2 h-fit text-org hover:bg-org hover:text-white`}
          title={inWishlist ? "Hapus dari wishlist" : "Tambah ke wishlist"}
        >
          <span className="text-sm my-auto font-semibold">{inWishlist ? "✓Added to Wishlists" : "+ Add to Wishlists"}</span>
        </button>
      </div>
    </Link>
  );
}
