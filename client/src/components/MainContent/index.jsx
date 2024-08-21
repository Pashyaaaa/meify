/* eslint-disable react/prop-types */
import useGetTop from "../../hooks/useGetTop";
import Hyperlink from "../Hyperlink";

const MainContent = ({ title, classname }) => {
  const { userTrack, loading, error } = useGetTop();
  const skeletonArray = [1, 2, 3, 4, 5];

  let number = 1;

  return (
    <div className="flex flex-col md:block justify-center items-center gap-5 w-full mt-8 md:mt-12">
      <h2
        className={`${classname} first-letter:text-green-500 first-letter:text-4xl mb-2 text-white text-md sm:text-lg md:text-3xl font-semibold`}
      >
        {title}
      </h2>
      <ul className="flex flex-col md:flex-row justify-evenly">
        {loading || error
          ? skeletonArray.map((_, index) => (
              <li
                key={index}
                className="flex justify-center items-center gap-4 mb-12"
              >
                <p className="text-white text-2xl font-bold">{number++}.</p>
                <div id="banner" className="">
                  <img
                    src={"./dummyuser.jpeg"}
                    alt="Skeleton"
                    className="w-16 md:w-24 lg:w-32"
                  />
                  <p className="text-[0.6rem] break-all md:text-xs text-white">
                    Loading...
                  </p>
                  <p className="text-[0.5rem] break-all md:text-xs text-white">
                    [artist name]
                  </p>
                </div>
              </li>
            ))
          : userTrack.map((res) => (
              <Hyperlink key={res.id}>
                <li className="flex justify-center items-center gap-4 mb-12">
                  <p className="text-white text-2xl font-bold">{number++}.</p>
                  <div id="banner" className="">
                    <img
                      src={res.album.images[0]?.url || "./dummyuser.jpeg"}
                      alt={res.name}
                      className="w-16 md:w-24 lg:w-32"
                    />
                    <p className="text-[0.6rem] break-all md:text-xs text-white">
                      {res.name}
                    </p>
                    <p className="text-[0.5rem] break-all md:text-xs text-white">
                      {res.artists.map((artist) => artist.name)}
                    </p>
                  </div>
                </li>
              </Hyperlink>
            ))}
      </ul>
    </div>
  );
};

export default MainContent;
