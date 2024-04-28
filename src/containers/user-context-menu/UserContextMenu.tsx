import { FC, Ref } from "react";

import ContextMenu from "~/components/context-menu";

import { useAuth } from "~/hooks/useAuth";
import { useAppSelector } from "~/hooks/useRedux";

import { IContextMenuConfig } from "~/components/context-menu/types";

interface IProps {
  contextMenuRef: Ref<HTMLElement>;
  contextMenuConfig: IContextMenuConfig;
}

const UserContextMenu: FC<IProps> = ({ contextMenuRef, contextMenuConfig }) => {
  const { signUserOut, isLoggingIn } = useAuth();
  const { userName } = useAppSelector((state) => state.user);

  const contextMenuButtons = [
    { text: "My Profile", onClick: () => null, disabled: true },
    { text: "Settings", onClick: () => null, disabled: true },
    { text: "Sign out", onClick: signUserOut, isLoading: isLoggingIn },
  ];

  return (
    <ContextMenu
      contextMenuRef={contextMenuRef}
      isToggled={contextMenuConfig.toggled}
      posX={contextMenuConfig.position.x}
      posY={contextMenuConfig.position.y}
      title={userName || "Friend"}
      buttons={contextMenuButtons}
    />
  );
};

export default UserContextMenu;
