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
  const secondsToAcquire = secsToObtain;
  const [timeLeft, setTimeLeft] = useState(secondsToAcquire);
  const [isRunning, setIsRunning] = useState(false);

  const { state: stateUpgrade, dispatch: dispatchUpgrade } =
    useUpgradeContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const currentMaterial = new Cost(stateMain.wood, stateMain.stone);
  //console.log(currentMaterial);
  //console.log(type);

  //EFFECT
  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (timeLeft <= 0) {
      toast.success("Success");
      setIsRunning(false);

      setTimeout(() => {
        setTimeLeft(secondsToAcquire);

        dispatchUpgrade({ type: type });
        dispatchMain(upgradeCost(type, stateUpgrade));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [
    dispatchUpgrade,
    isRunning,
    secondsToAcquire,
    timeLeft,
    type,
    dispatchMain,
    stateUpgrade,
  ]);

  const progress = (1 - timeLeft / secondsToAcquire) * 100;
  return (
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
            if (currentMaterial.gte(cost)) {
              setIsRunning(true);
            } else
              toast.custom(
                <Notification type={"error"} message={"Not enough material"} />
              );
          }}
        >
          {progressButtonUpgrade(progress)}
        </button>
      </div>
    </div>
  );
}

export default ProgressBarUpgrades;
