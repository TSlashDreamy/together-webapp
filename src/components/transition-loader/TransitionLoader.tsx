import { FC } from "react";
import { motion } from "framer-motion";

import Logo from "~/components/logo";

import * as S from "./styles";

const TransitionLoader: FC = () => {
  return (
    <motion.div
      className={S.loaderTransitionContainerStyle}
      initial={{
        width: "105%",
        height: "105%",
      }}
      animate={{
        width: "0%",
        height: "0%",
        transition: { delay: 0.7, duration: 1, ease: "circInOut" },
      }}
      exit={{
        width: "105%",
        height: "105%",
        transition: { duration: 1, ease: "circInOut" },
      }}
    >
      <div className={S.loaderWrapper}>
        <Logo onlyLogo svgStyles={S.loaderLogo} />
      </div>
    </motion.div>
  );
};

export default TransitionLoader;
