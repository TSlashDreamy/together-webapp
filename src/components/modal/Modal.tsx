import { FC, HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { RxCross1 as CloseIcon } from "react-icons/rx";

import Typography from "~/components/typography";
import IconButton from "~/components/icon-button";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
  title: string;
  hideModal: () => void;
}

const Modal: FC<IProps> = ({ children, isVisible, title, hideModal }) => {
  return createPortal(
    <div
      style={{ left: isVisible ? "0%" : "-100%", opacity: isVisible ? 1 : 0 }}
      className="fixed z-20 top-0 left-0 size-full bg-semitransparent-dark backdrop-blur-[100px] transition-all"
    >
      <div className="absolute top-1/2 left-1/2 min-w-[40vw] min-h-[27vw] px-[3vw] py-[1vw] flex flex-col items-center gap-[0.5vw] bg-semitransparent-dark rounded-2xl translate-x-[-50%] translate-y-[-50%] backdrop-blur-[100px]">
        <div className="w-full flex items-center justify-between">
          <Typography.H3>{title}</Typography.H3>
          <IconButton small Icon={CloseIcon} onClick={hideModal} />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
