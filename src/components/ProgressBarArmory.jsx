import { useState } from "react";
import { motion } from "motion/react";
import { errorToast } from "../components/Toast";
import { Cost } from "../utils/costClass";
import { useMainStore } from "../stores/useMainStore";
import { useArmoryStore } from "../stores/useArmoryStore";
function ProgressBarArmory({ secsToObtain, cost, type }) {
  const resources = useMainStore((state) => state.resources);
  const loseResource = useMainStore((state) => state.loseResource);
  const invCapacity = useArmoryStore((state) => state.inventory.capacity);
  const amountItemInInventory = useArmoryStore(
    (state) => state.amountItemInInventory,
  );
  const craft = useArmoryStore((state) => state.craft);
  const [isRunning, setIsRunning] = useState(false);

  const currentMaterial = new Cost(
    resources.wood.amount,
    resources.stone.amount,
    resources.meat.amount,
    resources.ironOre.amount,
    resources.ironBar.amount,
  );

  return (
    <div className="relative w-32 h-10 rounded-sm border border-game-border overflow-hidden bg-game-panel hover:border-game-ichor/50 transition-colors group cursor-pointer">
      {/* FILL BAR — High-tech Phosphor Green (Ichor) */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: isRunning ? "100%" : "0%" }}
        transition={{ duration: isRunning ? secsToObtain : 0, ease: "linear" }}
        className="absolute left-0 top-0 h-full bg-game-ichor shadow-[0_0_15px_rgba(185,255,36,0.5)] pointer-events-none"
      />

      {/* Shine effect while running */}
      {isRunning && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] h-full animate-[slide_1.5s_infinite]" />
        </div>
      )}

      {/* BUTTON — Uses our custom colors instead of Tailwind default grays/yellows */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`
          relative z-10 w-full h-full flex items-center justify-center font-bold tracking-widest uppercase text-[10px]
          ${isRunning ? "text-game-monolith mix-blend-difference" : "text-gray-400 group-hover:text-white"}
        `}
        disabled={isRunning}
        onClick={() => {
          if (!currentMaterial.gte(cost)) {
            errorToast("Insufficient material");
            return;
          }
          if (amountItemInInventory >= invCapacity) {
            errorToast("Inventory Full");
            return;
          }

          setIsRunning(true);

          setTimeout(() => {
            craft(type);
            loseResource({ cost: cost });

            setIsRunning(false);
          }, secsToObtain * 1000);
        }}
      >
        {isRunning ? "Crafting..." : "Craft"}
      </motion.button>
    </div>
  );
}

export default ProgressBarArmory;
