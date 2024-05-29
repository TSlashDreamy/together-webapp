import { FC, MouseEvent, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MdOutlineChair as RoomIcon } from "react-icons/md";
import { useLocation } from "react-router-dom";

import UserContextMenu from "~/containers/user-context-menu";
import RoomContextMenu from "~/containers/room-context-menu";
import Logo from "~/components/logo";
import ProfileIcon from "~/assets/icons/navbar-icons/profileIcon.svg?react";
import NavbarNavlink from "./navbar-navlink/NavbarNavlink";
import NavbarItem from "./navbar-item";

import { useUser } from "~/hooks/useUser";
import { useConfig } from "~/hooks/useConfig";

import { alignmentOffset, contextMenuInitial, LINKS_NAME, navLinks } from "./constants";
import { routes } from "~/router/constants";
import { NotificationCounterType } from "~/constants";
import { IContextMenuConfig } from "~/components/context-menu/types";
import { IServiceState } from "~/services/types";
import { ServiceStatus } from "~/services/constants";
import { linkWrapperStyle, navBarStyles } from "./styles";

const AppNavbar: FC = () => {
  const { roomInvites, friendsRequest } = useUser();
  const { services } = useConfig();
  const [userContextMenu, setUserContextMenu] = useState<IContextMenuConfig>(contextMenuInitial);
  const [roomContextMenu, setRoomContextMenu] = useState<IContextMenuConfig>(contextMenuInitial);
  const userContextMenuRef = useRef<HTMLDivElement | null>(null);
  const roomContextMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const settingsStatus = useMemo(() => {
    const statuses = Object.values(services).map((service: IServiceState) => service.status);
    const errors = statuses.reduce((acc, status) => acc + Number(status === ServiceStatus.Error), 0);
    const unactives = statuses.reduce((acc, status) => acc + Number(status === ServiceStatus.Unactive), 0);

    if (errors) return { type: NotificationCounterType.ATTENTION, amount: errors };
    if (unactives) return { type: NotificationCounterType.NEUTRAL, amount: unactives };
  }, [services]);

  const navLinkStatus = useMemo(() => {
    return friendsRequest?.length ? { type: NotificationCounterType.ACTION, amount: friendsRequest?.length } : undefined;
  }, [friendsRequest?.length]);

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

  const getContextData = (e: MouseEvent<HTMLDivElement>, refEl: MutableRefObject<HTMLDivElement | null>) => {
    if (!refEl) return contextMenuInitial;
    const contextMenuAttr = refEl.current && refEl.current.getBoundingClientRect();
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

    if (userContextMenu.toggled) return resetContextMenu();
    const contextData = getContextData(e, userContextMenuRef);
    resetContextMenu();
    setUserContextMenu(contextData);
  };

  const showRoomContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (roomContextMenu.toggled) return resetContextMenu();
    const contextData = getContextData(e, roomContextMenuRef);
    resetContextMenu();
    setRoomContextMenu(contextData);
  };

  const resetContextMenu = () => {
    setUserContextMenu(contextMenuInitial);
    setRoomContextMenu(contextMenuInitial);
  };

  useEffect(() => {
    const handler: EventListener = (e) => {
      if (!userContextMenuRef.current?.contains(e.target as HTMLDivElement) && userContextMenu.toggled) resetContextMenu();
      if (!roomContextMenuRef.current?.contains(e.target as HTMLDivElement) && roomContextMenu.toggled) resetContextMenu();
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [roomContextMenu, userContextMenu]);

  return (
    <div className={classes}>
      <Logo onlyLogo />
      <div className={linkWrapperStyle}>
        {navLinks.map((navLink) => (
          <NavbarNavlink
            key={navLink.path}
            to={navLink.path}
            Icon={navLink.Icon}
            notificationCounter={navLink.name === LINKS_NAME.Friends ? navLinkStatus : undefined}
          />
        ))}
      </div>
      <div className={linkWrapperStyle}>
        <NavbarItem
          className="hover:[&>svg]:fill-text-white"
          onClick={showRoomContextMenu}
          Icon={RoomIcon}
          isActive={isRoomPage}
          notificationCounter={roomInvites ? { type: NotificationCounterType.ACTION, amount: roomInvites?.length } : undefined}
        />
        <NavbarItem onClick={showUserContextMenu} Icon={ProfileIcon} isActive={isSettingsProfilePage} notificationCounter={settingsStatus} />
      </div>
      <UserContextMenu contextMenuRef={userContextMenuRef} contextMenuConfig={userContextMenu} />
      <RoomContextMenu contextMenuRef={roomContextMenuRef} contextMenuConfig={roomContextMenu} />
    </div>
  );
};

export default AppNavbar;
