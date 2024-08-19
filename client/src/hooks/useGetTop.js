import { useState, useEffect } from "react";

const useGetTop = () => {
  const [userTrack, setUserTrack] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return {
    userTrack,
    loading,
    error,
  };
};

export default useGetTop;
