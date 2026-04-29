import { useState } from "react";
import { Cost } from "../utils/costClass";

import { motion } from "motion/react";
import { errorToast } from "./Toast";
import { useMainStore } from "../stores/useMainStore.js";
import { useBuildingStore } from "../stores/useBuildingStore.js";
import { usePopulationStore } from "../stores/usePopulationStore.js";
const ProgressBarBuilding = ({ popIncrease, type, cost, secsToBuild }) => {
  const [isRunning, setIsRunning] = useState(false);
  // console.log(cost);
  const build = useBuildingStore((state) => state.build);
  const venatrixIncrease = usePopulationStore(
    (state) => state.venatrixIncrease,
  );
  const resources = useMainStore((state) => state.resources);
  const loseResource = useMainStore((state) => state.loseResource);
  const currentMaterial = new Cost(
    resources.wood.amount,
    resources.stone.amount,
    resources.meat.amount,
    resources.ironOre.amount,
    resources.ironBar.amount,
  );

  // console.log(isRunning);

  return (
    <div className="relative w-full h-10 rounded-xs border border-game-border overflow-hidden bg-game-panel group cursor-pointer">
      {/* The Animated Fill Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: isRunning ? "100%" : "0%" }}
        transition={{ duration: isRunning ? secsToBuild : 0, ease: "linear" }}
        className="absolute left-0 top-0 h-full bg-game-ichor shadow-[0_0_15px_rgba(185,255,36,0.6)]"
      />

      <button
        className={`
          relative w-full h-full font-semibold text-xl transition-colors
          ${isRunning ? "text-game-monolith mix-blend-difference" : "text-gray-400 group-hover:text-white"}
        `}
        disabled={isRunning}
        onClick={() => {
          if (cost.lte(currentMaterial)) {
            loseResource({ cost });
            setIsRunning(true);
            setTimeout(() => {
              build(type);
              venatrixIncrease(popIncrease);
              setIsRunning(false);
            }, secsToBuild * 1000);
          } else {
            errorToast("Insufficient Materials");
          }
        }}
      >
        {isRunning ? "Building.." : "Build"}
      </button>
    </div>
  );
};

export default ProgressBarBuilding;
