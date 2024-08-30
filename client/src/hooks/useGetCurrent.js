import { useState, useEffect } from "react";
import { throttle } from "lodash";

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
  const [isPaused, setIsPaused] = useState(false);

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

    // Gunakan throttle untuk membatasi pemanggilan fetchCurrent
    const throttledFetch = throttle(fetchCurrent, 5000); // Panggil sekali setiap 5 detik

    const intervalId = setInterval(() => {
      if (!isPaused) {
        throttledFetch();
      }
    }, 1000); // Interval polling tetap 1 detik, tetapi fetch hanya dilakukan setiap 5 detik

    return () => {
      clearInterval(intervalId);
      throttledFetch.cancel();
    };
  }, [isPaused]);

  return {
    currentTrack,
    loading,
    error,
    setIsPaused,
  };
};

export default useGetCurrent;
