import { GiEmptyChessboard } from "react-icons/gi";

import MusicIcon from "~/assets/icons/content-icons/music.svg?react";
import VideoIcon from "~/assets/icons/content-icons/video.svg?react";
import FilmIcon from "~/assets/icons/content-icons/film.svg?react";
import PictureIcon from "~/assets/icons/content-icons/image.svg?react";

import { Contents } from "~/types";

export const contents = {
    Music: { contentName: Contents.Music, Icon: MusicIcon },
    Video: { contentName: Contents.Video, Icon: VideoIcon },
    Film: { contentName: Contents.Film, Icon: FilmIcon },
    Picture: { contentName: Contents.Picture, Icon: PictureIcon },
    Document: { contentName: Contents.Document, Icon: GiEmptyChessboard },
}