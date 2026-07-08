"use client";

import { motion } from "framer-motion";

export default function SlideIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up", // up, down, left, right
  distance = 50,
  className = "",
}) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } };
      default:
        return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={getVariants()}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
