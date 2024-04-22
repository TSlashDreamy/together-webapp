import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import ContextMenu from "~/components/context-menu";
import RoomIcon from "~/assets/icons/navbar-icons/roomIcon.svg?react";
import ProfileIcon from "~/assets/icons/navbar-icons/profileIcon.svg?react";

import { useAuth } from "~/hooks/useAuth";

import Logo from "../logo";
import NavbarNavlink from "./navbar-navlink/NavbarNavlink";
import { routes } from "~/router/constants";

import { alignmentOffset, contextMenuInitial, navLinks } from "./constants";
import { linkWrapperStyle, navBarStyles } from "./styles";
import NavbarItem from "./navbar-item";

const AppNavbar: FC = () => {
  const { signUserOut, isLoggingIn } = useAuth();
  const [contextMenu, setContextMenu] = useState(contextMenuInitial);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const classes = twMerge(...navBarStyles);

  const contextMenuButtons = [
    { text: "My Profile", onClick: () => null, disabled: true },
    { text: "Settings", onClick: () => null, disabled: true },
    { text: "Sign out", onClick: signUserOut, isLoading: isLoggingIn },
  ];

  const showContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const contextMenuAttr = contextMenuRef.current && contextMenuRef.current.getBoundingClientRect();
    const clickedItem = e.currentTarget.getBoundingClientRect();

    setContextMenu({
      position: {
        x: clickedItem.x + clickedItem.width,
        y: clickedItem.y - (contextMenuAttr ? contextMenuAttr.height : alignmentOffset),
      },
      toggled: true,
    });
  };

  const resetContextMenu = () => {
    setContextMenu(contextMenuInitial);
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
      <Logo className="size-50px" onlyLogo />
      <div className={linkWrapperStyle}>
        {navLinks.map((navLink) => (
          <NavbarNavlink key={navLink.path} to={navLink.path} Icon={navLink.Icon} />
        ))}
      </div>
      <div className={linkWrapperStyle}>
        <NavbarNavlink to={routes.app.room} Icon={RoomIcon} />
        <NavbarItem onClick={showContextMenu} Icon={ProfileIcon} />
      </div>
      <ContextMenu
        contextMenuRef={contextMenuRef}
        isToggled={contextMenu.toggled}
        posX={contextMenu.position.x}
        posY={contextMenu.position.y}
        title={"UserName"} // TODO: Firebase username here
        buttons={contextMenuButtons}
      />
    </div>
  );
};

export default AppNavbar;
