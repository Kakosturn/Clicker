import { useState, useEffect } from "react";
import "./../index.css";
import { progressButtonUpgrade } from "../utils/helper";
import { useUpgradeContext } from "../context/UpgradeContext";
import { useMainContext } from "../context/MainContext";
import { upgradeCost } from "../utils/helperUpgrade";
import toast from "react-hot-toast";
import { Cost } from "../context/BuildingContext";
import Notification from "./Notification";
function ProgressBarUpgrades({ type, secsToObtain, cost }) {
  ///STATE

  const [isRunning, setIsRunning] = useState(false);

  const { state: stateUpgrade, dispatch: dispatchUpgrade } =
    useUpgradeContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const currentMaterial = new Cost(
    stateMain.resources.wood.amount,
    stateMain.resources.stone.amount,
    stateMain.resources.meat.amount,
    stateMain.resources.ironOre.amount,
    stateMain.resources.ironBar.amount,
  );
  //console.log(currentMaterial);
  //console.log(type);

  return (
    <div className="relative w-48 h-10 rounded-xl border-2 border-zinc-700 overflow-hidden bg-[#303030] hover:bg-[#4d4d4d]">
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
            toast.custom(
              <Notification type="error" message="Not enough material" />,
            );
            return;
          }

          setIsRunning(true);

          setTimeout(() => {
            dispatchUpgrade({ type });
            dispatchMain(upgradeCost(type, stateUpgrade));
            setIsRunning(false);
          }, secsToObtain * 1000);
        }}
      >
        {isRunning ? "Upgrading..." : "Upgrade"}
      </button>
    </div>
  );
}

export default ProgressBarUpgrades;
