import { useEffect } from "react";
import { Cost, useBuildingContext } from "../context/BuildingContext";
import { useUpgradeContext } from "../context/UpgradeContext";
import { isUpgradeBuilt } from "../utils/helperUpgrade";
import { useMainContext } from "../context/MainContext";
import {
  requiredMeatForGathering1Upgrade as requiredMeatForGathering1,
  requiredWoodForGathering1Upgrade as requiredWoodForGathering1,
  requiredStoneForGathering1Upgrade as requiredStoneForGathering1,
} from "../variables";
import Upgrade from "./Upgrade";
import Icon from "./Icon";

function Upgrades() {
  const { state: stateUpgrade, dispatch: dispatchUpgrade } =
    useUpgradeContext();
  const { state: stateBuilding, dispatch: dispatchBuilding } =
    useBuildingContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  // useEffect(() => {
  //   if (stateBuilding.shack === 10) {
  //     console.log("asd");
  //   }
  // }, [stateBuilding.shack]);

  return (
    <div className="bg-[#222] w-full h-36 flex justify-evenly">
      <div className="w-1/2">
        {stateUpgrade.upgradesCompleted.map((el, i) => (
          <Icon key={i} path={`${el}.png`} />
        ))}
      </div>
      <div className="w-1/2 grid grid-cols-2 gap-y-4 overflow-y-auto">
        {isUpgradeBuilt(
          stateBuilding.shack > 10,
          stateUpgrade.lumberMill === false
        ) && (
          <Upgrade
            secsToObtain={10}
            type={"upgradeLumberMill"}
            path={"lumberMill.png"}
            name={"Lumber Mill"}
            cost={new Cost(stateUpgrade.lumberMillCost)}
            tooltip={"Increases wood gathering efficiency for venatrix by ANAN"}
          />
        )}
        {isUpgradeBuilt(
          stateBuilding.bungalow > 10,
          stateUpgrade.quarry === false
        ) && (
          <Upgrade
            secsToObtain={10}
            type={"upgradeQuarry"}
            path={"quarry.png"}
            name={"Quarry"}
            cost={new Cost(0, stateUpgrade.quarryCost)}
            tooltip={
              "Increases stone gathering efficiency for venatrix by ANANNN"
            }
          />
        )}
        {isUpgradeBuilt(
          stateMain.totalWoodCollected > requiredWoodForGathering1 &&
            stateMain.totalMeatCollected > requiredMeatForGathering1 &&
            stateMain.totalStoneCollected > requiredStoneForGathering1,
          stateUpgrade.gathering1 === false
        ) && (
          <Upgrade
            secsToObtain={10}
            type={"upgradeGathering/1"}
            path={"muscle.png"}
            name={"Gathering - 1"}
            cost={new Cost(10, 20)}
            tooltip={"Increases gathering multiplier for basic materials"}
          />
        )}
      </div>
    </div>
  );
}

export default Upgrades;
