import { useState } from "react";
import { useMainContext } from "../context/MainContext.jsx";
import { Cost, useBuildingContext } from "../context/BuildingContext.jsx";

import { usePopulationContext } from "../context/PopulationContext.jsx";
import toast from "react-hot-toast";
import Notification from "./Notification";
import { errorToast } from "./Toast";
const ProgressBarBuilding = ({
  popIncrease,
  type,
  cost,

  secsToBuild,
}) => {
  const secondsToBuild = secsToBuild;
  const [isRunning, setIsRunning] = useState(false);
  const { state: stateBuilding, dispatch: dispatchBuilding } =
    useBuildingContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { dispatch: popDispatch } = usePopulationContext();
  const currentMaterial = new Cost(
    stateMain.resources.wood.amount,
    stateMain.resources.stone.amount,
    stateMain.resources.meat.amount,
    stateMain.resources.ironOre.amount,
    stateMain.resources.ironBar.amount,
  );
  // console.log(isRunning);

  return (
    <div className="relative w-48 h-10 rounded-xl border-2 border-gray-200 overflow-hidden bg-[#303030] hover:bg-[#4d4d4d]">
      <div
        className={`
      absolute left-0 top-0 h-full
      bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-400
      shadow-[0_0_12px_rgba(255,180,80,0.7)]
      transition-[width] ease-linear
    `}
        style={{
          width: isRunning ? "100%" : "0%",
          transition: isRunning ? `width ${secondsToBuild}s linear` : "none",
        }}
      />
      {isRunning && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="building-shine" />
        </div>
      )}
      <button
        className={`
          relative z-10 w-full h-full font-semibold
          ${isRunning ? "text-yellow-100" : "text-gray-200"}
        `}
        disabled={isRunning}
        onClick={() => {
          if (cost.lte(currentMaterial)) {
            dispatchMain({
              type: "loseResource",
              payload: { cost },
            });
            setIsRunning(true);
            setTimeout(() => {
              dispatchBuilding({ type: "build", payload: type });
              popDispatch({ type: "venatrixIncrease", payload: popIncrease });
              setIsRunning(false);
            }, secondsToBuild * 1000);
          } else {
            errorToast("Not enough material");
          }
        }}
      >
        {isRunning ? "Building.." : "Build"}
      </button>
    </div>
  );
};

export default ProgressBarBuilding;
