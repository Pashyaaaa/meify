import { useLocation } from "react-router-dom";
import Hyperlink from "../Hyperlink";
const Navbar = () => {
  const location = useLocation();

  // Menentukan posisi saklar berdasarkan route
  const togglePosition =
    location.pathname === "/" ? "translate-x-0" : "translate-x-full";

  return (
    <nav className=" fixed flex flex-col justify-between items-center bottom-14 left-1/2 transform -translate-x-1/2 w-40 md:w-52">
      <div className="relative">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-green-500 rounded-full transform transition-transform duration-300 ${togglePosition}`}
        />
        <ul className="text-white rounded-full px-6 py-4 flex gap-12 items-center bg-slate-400 bg-opacity-70 relative z-10">
          <Hyperlink to="/">
            <li>Home</li>
          </Hyperlink>
          <Hyperlink to="/about">
            <li>About</li>
          </Hyperlink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
