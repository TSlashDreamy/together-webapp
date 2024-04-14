import { FC } from "react";
import { motion } from "framer-motion";

import { loaderTransitionContainerStyle } from "./styles";

const TransitionLoader: FC = () => {
  return (
    <motion.div
      className={`${loaderTransitionContainerStyle}`}
      initial={{
        width: "100%",
        height: "100%",
      }}
      animate={{
        width: "0%",
        height: "0%",
        transition: { delay: 0.7, duration: 1, ease: "circInOut" },
      }}
      exit={{
        width: "100%",
        height: "100%",
        transition: { duration: 1, ease: "circInOut" },
      }}
    >
      {/* //!TEMP LOADER */}
      <div className="size-[100px] border-2 border-primary animate-loading" />
    </motion.div>
  );
};

export default TransitionLoader;
