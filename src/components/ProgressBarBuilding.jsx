import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import { Cost, useBuildingContext } from "../context/BuildingContext";
import {
  buildingCost,
  buildingType,
  progressButtonTransitionBuilding,
} from "../utils/helper";
import { usePopulationContext } from "../context/PopulationContext";
import toast from "react-hot-toast";
import Notification from "./Notification";
import { errorToast } from "./Toast";
const ProgressBarBuilding = ({
  popIncrease,
  type,
  cost,
  material,
  secsToBuild,
}) => {
  const secondsToBuild = secsToBuild;
  const [timeLeft, setTimeLeft] = useState(secondsToBuild);
  const [isRunning, setIsRunning] = useState(false);
  const { state: stateBuilding, dispatch: dispatchBuilding } =
    useBuildingContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { dispatch: popDispatch } = usePopulationContext();
  const currentMaterial = new Cost(
    stateMain.resources.wood.amount,
    stateMain.resources.stone.amount
  );

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (timeLeft <= 0) {
      setIsRunning(false);

      setTimeout(() => {
        setTimeLeft(secondsToBuild);
        dispatchBuilding({ type: "build", payload: type });
        // dispatchBuilding(buildingType(type)); // { type: "buildShack" }
        //console.log(type, stateBuilding);

        popDispatch({ type: `venatrixIncrease${popIncrease}` });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [
    timeLeft,
    isRunning,
    dispatchBuilding,
    dispatchMain,
    stateBuilding,
    type,
    secondsToBuild,
    popDispatch,
    popIncrease,
  ]);

  const progress = (1 - timeLeft / secondsToBuild) * 100;
  // console.log(progress);
  return (
    <div>
      <div className="border-2 border-gray-200 w-48 flex rounded-xl bg-[#303030] hover:bg-[#4d4d4d]">
        <div
          className={`${progress === 100 ? "transitioned" : "default"}`}
          style={{
            width: `${progress}%`,
            height: "100%",
            //backgroundColor: "rgb(229 231 235)",
            transition: "all 0.5s",
            zIndex: 999,
            borderRadius: "12px",
          }}
        >
          <button
            className="text-gray-200 w-48"
            disabled={isRunning}
            onClick={() => {
              //console.log(cost); // {wood : 10, stone : 5}
              //console.log(cost.lte(currentMaterial));

              if (cost.lte(currentMaterial)) {
                // dispatchMain(buildingCost(type, stateBuilding));
                dispatchMain({
                  type: "loseResource",
                  payload: { cost: cost },
                });
                setIsRunning(true);
              } else errorToast("not enough material");
            }}
          >
            {progressButtonTransitionBuilding(progress)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarBuilding;
