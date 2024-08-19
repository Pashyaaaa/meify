/* eslint-disable react/prop-types */
import Hyperlink from "../Hyperlink";

const MainContent = ({ align, child }) => {
  const number = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  return (
    <ul className={`flex flex-col md:flex-row justify-center gap-5 ${align}`}>
      <li className="mb-5 ">
        <h2 className="first-letter:text-green-500 first-letter:text-xl text-white text-base font-semibold text-center">
          {child}
        </h2>
      </li>
      {number.map((res) => (
        <Hyperlink key={res.id}>
          <li className="flex gap-4">
            <p className="text-white font-bold">{res.id}.</p>
            <img src="./dummyuser.jpeg" alt="" className="w-24" />
          </li>
        </Hyperlink>
      ))}
    </ul>
  );
};

export default MainContent;
