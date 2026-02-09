import { useState } from "react";
import { Cost, useMainContext } from "../context/MainContext";
import { errorToast } from "../components/Toast";
import { useArmoryContext } from "../context/ArmoryContext";
function ProgressBarArmory({ secsToObtain, cost, type }) {
  const { state: stateArmory, dispatch: dispatchArmory } = useArmoryContext();
  const { state: stateMain } = useMainContext();
  const [isRunning, setIsRunning] = useState(false);
  const currentMaterial = new Cost(
    stateMain.resources.wood.amount,
    stateMain.resources.stone.amount,
    stateMain.resources.meat.amount,
    stateMain.resources.ironOre.amount,
    stateMain.resources.ironBar.amount,
  );
  // console.log(type);
  // console.log(stateArmory);
  return (
    <div className="relative w-36 h-10 rounded-xl border-2 border-zinc-700 overflow-hidden bg-[#303030] hover:bg-[#4d4d4d]">
      {/* FILL BAR — same logic as buildings */}
      <div
        className={`
          absolute left-0 top-0 h-full
          bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-400
          shadow-[0_0_12px_rgba(255,180,80,0.7)]
          transition-[width] ease-linear
        `}
        style={{
          width: isRunning ? "100%" : "0%",
          transition: isRunning ? `width ${secsToObtain}s linear` : "none",
        }}
      />

      {/* Shine effect while running */}
      {isRunning && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="building-shine" />
        </div>
      )}

      {/* BUTTON */}
      <button
        className={`
          relative z-10 w-full h-full font-semibold
          ${isRunning ? "text-yellow-100" : "text-gray-200"}
        `}
        disabled={isRunning}
        onClick={() => {
          if (!currentMaterial.gte(cost)) {
            errorToast("Not enough material");
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
            // dispatchUpgrade({ type });
            // dispatchMain(upgradeCost(type, stateUpgrade));
            setIsRunning(false);
          }, secsToObtain * 1000);
        }}
      >
        {isRunning ? "Crafting..." : "Craft"}
      </button>
    </div>
  );
}

export default ProgressBarArmory;
