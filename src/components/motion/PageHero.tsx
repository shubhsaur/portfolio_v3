"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

/** Title: slides up from the bottom of its own clipped container */
const titleVariants = {
  hidden: { y: "105%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
    },
  },
};

/** Description: subtle fade + slight rise after the title */
const descVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
    },
  },
};

export function PageHero({ title, description, className }: PageHeroProps) {
  return (
    <motion.div
      className={`space-y-4 text-left ${className ?? ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* overflow-hidden clips the h1 so it appears to rise from the bottom */}
      <div className="overflow-hidden">
        <motion.h1
          className="text-5xl font-bold text-foreground sm:text-6xl"
          variants={titleVariants}
        >
          {title}
        </motion.h1>
      </div>

      {description && (
        <motion.p
          className="max-w-3xl text-xl text-muted-foreground"
          variants={descVariants}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
