import { useState, useEffect } from "react";

const useGetTop = () => {
  const [userTrack, setUserTrack] = useState();
  const [userArtist, setUserArtist] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      let token = localStorage.getItem("token");
      try {
        const tracks = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const artist = await fetch(
          `https://api.spotify.com/v1/me/top/artists?limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!tracks.ok || !artist.ok) {
          throw new Error("Network response was not ok");
        }
        const dataTracks = await tracks.json();
        const dataArtist = await artist.json();
        setUserTrack(dataTracks.items);
        setUserArtist(dataArtist.items);
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
    userArtist,
    loading,
    error,
  };
};

export default useGetTop;