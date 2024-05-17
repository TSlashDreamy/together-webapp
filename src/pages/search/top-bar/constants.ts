import AllIcon from "~/assets/icons/content-icons/all.svg?react";
import MusicIcon from "~/assets/icons/content-icons/music.svg?react";
import VideoIcon from "~/assets/icons/content-icons/video.svg?react";
import FilmIcon from "~/assets/icons/content-icons/film.svg?react";
import ImageIcon from "~/assets/icons/content-icons/image.svg?react";
import DocumentIcon from "~/assets/icons/content-icons/document.svg?react";

export enum SearchChips {
  All = "All",
  Music = "Music",
  Video = "Video",
  Film = "Film",
  Image = "Image",
  Document = "Document",
}

export const Inputs = {
  Search: "search",
};

export const chips = [
  { Icon: AllIcon, name: SearchChips.All, style: { wrapper: "border-primary", icon: "text-primary fill-primary", active: "bg-all-gradient large-bg-size animate-moveGradient" } },
  {
    Icon: MusicIcon,
    name: SearchChips.Music,
    style: { wrapper: "border-content-music", icon: "text-content-music fill-content-music", active: "bg-content-music" },
  },
  {
    Icon: VideoIcon,
    name: SearchChips.Video,
    style: { wrapper: "border-content-video", icon: "text-content-video fill-content-video", active: "bg-content-video" },
    disabled: true,
  },
  {
    Icon: FilmIcon,
    name: SearchChips.Film,
    style: { wrapper: "border-content-films", icon: "text-content-films fill-content-films", active: "bg-content-films" },
    disabled: true,
  },
  {
    Icon: ImageIcon,
    name: SearchChips.Image,
    style: { wrapper: "border-content-pictures", icon: "text-content-music fill-content-pictures", active: "bg-content-pictures" },
    disabled: true,
  },
  {
    Icon: DocumentIcon,
    name: SearchChips.Document,
    style: { wrapper: "border-content-documents", icon: "text-content-music fill-content-documents", active: "bg-content-documents" },
    disabled: true,
  },
];

export const historyKey = "search-history";
