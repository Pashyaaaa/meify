import { useState, useEffect } from "react";

const useGetPlaylists = () => {
  const [userPlaylist, setUserPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/playlists`,
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
        const albumTotal = data.total;
        setUserPlaylist(albumTotal);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  return { userPlaylist, loading, error };
};

export default useGetPlaylists;
