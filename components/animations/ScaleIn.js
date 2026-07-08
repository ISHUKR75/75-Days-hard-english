"use client";

import { motion } from "framer-motion";

export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.4,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration, delay, type: "spring", stiffness: 200, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
