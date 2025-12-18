import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setShowDropdown(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex flex-row font-sen text-[20px] justify-between p-2.5 px-10 items-center bg-wht transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link to={"/"}>
        <img
          className="h-[50px] object-contain"
          src="/favicon.png"
          alt="logo"
        />
      </Link>

      <ul className="flex flex-row gap-10 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `underline-link ${isActive ? "active font-semibold" : ""}`
            }
          >
            Beranda
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              `underline-link ${isActive ? "active font-semibold" : ""}`
            }
          >
            Resep
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `underline-link ${isActive ? "active font-semibold" : ""}`
            }
          >
            Tentang Kami
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-4 font-sen">
        {loading ? (
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
        ) : isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2"
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                {user.nama?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium">{user.nama}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <div className="p-4 border-b">
                  <p className="font-semibold text-sm">{user.nama}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>

                <div className="py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition-all"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition-all"
                    onClick={() => setShowDropdown(false)}
                  >
                    Wishlist
                  </Link>
                </div>

                <div className="border-t py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/auth/login"}>
            <p className="border-2 px-8 py-2 rounded-lg hover:bg-black hover:text-wht transition-all">
              Login
            </p>
          </Link>
        )}
      </div>
    </nav>
  );
}
