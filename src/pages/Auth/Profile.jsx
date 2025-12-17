import { useState } from "react";

export default function Profile() {
  const [menuState, setMenuState] = useState(0);

  const menuItems = [
    "Informasi",
    "Edit Profile",
    "Tambah Resep",
    "Wishlist",
  ];

  const renderContent = () => {
    switch (menuState) {
      case 0:
        return(
            <>
            
            </>
        );
      case 1:
        return(
            <>
            
            </>
        );
      case 2:
        return(
            <>
            
            </>
        );
      case 3:
        return(
            <>
            
            </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* HEADER */}
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
          <div className="absolute bottom-[-20%] left-[5%] shadow-lg profile-picture w-[300px] h-[300px] rounded-[200px] bg-org"></div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs font-semibold text-3xl border-b-2 border-org flex flex-row mt-20 px-10 gap-4">
        {menuItems.map((v, i) => (
          <button
            key={i}
            onClick={() => setMenuState(i)}
            className={`px-10 py-4 transition
              ${
                menuState === i
                  ? "border-b-4 border-org text-org"
                  : "hover:bg-org/30 text-black"
              }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content px-10 py-10">
        {renderContent()}
      </div>
    </>
  );
}
