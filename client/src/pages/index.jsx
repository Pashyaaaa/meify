/* eslint-disable no-unused-vars */
import Hyperlink from "../components/Hyperlink";
import Button from "../components/Button";
import { useState, useEffect } from "react";

const Home = () => {
  const CLIENT_ID = "4a0bfe39446149d38768668336a31795";
  const REDIRECT_URI = "http://localhost:5173";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elm) => elm.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      setToken(token);
      window.localStorage.setItem("token", token);
    }
  }, []);

  const Logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="font-mono text-2xl">Welcome To Spotify.ly 🚀</h1>
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

      {!token ? (
        <Hyperlink
          classname="bg-green-500 text-white"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login To Spotify
        </Hyperlink>
      ) : (
        <Button classname="bg-green-500" onClick={Logout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Home;
