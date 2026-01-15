import { AnimatePresence, motion } from "motion/react";

export default function SlideUp({ children, motionKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="absolute w-full h-full inset-0 "
        key={motionKey}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
