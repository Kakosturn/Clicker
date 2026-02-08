import { useEffect } from "react";
import { useBuildingContext } from "../context/BuildingContext";
import { useUpgradeContext } from "../context/UpgradeContext";
import { isUpgradeBuilt } from "../utils/helperUpgrade";
import { Cost, useMainContext } from "../context/MainContext";
import {
  requiredMeatForGathering1Upgrade as requiredMeatForGathering1,
  requiredWoodForGathering1Upgrade as requiredWoodForGathering1,
  requiredStoneForGathering1Upgrade as requiredStoneForGathering1,
  secsForLumberMillUpgrade,
} from "../variables";
import Upgrade from "./Upgrade";
import Icon from "./Icon";

function Upgrades() {
  const { state: stateUpgrade } = useUpgradeContext();
  const { state: stateBuilding, dispatch: dispatchBuilding } =
    useBuildingContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  // useEffect(() => {
  //   if (stateBuilding.shack === 10) {
  //     console.log("asd");
  //   }
  // }, [stateBuilding.shack]);
  const upgradesArray = stateUpgrade.upgradesCompleted.upgrades;
  return (
    <div className="bg-upgrades w-full h-48 flex justify-between">
      {/* Completed Upgrades */}
      <div className="w-1/2">
        {stateUpgrade.upgradesCompleted.upgrades.map((el, i) => {
          console.log(stateUpgrade.upgradesCompleted[el].tooltip);
          return (
            <Icon
              type="upgrade"
              key={i}
              tooltip={stateUpgrade.upgradesCompleted[el].tooltip}
              path={`${el}.png`}
            />
          );
        })}
      </div>
      {/* Available Upgrades */}
      <div className="w-1/2 overflow-y-auto">
        {isUpgradeBuilt(
          stateBuilding.buildings.find((el) => el.id === "shack").builtAmount >
            10,
          stateUpgrade.upgradesCompleted.lumberMill.completed === false,
        ) && (
          <Upgrade
            secsToObtain={secsForLumberMillUpgrade}
            type={"upgradeLumberMill"}
            path={"lumberMill.png"}
            name={"Lumber Mill"}
            cost={new Cost(stateUpgrade.cost.lumberMill.wood)}
            tooltip={"Increases wood gathering efficiency for venatrix by ANAN"}
          />
        )}
        {isUpgradeBuilt(
          stateBuilding.bungalow > 10,
          stateUpgrade.quarry === false,
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
          stateUpgrade.gathering1 === false,
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
