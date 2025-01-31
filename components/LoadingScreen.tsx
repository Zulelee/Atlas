"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={() => (document.body.style.overflow = "unset")}
    >
      <svg width="200" height="200" viewBox="0 0 100 100">
        <motion.path
          d="M50 5 L95 75 L5 75 Z"
          fill="none"
          stroke="#0066ff"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.text
          x="50"
          y="85"
          textAnchor="middle"
          fill="#0066ff"
          fontSize="16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          ATLAS
        </motion.text>
      </svg>
    </motion.div>
  );
}
