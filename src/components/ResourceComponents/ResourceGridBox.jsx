import { motion } from "motion/react";

function ResourceGridBox({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="
        grid grid-cols-[1.4fr,1fr,2fr,1fr]
        items-center gap-5
        px-5 py-3
        rounded
        bg-game-monolith
        border border-game-border
        text-lg
        shadow-md
        transition-colors
        hover:border-gray-600
      "
    >
      {children}
    </motion.div>
  );
}

export default ResourceGridBox;
