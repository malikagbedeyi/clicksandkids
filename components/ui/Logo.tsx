"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-5xl"
  };

  const ampersandVariants = {
    rest: { scale: 1, color: "#E09F7D" },
    hover: { scale: 1.12, color: "#E09F7D" }
  };

  return (
    <motion.div
      className={`${sizeMap[size]} font-bold tracking-tight ${className}`}
      style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#4A4A4A" }}
      whileHover="hover"
      initial="rest"
    >
      <span>Click</span>
      <motion.span
        className="inline-block mx-2"
        variants={ampersandVariants}
        transition={{ type: "spring", stiffness: 200 }}
      >
        &
      </motion.span>
      <span>Kids</span>
    </motion.div>
  );
}
