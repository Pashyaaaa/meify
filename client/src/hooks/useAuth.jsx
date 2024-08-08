import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        Navigate("/");
      });
  }, [code]);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:3001/refresh", {
  //       refreshToken,
  //     })
  //     .then((res) => {
  // setAccessToken(res.data.accessToken);
  // setRefreshToken(res.data.refreshToken);
  // setExpiresIn(res.data.expiresIn);
  // window.history.pushState({}, null, "/");
  //     })
  //     .catch(() => {
  //       Navigate("/");
  //     });
  // }, [refreshToken, expiresIn]);

  return accessToken;
}
