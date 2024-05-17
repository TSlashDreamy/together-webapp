import { useCallback } from "react";
import { FirebaseError } from "firebase/app";
import { usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import useDatabase from "~/hooks/useDatabase";
import { useSpotify } from "~/hooks/useSpotify";

import { showNotification } from "~/redux/slices/notificationSlice";
import {
  setIsLoading,
  resetIsLoading,
  setCurrentDuration,
  resetCurrentDuration,
  setVolume,
  setQueue,
  setNext,
  setNowPlaying,
} from "~/redux/slices/playerSlice";

import { getKey } from "~/utils";
import { DBCollections } from "~/constants";
import { NotificationType, IPlayer, ISpotifyTrack } from "~/types";

export const usePlayer = () => {
  const player = useAppSelector((state) => state.player);
  const { id, isPlaying, next, queue, nowPlaying, isAutoplay, volume } = player;
  const { updateData } = useDatabase();
  const dispatch = useAppDispatch();
  const spotifyPlayer = useSpotifyPlayer();
  const { play: spotifyPlay } = useSpotify();
  const spotifyDevice = usePlayerDevice();

  const _handlePlayerError = useCallback(
    (e: unknown) => {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Player)",
        })
      );
    },
    [dispatch]
  );

  const _updatePlayerInfo = useCallback(
    async <T>(data: T, path: string) => {
      await updateData(DBCollections.Players, data, id as string, path);
    },
    [id, updateData]
  );

  const switchAutoplay = async (state: boolean) => {
    try {
      dispatch(setIsLoading());

      await _updatePlayerInfo(state, getKey<IPlayer, "isAutoplay">("isAutoplay"));
    } catch (error) {
      _handlePlayerError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const togglePlay = useCallback(async () => {
    try {
      dispatch(setIsLoading());

      await _updatePlayerInfo(!isPlaying, getKey<IPlayer, "isPlaying">("isPlaying"));
    } catch (error) {
      _handlePlayerError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  }, [_handlePlayerError, _updatePlayerInfo, dispatch, isPlaying]);

  const skip = useCallback(async () => {
    try {
      dispatch(setIsLoading());

      const nextItem = next || null;
      const newQueue = queue?.filter((_, index) => index !== 0) || [];

      await _updatePlayerInfo(nextItem, getKey<IPlayer, "nowPlaying">("nowPlaying"));
      await _updatePlayerInfo(newQueue, getKey<IPlayer, "queue">("queue"));
      await _updatePlayerInfo(newQueue[0] || null, getKey<IPlayer, "next">("next"));
      queue === null || !queue.length && dispatch(setNowPlaying(null)) && togglePlay();
      queue.length === 1 && dispatch(setQueue([])) && dispatch(setNext(null));
    } catch (error) {
      _handlePlayerError(error);
    } finally {
      dispatch(resetCurrentDuration());
      dispatch(resetIsLoading());
    }
  }, [_handlePlayerError, _updatePlayerInfo, dispatch, next, queue, togglePlay]);

  const seek = async (position_ms: number) => {
    try {
      dispatch(setIsLoading());

      await _updatePlayerInfo(position_ms, getKey<IPlayer, "lastSeekTimestamp">("lastSeekTimestamp"));
      dispatch(setCurrentDuration(position_ms));
    } catch (error) {
      _handlePlayerError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const changeVolume = async (desiredVolume: number) => {
    try {
      dispatch(setIsLoading());
      await spotifyPlayer?.setVolume(desiredVolume / 100);
      const newVolume = await spotifyPlayer?.getVolume();
      dispatch(setVolume(newVolume ? newVolume * 100 : (volume as number)));
    } catch (error) {
      _handlePlayerError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const play = useCallback(
    async (trackUri: string) => {
      try {
        dispatch(setIsLoading());
        await spotifyPlay(spotifyDevice?.device_id as string, trackUri);
      } catch (error) {
        console.error(error); // !TEMP
        _handlePlayerError(error);
      } finally {
        dispatch(resetIsLoading());
      }
    },
    [_handlePlayerError, dispatch, spotifyDevice?.device_id, spotifyPlay]
  );

  const addToQueue = async (track: ISpotifyTrack) => {
    try {
      dispatch(setIsLoading());

      if (!nowPlaying) {
        await _updatePlayerInfo(track, getKey<IPlayer, "nowPlaying">("nowPlaying"));
        await _updatePlayerInfo(isAutoplay, getKey<IPlayer, "isPlaying">("isPlaying"));
      } else {
        const newQueue = [...(queue || []), track];
        await _updatePlayerInfo(newQueue, getKey<IPlayer, "queue">("queue"));
        await _updatePlayerInfo(newQueue[0], getKey<IPlayer, "next">("next"));
      }
    } catch (error) {
      _handlePlayerError(error);
    } finally {
      dispatch(resetIsLoading());
      dispatch(
        showNotification({
          type: NotificationType.Success,
          content: `${track.name} was successfully added to room queue`,
        })
      );
    }
  };

  return {
    switchAutoplay,
    togglePlay,
    skip,
    seek,
    changeVolume,
    play,
    addToQueue,
    ...player,
  };
};
