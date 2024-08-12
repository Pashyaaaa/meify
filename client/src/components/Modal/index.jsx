/* eslint-disable react/prop-types */
import Button from "../Button";
import Hyperlink from "../Hyperlink";

const Modal = ({ toggle, logout, userUrl }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg px-6 pt-8 pb-12 w-80">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-right font-semibold">Settings</h2>
          <Button
            onClick={toggle}
            classname="bg-red-500 text-white py-1 px-4 rounded"
          >
            Close
          </Button>
        </div>
        <div className="w-full h-1 bg-black mb-4 rounded-full"></div>
        <ul className="space-y-5">
          <li>
            <Hyperlink to={userUrl} classname="underline underline-offset-8">
              Edit Profile🚀
            </Hyperlink>
          </li>
          <li>
            <Hyperlink to="/contact" classname="underline underline-offset-8">
              Contact☎️
            </Hyperlink>
          </li>
          <li>
            <Button
              onClick={logout}
              classname="text-red-500 underline underline-offset-8"
            >
              Logout Profile🏡
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
