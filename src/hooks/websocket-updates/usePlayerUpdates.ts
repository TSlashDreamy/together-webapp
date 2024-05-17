import { useEffect, useMemo } from "react";
import { usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import { usePlayer } from "~/hooks/usePlayer";
import { useUser } from "~/hooks/useUser";
import useWebsocket from "~/hooks/useWebsocket";

import {
  setAutoplay,
  setCurrentDuration,
  setId,
  setIsPlaying,
  setLastSeekTimestamp,
  setNext,
  setNowPlaying,
  setQueue,
  setVolume,
} from "~/redux/slices/playerSlice";

import { DBCollections } from "~/constants";
import { IFirebasePlayer, ISpotifyTrack } from "~/types";
import { getKey } from "~/utils";

export const usePlayerUpdates = () => {
  const { uid } = useUser();
  const { playerId } = useAppSelector((state) => state.room);
  const isLoggedIn = useMemo(() => Boolean(uid), [uid]);
  const spotifyPlayer = useSpotifyPlayer();
  const device = usePlayerDevice();
  const dispatch = useAppDispatch();

  /* //? Questionable way: IDK if this is a propper way to update each redux key independently (maybe there is a better way) */
  useWebsocket<string>(DBCollections.Players, playerId, setId, getKey<IFirebasePlayer, "id">("id"));
  useWebsocket<ISpotifyTrack>(DBCollections.Players, playerId, setNext, getKey<IFirebasePlayer, "next">("next"));
  useWebsocket<ISpotifyTrack[]>(DBCollections.Players, playerId, setQueue, getKey<IFirebasePlayer, "queue">("queue"));
  useWebsocket<ISpotifyTrack>(DBCollections.Players, playerId, setNowPlaying, getKey<IFirebasePlayer, "nowPlaying">("nowPlaying"));
  useWebsocket<number>(DBCollections.Players, playerId, setLastSeekTimestamp, getKey<IFirebasePlayer, "lastSeekTimestamp">("lastSeekTimestamp"));
  useWebsocket<boolean>(DBCollections.Players, playerId, setIsPlaying, getKey<IFirebasePlayer, "isPlaying">("isPlaying"));
  useWebsocket<boolean>(DBCollections.Players, playerId, setAutoplay, getKey<IFirebasePlayer, "isAutoplay">("isAutoplay"));
  /* //? ~Questionable way~ */

  const { lastSeekTimestamp: lastSkipTimestamp, isPlaying, currentDuration, nowPlaying, isAutoplay, skip, play, togglePlay } = usePlayer();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    if (nowPlaying) {
      play(nowPlaying.trackUri).then(() => {
        isAutoplay ? spotifyPlayer?.resume() : spotifyPlayer?.pause();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device, isLoggedIn, nowPlaying, play, spotifyPlayer]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    spotifyPlayer?.getVolume().then((volume) => dispatch(setVolume(volume * 100)));
  }, [device, dispatch, isLoggedIn, spotifyPlayer]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    spotifyPlayer?.seek(lastSkipTimestamp as number);
  }, [device, isLoggedIn, lastSkipTimestamp, spotifyPlayer]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    isPlaying ? spotifyPlayer?.resume() : spotifyPlayer?.pause();
  }, [device, isLoggedIn, isPlaying, spotifyPlayer]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    const offset = 970;
    if (!(currentDuration && currentDuration >= (nowPlaying?.duration as number) - offset)) return;
    isAutoplay ? skip() : togglePlay();
  }, [currentDuration, device, isAutoplay, isLoggedIn, nowPlaying?.duration, skip, togglePlay]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    if (!isPlaying) return;
    const timer = setInterval(() => {
      spotifyPlayer?.getCurrentState().then((data) => dispatch(setCurrentDuration(data?.position as number)));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [device, dispatch, isLoggedIn, isPlaying, spotifyPlayer]);
};
