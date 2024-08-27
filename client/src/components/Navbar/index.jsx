import Hyperlink from "../Hyperlink";
const Navbar = () => {
  return (
    <nav className=" fixed flex flex-col justify-between items-center bottom-14 left-1/2 transform -translate-x-1/2 w-40 md:w-52 z-50">
      <div className="relative">
        <Hyperlink to="/">
          <ul className="text-white rounded-full px-20 py-4 flex gap-12 items-center bg-slate-400 bg-opacity-90 relative z-10">
            <li>Login</li>
          </ul>
        </Hyperlink>
      </div>
    </nav>
  );
};

export default Navbar;
