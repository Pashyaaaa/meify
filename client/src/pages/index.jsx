import Hyperlink from "../components/Hyperlink";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useSpotifyAuth } from "../hooks/useSpotifyAuth";
import useGetPlaylist from "../hooks/useGetPlaylist";
import useGetCurrent from "../hooks/useGetCurrent";
import MainContent from "../components/MainContent";
import { useState } from "react";

const Index = () => {
  const {
    token,
    error,
    userImage,
    userURL,
    data,
    CLIENT_ID,
    REDIRECT_URI,
    AUTH_ENDPOINT,
    RESPONSE_TYPE,
    SCOPE,
    logout,
  } = useSpotifyAuth();

  const display_name = data.display_name;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userPlaylist } = useGetPlaylist();
  const { currentTrack } = useGetCurrent();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  let durationInSeconds = Math.floor(
    (currentTrack.duration - currentTrack.currentTime) / 1000
  );

  let formattedTime = [
    Math.floor(durationInSeconds / 3600)
      .toString()
      .padStart(2, "0"), // Jam
    Math.floor((durationInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0"), // Menit
    (durationInSeconds % 60).toString().padStart(2, "0"), // Detik
  ].join(":");

  return (
    <>
      {!token ? (
        <div className=" bg-slate-950 flex flex-col gap-5 justify-center items-center w-screen h-screen">
          <h1 className="font-pacifico text-white text-4xl md:text-6xl">
            Welcome To{" "}
            <span className="text-green-500 font-bold font-montserrat leading-4">
              Meify
            </span>
          </h1>
          <svg
            width="100"
            height="100"
            viewBox="0 0 168 168"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#1ED760"
              d="M84,0C37.664,0,0,37.664,0,84s37.664,84,84,84s84-37.664,84-84S130.336,0,84,0z M120.292,122.184
        c-1.528,2.508-4.792,3.32-7.3,1.796c-20.036-12.168-45.268-14.888-75.072-8.028c-2.84,0.648-5.704-1.124-6.34-3.964
        c-0.648-2.84,1.124-5.704,3.964-6.34c31.752-7.144,59.588-4.064,82.908,9.264C121.088,115.844,121.812,119.676,120.292,122.184z
        M133.988,97.604c-1.904,3.116-5.944,4.1-9.06,2.196c-23.02-14.064-58.204-18.144-85.412-9.796c-3.344,1.048-7.032-0.82-8.064-4.168
        c-1.048-3.344,0.82-7.032,4.168-8.064c30.568-9.06,69.008-4.648,95.88,10.732C134.592,90.768,135.896,94.492,133.988,97.604z
        M134.396,74.376c-27.628-16.548-73.256-18.096-98.9-9.768c-4.24,1.34-8.752-1.132-10.092-5.36
        c-1.34-4.228,1.132-8.752,5.36-10.092c29.96-9.46,79.68-7.712,110.804,11.04c3.776,2.24,5.04,7.14,2.8,10.916
        C143.22,75.056,138.172,76.616,134.396,74.376z"
            />
          </svg>
          {error && <h1 className="text-red-500 font-semibold">{error}</h1>}
          <Hyperlink
            classname="bg-green-500 text-white py-4 px-8"
            to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
          >
            Get Started
          </Hyperlink>
          <div className="text-white font-montserrat md:text-base text-xs">
            By continuing you agree with our{" "}
            <Hyperlink classname="underline text-blue-700" to="/privacy">
              Privacy Policy
            </Hyperlink>
          </div>
        </div>
      ) : (
        <div className="h-full">
          <video
            src="./videoBg.mp4"
            autoPlay
            loop
            muted
            className="w-screen absolute object-fill -z-50 h-3/4"
          ></video>
          <header className="pt-3 md:py-5 md:px-16 flex justify-center items-center md:justify-end gap-4">
            <div className="relative group w-20 h-20 md:w-24 md:h-24">
              <img
                src={userImage || "./dummyuser.jpeg"}
                alt="Profile Picture"
                loading="lazy"
                className="rounded-full w-full h-full object-cover object-center transition-all duration-300 group-hover:blur-sm"
              />
              <Hyperlink
                to={userURL}
                target="_blank"
                classname="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity group-hover:border"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="white"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-1.06L14.44 7.66l1.41 1.41L7.34 17.6H5.92v-1.41zm13.54-9.54c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 00-1.41 0L14.34 4.66l3.75 3.75 1.37-1.37z" />
                </svg>
              </Hyperlink>
            </div>
            <div className="flex flex-col gap-1">
              <div className="mb-1">
                <Hyperlink to={userURL} target="_blank">
                  <div className="font-semibold font-lato text-green-500 text-sm md:text-base">
                    Welcome,{" "}
                    <span className="underline-offset-4 underline">
                      {display_name
                        ? display_name.length > 13
                          ? display_name.substring(0, 13) + "..."
                          : display_name
                        : "Unknown User".substring(0, 20)}
                    </span>
                  </div>
                </Hyperlink>
                <Hyperlink
                  classname="text-white text-xs font-montserrat"
                  target="_blank"
                  to="https://open.spotify.com"
                >
                  Your Playlist: {userPlaylist || 0}
                </Hyperlink>
              </div>
              <Button
                classname="bg-green-500 text-xs md:text-base text-white py-2 md:py-2 font-montserrat"
                onClick={toggleModal}
              >
                Settings
              </Button>
            </div>

            <Modal
              isOpen={isModalOpen}
              toggleModal={toggleModal}
              title="Example Modal"
              content={<p>This is the content of the modal.</p>}
              footer={
                <Button
                  onClick={toggleModal}
                  classname="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </Button>
              }
              layout="wide"
            />
          </header>

          <div
            id="currently-playing"
            className="relative md:absolute md:-top-12 md:-left-12 -left-8 pt-3 text-sm md:text-md flex justify-start md:justify-center lg:justify-start items-center gap-4"
          >
            <div
              id="image-current"
              className={`relative p-3 ${
                currentTrack.isPlaying && currentTrack.poster
                  ? "animate-spin"
                  : ""
              }`}
            >
              <img
                src="./cd-icon.png"
                alt="Cd's"
                className={`w-28 md:w-40 md:h-40`}
              />
              <img
                src={
                  currentTrack.poster ? currentTrack.poster : "./dummyuser.jpeg"
                }
                alt=""
                className="absolute rounded-full w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div className="text-current">
              <ul className="text-white font-lato">
                <li>
                  Currently {currentTrack.isPlaying ? "Playing" : "Paused"}:
                </li>
                <li className="font-mono text-xs md:text-base font-montserrat">
                  {currentTrack.artist ? currentTrack.artist : "Spotify"} -{" "}
                  {currentTrack.title
                    ? currentTrack.title
                    : "Ads Or Not Playing Anything"}
                </li>
                <li className="text-xs font-lato">{formattedTime}</li>
              </ul>
            </div>
          </div>

          <main className="bg-slate-950 py-12">
            <div className="text-white text-center font-lato font-serif flex justify-center items-center">
              <div className="animate-bounce text-xl md:text-3xl">🏡</div>
              <h1 className="text-3xl md:text-5xl">
                <span className="font-pacifico text-green-500">Me</span>
                ify
              </h1>
              <div className="animate-bounce text-xl md:text-3xl">🎧</div>
            </div>
            <p className="text-white text-xs text-center font-motserrat">
              Me-ify, Wrapped Story
            </p>

            <div className="flex md:block items-center justify-between px-4 pb-6">
              <div className="w-[40%] md:w-full">
                <MainContent
                  title="Top 5 Tracks"
                  type="track"
                  classname="font-montserrat pb-8"
                ></MainContent>
              </div>
              <div className="w-[40%] md:w-full">
                <MainContent
                  title="Top 5 Artists"
                  type="artist"
                  classname="text-right font-montserrat pb-8"
                ></MainContent>
              </div>
            </div>
            <div className="flex justify-center items-center md:p-8 p-2">
              <Hyperlink classname="text-white text-center border px-5 md:px-10 py-3 md:py-5 border-green-500 hover:bg-green-500 hover:text-black transition-colors duration-200">
                More...
              </Hyperlink>
            </div>
          </main>

          <div className="bg-slate-700 flex justify-center items-center h-screen">
            <h1 className="text-white font-montserrat">NEXT FEATURE HERE</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
