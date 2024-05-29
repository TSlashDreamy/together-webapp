import { routes } from "~/router/constants";
import SearchIcon from "~/assets/icons/navbar-icons/searchIcon.svg?react";
import FriendsIcon from "~/assets/icons/navbar-icons/friendsIcon.svg?react";
import HomeIcon from "~/assets/icons/navbar-icons/homeIcon.svg?react";
import CollectionIcon from "~/assets/icons/navbar-icons/collectionIcon.svg?react";
import LikeIcon from "~/assets/icons/navbar-icons/likeIcon.svg?react";
import { IContextMenuConfig } from "../context-menu/types";

export const alignmentOffset = 50;

export enum LINKS_NAME {
  Search = "Search",
  Friends = "Friends",
  Home = "Home",
  Colletions = "Collections",
  Liked = "Liked",
}

export const navLinks = [
  { path: routes.app.search, Icon: SearchIcon, name: LINKS_NAME.Search },
  { path: routes.app.friends, Icon: FriendsIcon, name: LINKS_NAME.Friends },
  { path: routes.app.home, Icon: HomeIcon, name: LINKS_NAME.Home },
  { path: routes.app.collections, Icon: CollectionIcon, name: LINKS_NAME.Colletions },
  { path: routes.app.liked, Icon: LikeIcon, name: LINKS_NAME.Liked },
];

export const contextMenuInitial: IContextMenuConfig = {
  position: {
    x: 0,
    y: window.innerHeight + alignmentOffset,
  },
  toggled: false,
};
