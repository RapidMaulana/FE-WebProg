import { useState } from "react";

export default function Profile() {
    const [menuState, setMenuState] = useState(0);

    const menuItems= [
        "Informasi",
        "Edit Profile",
        "Recipes", 
        "Wishlist"
    ]

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
        <div className="relative flex flex-col items-center justify-center gap-4 bg-black/45 w-full h-full text-white text-center">
            <div className="absolute bottom-[-20%] left-[5%] shadow-lg profile-picture w-[300px] h-[300px] rounded-[200px] bg-org">

            </div>
        </div>
      </div>
      <div className="tabs font-semibold text-3xl border-b-2 flex flex-row mt-10">
        {menuItems.map((v, i) => {
            return(
                <button key={i} className="hover:bg-org/30 px-10">{v}</button>
            );
        })}
      </div>
    </>
  );
}
