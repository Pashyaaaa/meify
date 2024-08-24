/* eslint-disable react/prop-types */
import useGetTop from "../../hooks/useGetTop";
import Hyperlink from "../Hyperlink";
import { useState } from "react";

// Komponen SkeletonItem untuk menampilkan skeleton loading
const SkeletonItem = ({ number }) => (
  <li className="flex justify-center items-center gap-4 mb-12">
    <p className="text-white text-2xl font-bold">{number}.</p>
    <div id="banner">
      <img
        src="./dummyuser.jpeg"
        alt="Skeleton"
        className="w-16 md:w-24 lg:w-32"
      />
      <p className="text-[0.6rem] break-all md:text-xs text-white">
        Loading...
      </p>
      <p className="text-[0.5rem] break-all md:text-xs text-white">
        [description]
      </p>
    </div>
  </li>
);

// Komponen ContentItem untuk menampilkan item dengan gambar dan informasi
const ContentItem = ({ res, type, number }) => {
  const [imageSrc, setImageSrc] = useState(
    type === "track" ? res.album?.images[0]?.url : res.images[0]?.url
  );
  const [loadingImage, setLoadingImage] = useState(true);

  const handleError = () => {
    setImageSrc("./dummyuser.jpeg");
    setLoadingImage(false);
  };

  const handleLoad = () => {
    setLoadingImage(false);
  };

  return (
    <Hyperlink key={res.id} to={res.external_urls.spotify} target="_blank">
      <li className="flex justify-center items-center gap-4 mb-12">
        <p className="text-white text-2xl font-bold">{number}.</p>
        <div id="banner" className="group relative">
          {loadingImage && (
            <img
              src="./dummyuser.jpeg"
              alt="Loading"
              className="w-16 md:w-24 lg:w-32 inset-0"
            />
          )}
          <img
            src={imageSrc}
            alt={res.name}
            className={`w-16 md:w-24 lg:w-32 ${
              loadingImage ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
            onError={handleError}
            onLoad={handleLoad}
            loading="lazy"
          />
          <p className="text-[0.6rem] break-all md:text-xs text-green-500 md:group-hover:scale-125 transition-all">
            {res.name}
          </p>
          <p className="text-[0.5rem] break-all md:text-xs text-white md:group-hover:scale-110 transition-all">
            {type === "track"
              ? res.artists.map((artist) => artist.name).join(", ")
              : `Followers: ${res.followers.total.toLocaleString()}`}
          </p>
        </div>
      </li>
    </Hyperlink>
  );
};

const MainContent = ({ title, classname, type }) => {
  const { userTrack, userArtist, loading, error } = useGetTop();
  const skeletonArray = [1, 2, 3, 4, 5];
  const data = type === "track" ? userTrack : userArtist;

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
              <SkeletonItem key={index} number={index + 1} />
            ))
          : data.map((res, index) => (
              <ContentItem
                key={res.id}
                res={res}
                type={type}
                number={index + 1}
              />
            ))}
      </ul>
    </div>
  );
};

export default MainContent;
