import { useState, useEffect } from "react";

const useGetCurrent = () => {
  const [userCurrent, setUserCurrent] = useState("");
  const [userCurrentArtist, setUserCurrentArtist] = useState("");
  const [userCurrentPoster, setCurrentPoster] = useState("");
  const [userCurrentDuration, setUserCurrentDuration] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrent = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/currently-playing`,
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
        const titleCurrent = data.item.name;
        const artisCurrent = data.item.artists[0].name;
        const durationCurrent = data.item.duration_ms;
        const posterCurrent = data.item.album.images[0].url;
        const isPaused = data.actions.disallows;

        setUserCurrent(titleCurrent);
        setUserCurrentArtist(artisCurrent);
        setUserCurrentDuration(durationCurrent);
        setCurrentPoster(posterCurrent);
        setIsPaused(isPaused);

        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrent();
  }, []);

  return {
    userCurrent,
    userCurrentArtist,
    userCurrentDuration,
    userCurrentPoster,
    isPaused,
    loading,
    error,
  };
};

export default useGetCurrent;
