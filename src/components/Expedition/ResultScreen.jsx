import { useExpeditionContext } from "../../context/ExpeditionContext";
import { motion } from "motion/react";
function ResultScreen() {
  const { dispatch: dispatchExpedition } = useExpeditionContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-50 bg-zinc-900 border border-orange-700"
    >
      <div>what you have looted : ....</div>
      <button
        className="py-1 px-2 bg-orange-900 rounded-md "
        onClick={() => dispatchExpedition({ type: "closeResults" })}
      >
        Close
      </button>
    </motion.div>
  );
}

export default ResultScreen;
