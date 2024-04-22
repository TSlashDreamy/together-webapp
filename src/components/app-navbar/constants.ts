import { routes } from "~/router/constants";
import SearchIcon from "~/assets/icons/navbar-icons/searchIcon.svg?react";
import FriendsIcon from "~/assets/icons/navbar-icons/friendsIcon.svg?react";
import HomeIcon from "~/assets/icons/navbar-icons/homeIcon.svg?react";
import CollectionIcon from "~/assets/icons/navbar-icons/collectionIcon.svg?react";
import LikeIcon from "~/assets/icons/navbar-icons/likeIcon.svg?react";

export const alignmentOffset = 50

export const navLinks = [
  { path: routes.app.search, Icon: SearchIcon },
  { path: routes.app.friends, Icon: FriendsIcon },
  { path: routes.app.home, Icon: HomeIcon },
  { path: routes.app.collections, Icon: CollectionIcon },
  { path: routes.app.liked, Icon: LikeIcon },
];

export const contextMenuInitial = {
  position: {
    x: 0,
    y: window.innerHeight + alignmentOffset,
  },
  toggled: false,
};
