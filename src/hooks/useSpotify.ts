import axios from "axios";
import { useCallback } from "react";
import { SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk";

import { useAppSelector } from "~/hooks/useRedux";
import { useUser } from "~/hooks/useUser";

import { spotifyWebApi } from "~/services/spotify";
import { ISearchResult, ISpotifyTrack } from "~/types";

export const useSpotify = () => {
  const envData = import.meta.env;
  const { services } = useAppSelector((state) => state.app);
  const { userName } = useUser();
  const {
    access_token: current_access_token,
    refresh_token: current_refresh_token,
    expires_in: current_expires_in,
  } = services.spotify;

  const _getAuthor = (artists: SimplifiedArtist[]) => {
    return artists.map((artist) => artist.name).join(", ");
  };

  const _transformTracks = useCallback(
    (tracks: Track[]) => {
      return tracks.map(
        (track) =>
          ({
            name: track.name,
            author: _getAuthor(track.artists),
            duration: track.duration_ms,
            image: track.album.images[0].url,
            trackUri: track.uri,
            requestedBy: userName,
          } as ISpotifyTrack)
      );
    },
    [userName]
  );

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

  const search = useCallback(
    async (searchPrompt: string) => {
      const { tracks } = await spotifyWebApi.search(searchPrompt, ["track"]);

      const transformedTracks = {
        songs: _transformTracks(tracks.items),
        next: tracks.next,
        total: tracks.total,
      };
      return { tracks: transformedTracks as ISearchResult };
    },
    [_transformTracks]
  );

  const play = useCallback(
    async (deviceId: string, trackUri: string) => {
      const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
      const payload = { uris: [trackUri] };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${current_access_token}`,
      };

      await axios.put(url, payload, { headers });
    },
    [current_access_token]
  );

  const getAccessToken = useCallback(
    (callback: (token: string) => void) => {
      callback(current_access_token as string);
    },
    [current_access_token]
  );

  return {
    getSpotifyToken,
    refreshSpotifyToken,
    getAccessToken,
    search,
    play,
    current_access_token,
    current_refresh_token,
    current_expires_in,
  };
};
