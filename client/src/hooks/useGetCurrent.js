import { useState, useEffect } from "react";

const useGetCurrent = () => {
  const [currentTrack, setCurrentTrack] = useState({
    title: "",
    artist: "",
    duration: "",
    poster: "",
    isPlaying: false,
    currentTime: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false); // Menambahkan state isPaused

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
        const isPlaying = data.is_playing;
        const progressCurrent = data.progress_ms;

        setCurrentTrack({
          title: titleCurrent,
          artist: artisCurrent,
          duration: durationCurrent,
          poster: posterCurrent,
          isPlaying: isPlaying,
          currentTime: progressCurrent,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      if (!isPaused) {
        fetchCurrent();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]);

  return {
    currentTrack,
    loading,
    error,
    setIsPaused, // Expose setIsPaused to control the fetching interval
  };
};

export default useGetCurrent;
