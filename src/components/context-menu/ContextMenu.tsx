import { FC, HTMLAttributes, MouseEvent, Ref } from "react";

import Button from "~/components/button";
import CardWrapper from "~/components/card-wrapper";

import * as S from "./styles";
import { createPortal } from "react-dom";

interface IButtons {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  danger?: boolean;
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  posX: number;
  posY: number;
  isToggled: boolean;
  buttons: IButtons[];
  contextMenuRef: Ref<HTMLElement>;
}

const ContextMenu: FC<IProps> = ({ posX, posY, isToggled, buttons, title, contextMenuRef, children }) => {
  return createPortal(
    <menu
      ref={contextMenuRef}
      style={{ top: `${posY + 2}px`, left: `${posX + 2}px` }}
      className={S.menuStyle.concat(" ", isToggled ? S.menuEnabled : S.menuDisabled)}
    >
      <CardWrapper>
        <div className={S.headerStyle}>
          <span className={S.greetingsStyle}>Hello 👋</span>
          <span className={S.userNameStyle}>{title}</span>
        </div>
        <hr className={S.dividerStyle} />
        {children}
        {Boolean(children) && <hr className={S.dividerStyle} />}
        <div className={S.contentWrapperStyle}>
          {buttons.map((button, index) => {
            const handleClick = (e: MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              button.onClick();
            };

            return (
              <Button
                large
                secondary
                outline
                danger={button.danger}
                disabled={button.disabled}
                isLoading={button.isLoading}
                key={index}
                onClick={handleClick}
              >
                <span>{button.text}</span>
              </Button>
            );
          })}
        </div>
      </CardWrapper>
    </menu>,
    document.getElementById("portal") as HTMLElement
  );
};

export default ContextMenu;
