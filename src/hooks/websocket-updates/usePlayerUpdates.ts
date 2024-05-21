import { useEffect, useMemo, useState } from "react";
import { usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import { usePlayer } from "~/hooks/usePlayer";
import { useUser } from "~/hooks/useUser";
import useWebsocket from "~/hooks/useWebsocket";

import {
  resetPlayer,
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
  const [isSkipping, setIsSkipping] = useState(false);
  const { uid } = useUser();
  const { playerId } = useAppSelector((state) => state.room);
  const isLoggedIn = useMemo(() => Boolean(uid), [uid]);
  const spotifyPlayer = useSpotifyPlayer();
  const device = usePlayerDevice();
  const dispatch = useAppDispatch();

  /* //? Questionable way: IDK if this is a propper way to update each redux key independently (maybe there is a better way) */
  useWebsocket<string>(DBCollections.Players, playerId, setId, getKey<IFirebasePlayer, "id">("id"), undefined, "");
  useWebsocket<ISpotifyTrack | null>(DBCollections.Players, playerId, setNext, getKey<IFirebasePlayer, "next">("next"), undefined, null);
  useWebsocket<ISpotifyTrack[] | []>(DBCollections.Players, playerId, setQueue, getKey<IFirebasePlayer, "queue">("queue"), undefined, []);
  useWebsocket<ISpotifyTrack | null>(
    DBCollections.Players,
    playerId,
    setNowPlaying,
    getKey<IFirebasePlayer, "nowPlaying">("nowPlaying"),
    undefined,
    null
  );
  useWebsocket<number>(
    DBCollections.Players,
    playerId,
    setLastSeekTimestamp,
    getKey<IFirebasePlayer, "lastSeekTimestamp">("lastSeekTimestamp"),
    undefined,
    0
  );
  useWebsocket<boolean>(DBCollections.Players, playerId, setIsPlaying, getKey<IFirebasePlayer, "isPlaying">("isPlaying"), undefined, false);
  useWebsocket<boolean>(DBCollections.Players, playerId, setAutoplay, getKey<IFirebasePlayer, "isAutoplay">("isAutoplay"), undefined, true);
  /* //? ~Questionable way~ */

  const { lastSeekTimestamp: lastSkipTimestamp, isPlaying, currentDuration, nowPlaying, isAutoplay, skip, seek, play, togglePlay } = usePlayer();

  useEffect(() => {
    if (!isLoggedIn) spotifyPlayer?.pause();
  }, [isLoggedIn, spotifyPlayer]);

  useEffect(() => {
    if (!isLoggedIn && nowPlaying) dispatch(resetPlayer());
    if (!isLoggedIn) return;
    if (!device) return;
    if (nowPlaying) play(nowPlaying.trackUri);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device, nowPlaying]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    spotifyPlayer?.getVolume().then((volume) => dispatch(setVolume(volume * 100)));
  }, [device, dispatch, isLoggedIn, spotifyPlayer]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    spotifyPlayer?.seek(lastSkipTimestamp as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device, isLoggedIn, lastSkipTimestamp]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    isPlaying ? spotifyPlayer?.resume() : spotifyPlayer?.pause();
  }, [device, isLoggedIn, isPlaying, spotifyPlayer]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!device) return;
    const offset = 990;
    if (!(currentDuration && currentDuration >= (nowPlaying?.duration as number) - offset)) return;
    if (isAutoplay && !isSkipping) {
      console.log(`currentDuration ${currentDuration}`);
      console.log(`size ${nowPlaying?.duration}`);
      setIsSkipping(true);
      skip().then(() => {
        setIsSkipping(false);
      });
    } else {
      togglePlay(false).then(() => {
        seek(0);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDuration, nowPlaying?.duration]);

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
