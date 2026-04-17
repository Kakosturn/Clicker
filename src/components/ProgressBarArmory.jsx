// import { useState } from "react";
// import { Cost, useMainContext } from "../context/MainContext";
// import { errorToast } from "../components/Toast";
// import { useArmoryContext } from "../context/ArmoryContext";
// function ProgressBarArmory({ secsToObtain, cost, type }) {
//   const { state: stateArmory, dispatch: dispatchArmory } = useArmoryContext();
//   const { state: stateMain, dispatch: dispatchMain } = useMainContext();
//   const [isRunning, setIsRunning] = useState(false);
//   const currentMaterial = new Cost(
//     stateMain.resources.wood.amount,
//     stateMain.resources.stone.amount,
//     stateMain.resources.meat.amount,
//     stateMain.resources.ironOre.amount,
//     stateMain.resources.ironBar.amount,
//   );
//   // console.log(type);
//   // console.log(stateArmory);
//   return (
//     <div className="relative w-30 h-10 rounded-xl border-2 border-zinc-700 overflow-hidden bg-[#303030] hover:bg-[#4d4d4d]">
//       {/* FILL BAR — same logic as buildings */}
//       <div
//         className={`
//           absolute left-0 top-0 h-full
//           bg-linear-to-r from-amber-600 via-orange-500 to-yellow-400
//           shadow-[0_0_12px_rgba(255,180,80,0.7)]
//           transition-[width] ease-linear
//         `}
//         style={{
//           width: isRunning ? "100%" : "0%",
//           transition: isRunning ? `width ${secsToObtain}s linear` : "none",
//         }}
//       />

//       {/* Shine effect while running */}
//       {isRunning && (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="building-shine" />
//         </div>
//       )}

//       {/* BUTTON */}
//       <button
//         className={`
//            z-10 w-full h-full font-semibold text-2xl absolute top-1/2 left-1/2 -translate-1/2
//           ${isRunning ? "text-yellow-100" : "text-gray-200"}
//         `}
//         disabled={isRunning}
//         onClick={() => {
//           if (!currentMaterial.gte(cost)) {
//             errorToast("Not enough material");
//             return;
//           }
//           if (
//             stateArmory.amountItemInInventory >= stateArmory.inventory.capacity
//           ) {
//             errorToast("Inventory Full");
//             return;
//           }

//           setIsRunning(true);

//           setTimeout(() => {
//             dispatchArmory({ type: "craft", payload: type });
//             dispatchMain({ type: "loseResource", payload: { cost: cost } });

//             setIsRunning(false);
//           }, secsToObtain * 1000);
//         }}
//       >
//         {isRunning ? "Crafting..." : "Craft"}
//       </button>
//     </div>
//   );
// }

// export default ProgressBarArmory;

import { useState } from "react";
import { motion } from "motion/react";
import { useMainContext } from "../context/MainContext";
import { errorToast } from "../components/Toast";
import { useArmoryContext } from "../context/ArmoryContext";
import { Cost } from "../utils/costClass";

function ProgressBarArmory({ secsToObtain, cost, type }) {
  const { state: stateArmory, dispatch: dispatchArmory } = useArmoryContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const [isRunning, setIsRunning] = useState(false);

  const currentMaterial = new Cost(
    stateMain.resources.wood.amount,
    stateMain.resources.stone.amount,
    stateMain.resources.meat.amount,
    stateMain.resources.ironOre.amount,
    stateMain.resources.ironBar.amount,
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
          if (
            stateArmory.amountItemInInventory >= stateArmory.inventory.capacity
          ) {
            errorToast("Inventory Full");
            return;
          }

          setIsRunning(true);

          setTimeout(() => {
            dispatchArmory({ type: "craft", payload: type });
            dispatchMain({ type: "loseResource", payload: { cost: cost } });

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
