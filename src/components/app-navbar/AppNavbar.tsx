import { FC } from "react";

import SearchIcon from "~/assets/icons/searchIcon.svg?react";
import FriendsIcon from "~/assets/icons/friendsIcon.svg?react";
import HomeIcon from "~/assets/icons/homeIcon.svg?react";
import CollectionIcon from "~/assets/icons/collectionIcon.svg?react";
import LikeIcon from "~/assets/icons/likeIcon.svg?react";
import RoomIcon from "~/assets/icons/roomIcon.svg?react";
import ProfileIcon from "~/assets/icons/profileIcon.svg?react";

import Logo from "../logo";
import NavbarNavlink from "./navbar-navlink/NavbarNavlink";

const AppNavbar: FC = () => {
  return (
    <div className="fixed left-0 flex flex-col items-center content-center h-[100vh] px-[25px] py-[30px] justify-between bg-gradient-to-b from-primary-transparent to-light-transparent rounded-r-[20px] backdrop-blur-[150px]">
      <Logo className="size-50px" onlyLogo />
      <div className="flex flex-col gap-[50px] py-[3px]">
        <NavbarNavlink to="/app/search" Icon={SearchIcon} />
        <NavbarNavlink to="/app/friends" Icon={FriendsIcon} />
        <NavbarNavlink to="/app" Icon={HomeIcon} />
        <NavbarNavlink to="/app/collections" Icon={CollectionIcon} />
        <NavbarNavlink to="/app/liked" Icon={LikeIcon} />
      </div>
      <div className="flex flex-col gap-[50px] py-[3px]">
        <NavbarNavlink to="/app/room" Icon={RoomIcon} />
        <ProfileIcon />
      </div>
    </div>
  );
};

export default AppNavbar;
