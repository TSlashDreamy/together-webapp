import MusicIcon from "~/assets/icons/content-icons/music.svg?react";
import VideoIcon from "~/assets/icons/content-icons/video.svg?react";
import FilmIcon from "~/assets/icons/content-icons/film.svg?react";
import ImageIcon from "~/assets/icons/content-icons/image.svg?react";
import { SearchChips } from "~/pages/search/top-bar/constants";

export const cards = [
  {
    Icon: MusicIcon,
    description: "Music and audio",
    borderStyle: "border-content-music",
    bgStyle: "hover:bg-content-music",
    name: SearchChips.Music,
  },
  {
    Icon: VideoIcon,
    description: "Video and clips",
    borderStyle: "border-content-video",
    bgStyle: "hover:bg-content-video",
    disabled: true,
    name: SearchChips.Video,
  },
  {
    Icon: FilmIcon,
    description: "Films together",
    borderStyle: "border-content-films",
    bgStyle: "hover:bg-content-films",
    disabled: true,
    name: SearchChips.Film,
  },
  {
    Icon: ImageIcon,
    description: "Pictures and images",
    borderStyle: "border-content-pictures",
    bgStyle: "hover:bg-content-pictures",
    disabled: true,
    name: SearchChips.Image,
  },
];
