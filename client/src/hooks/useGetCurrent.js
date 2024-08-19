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

    fetchCurrent();

    // let intervalId;
    // if (!isPaused) {
    //   intervalId = setInterval(() => {
    //     setCurrentTime((prevTime) => prevTime + 1000); // Tambahkan 1 detik
    //   }, 1000);
    // }

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);
  // dependencies di isi isPaused

  return {
    currentTrack,
    loading,
    error,
  };
};

export default useGetCurrent;
