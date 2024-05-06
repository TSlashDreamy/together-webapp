import axios from "axios";
import { useCallback } from "react";
import { useAppSelector } from "./useRedux";

export const useSpotify = () => {
  const envData = import.meta.env;
  const { services } = useAppSelector((state) => state.app);
  const {
    access_token: current_access_token,
    refresh_token: current_refresh_token,
    expires_in: current_expires_in,
  } = services.spotify;

  const getSpotifyToken = useCallback(
    async (code: string | null) => {
      if (code) {
        const codeVerifier = localStorage.getItem("spotify_code_verifier");
        const url = "https://accounts.spotify.com/api/token";

        const payload = new URLSearchParams({
          client_id: envData.VITE_SPOTIFY_CLIENT_ID,
          grant_type: "authorization_code",
          code,
          redirect_uri: envData.VITE_SPOTIFY_REDIRECT_URI,
          code_verifier: codeVerifier as string,
        });

        const { data } = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        localStorage.removeItem("spotify_code_verifier");

        return {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_in: data.expires_in,
        };
      }
    },
    [envData.VITE_SPOTIFY_CLIENT_ID, envData.VITE_SPOTIFY_REDIRECT_URI]
  );

  const refreshSpotifyToken = useCallback(async () => {
    const refreshToken = services.spotify.refresh_token;
    const url = "https://accounts.spotify.com/api/token";

    const payload = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken as string,
      client_id: envData.VITE_SPOTIFY_CLIENT_ID,
    });

    const { data } = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(`REFRESHED SPOTIFY TOKEN: ${new Date().toTimeString()}`); // !TEMP
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    };
  }, [envData.VITE_SPOTIFY_CLIENT_ID, services.spotify.refresh_token]);

  return {
    getSpotifyToken,
    refreshSpotifyToken,
    current_access_token,
    current_refresh_token,
    current_expires_in,
  };
};
