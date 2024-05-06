import { FC } from "react";
import { motion } from "framer-motion";
import { ImSpinner9 as TempLoadingIcon } from "react-icons/im";

import Typography from "~/components/typography";

interface IProps {
  message: string;
}

const OverlayMessage: FC<IProps> = ({ message }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 0.5 }}
      className="fixed z-[60] inset-0 w-full h-full flex flex-col gap-[50px] justify-center items-center bg-semitransparent-dark backdrop-blur-[100px] transition-all"
    >
      <TempLoadingIcon className="text-text-white size-[10vw] animate-spin" />
      <Typography.H2>{message}</Typography.H2>
    </motion.div>
  );
};

export default OverlayMessage;
