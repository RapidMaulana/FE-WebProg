import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {

  return (
    <div className="layout">
      {/* NAVBAR */}
      <Navbar/>

      {/* CONTENT */}
      <div className="children flex flex-col items-center w-full min-h-screen pt-[60px]">
        <Outlet />
      </div>

      {/* FOOTER */}
      <Footer/>
      
    </div>
  );
}
