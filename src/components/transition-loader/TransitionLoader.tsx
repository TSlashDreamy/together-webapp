import { FC } from "react";
import { motion } from "framer-motion";

const TransitionLoader: FC = () => {
  return (
    <motion.div
      className="fixed z-40 flex items-center justify-center h-full bg-background overflow-hidden"
      initial={{ width: "100%" }}
      animate={{ width: "0%", transition: { delay: 0.7, duration: 1, ease: 'circInOut' } }}
      exit={{ width: "100%", transition: { duration: 1, ease: 'circInOut' } }}
    >
      <div className="size-[100px] border-2 border-primary animate-loading" />
    </motion.div>
  );
};

export default TransitionLoader;
