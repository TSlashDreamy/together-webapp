import { FC } from "react";
import { motion } from "framer-motion";

import { loaderTransitionContainerStyle } from "./styles";

const TransitionLoader: FC = () => {
  return (
    <motion.div
      className={`${loaderTransitionContainerStyle}`}
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
      {/* //!TEMP LOADER */}
      <div className="size-[100px] border-2 border-primary animate-loading" />
    </motion.div>
  );
};

export default TransitionLoader;
