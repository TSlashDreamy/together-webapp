import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import UserContextMenu from "~/containers/user-context-menu";
import RoomContextMenu from "~/containers/room-context-menu";
import Logo from "~/components/logo";
import RoomIcon from "~/assets/icons/navbar-icons/roomIcon.svg?react";
import ProfileIcon from "~/assets/icons/navbar-icons/profileIcon.svg?react";
import NavbarNavlink from "./navbar-navlink/NavbarNavlink";
import NavbarItem from "./navbar-item";

import { alignmentOffset, contextMenuInitial, navLinks } from "./constants";
import { IContextMenuConfig } from "~/components/context-menu/types";
import { linkWrapperStyle, navBarStyles } from "./styles";
import { routes } from "~/router/constants";
import { useLocation } from "react-router-dom";

const AppNavbar: FC = () => {
  const [userContextMenu, setUserContextMenu] = useState<IContextMenuConfig>(contextMenuInitial);
  const [roomContextMenu, setRoomContextMenu] = useState<IContextMenuConfig>(contextMenuInitial);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const isRoomPage = useMemo(() => {
    const rootRoom = routes.app.room;
    const pathArr = location.pathname.split("/");
    pathArr.length = 3;

    return pathArr.join("/") === rootRoom.slice(0, rootRoom.indexOf("/:"));
  }, [location.pathname]);

  const isSettingsProfilePage = useMemo(() => {
    const pathName = location.pathname;
    return pathName === routes.app.settings || pathName === routes.app.myProfile;
  }, [location.pathname]);

  const classes = twMerge(...navBarStyles);

  const getContextData = (e: MouseEvent<HTMLDivElement>) => {
    const contextMenuAttr = contextMenuRef.current && contextMenuRef.current.getBoundingClientRect();
    const clickedItem = e.currentTarget.getBoundingClientRect();

    return {
      position: {
        x: clickedItem.x + clickedItem.width,
        y: clickedItem.y - (contextMenuAttr ? contextMenuAttr.height : alignmentOffset),
      },
      toggled: true,
    };
  };

  const showUserContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const contextData = getContextData(e);
    resetContextMenu();
    setUserContextMenu(contextData);
  };

  const showRoomContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const contextData = getContextData(e);
    resetContextMenu();
    setRoomContextMenu(contextData);
  };

  const resetContextMenu = () => {
    setUserContextMenu(contextMenuInitial);
    setRoomContextMenu(contextMenuInitial);
  };

  useEffect(() => {
    const handler: EventListener = (e) => {
      if (!contextMenuRef.current?.contains(e.target as HTMLDivElement)) {
        resetContextMenu();
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div className={classes}>
      <Logo className="size-50px" onlyLogo /> {/*// !TEMP */}
      <div className={linkWrapperStyle}>
        {navLinks.map((navLink) => (
          <NavbarNavlink key={navLink.path} to={navLink.path} Icon={navLink.Icon} />
        ))}
      </div>
      <div className={linkWrapperStyle}>
        <NavbarItem onClick={showRoomContextMenu} Icon={RoomIcon} isActive={isRoomPage} />
        <NavbarItem onClick={showUserContextMenu} Icon={ProfileIcon} isActive={isSettingsProfilePage} />
      </div>
      <UserContextMenu contextMenuRef={contextMenuRef} contextMenuConfig={userContextMenu} />
      <RoomContextMenu contextMenuRef={contextMenuRef} contextMenuConfig={roomContextMenu} />
    </div>
  );
};

export default AppNavbar;
