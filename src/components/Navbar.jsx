import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

      <Link to={"/auth/login"}>
        <p className="border-2 px-8 py-2 rounded-lg hover:bg-black hover:text-wht transition-all">
          Login
        </p>
      </Link>
    </nav>
  );
}
