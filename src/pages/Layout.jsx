import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <nav className="nav flex flex-row font-lato font-bold text-[26px] justify-between m-[10px]">
        <h1 className="text-orange-400">AOL-WebProg</h1>
        <ul className="flex flex-row gap-5">
            <li>
                <Link to={"/"}>All Recipes</Link>
            </li>
            <li>
                <Link to={"/"}>Quick Meals</Link>
            </li>
            <li>
                <Link to={"/"}>Ingridients</Link>
            </li>
            <li>
                <Link to={"/"}>Cuisines</Link>
            </li>
            <li>
                <Link to={"/"}>News</Link>
            </li>
        </ul>
      </nav>
      <Outlet />
      <footer className="footer"></footer>
    </div>
  );
}
