import { useEffect } from "react";
import { Cost, useBuildingContext } from "../context/BuildingContext";
import { useUpgradeContext } from "../context/UpgradeContext";
import Upgrade from "./Upgrade";
import { isUpgradeBuilt } from "../utils/helperUpgrade";
import Icon from "./Icon";

function Upgrades() {
  const { state: stateUpgrade, dispatch: dispatchUpgrade } =
    useUpgradeContext();
  const { state: stateBuilding, dispatch: dispatchBuilding } =
    useBuildingContext();

  // useEffect(() => {
  //   if (stateBuilding.shack === 10) {
  //     console.log("asd");
  //   }
  // }, [stateBuilding.shack]);

  return (
    <div className="bg-[#222] w-full h-36 flex justify-evenly">
      <div className="w-1/2">
        {stateUpgrade.lumberMill && <Icon path={"lumberMill.png"} />}
        {stateUpgrade.quarry && <Icon path={"quarry.png"} />}
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
            tooltip={"Increases wood gathering efficiency by ANAN"}
            costIdentifier={stateUpgrade.lumberMillCost}
            costIcon={{ wood: "wood.png" }}
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
            tooltip={"Increases stone gathering efficiency by ANANNN"}
          />
        )}
      </div>
    </div>
  );
}

export default Upgrades;
