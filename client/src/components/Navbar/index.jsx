import Hyperlink from "../Hyperlink";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const linkTo = location.pathname === "/" ? "/privacy" : "/";
  return (
    <nav className=" fixed flex flex-col justify-between items-center bottom-10 right-0 transform w-40 md:w-52 z-50">
      <div className="relative">
        <Hyperlink to={linkTo}>
          <p className="text-white text-xs md:text-base rounded-full p-4 flex gap-12 items-center bg-slate-800 shadow-lg font-montserrat uppercase shadow-green-500 relative z-10">
            {linkTo == "/" ? "Back" : "Privacy Policy"}
          </p>
        </Hyperlink>
      </div>
    </nav>
  );
};

export default Navbar;
