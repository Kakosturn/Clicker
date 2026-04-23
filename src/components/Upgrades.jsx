import { useUpgradeContext } from "../context/UpgradeContext";

import { Cost } from "../utils/costClass";

import Upgrade from "./Upgrade";
import { useMainStore } from "../stores/useMainStore";
import { useBuildingStore } from "../stores/useBuildingStore";
import { useArmoryStore } from "../stores/useArmoryStore";
import { useExpeditionStore } from "../stores/useExpeditionStore";
import { usePopulationStore } from "../stores/usePopulationStore";

function Upgrades() {
  const { state: stateUpgrade } = useUpgradeContext();
  // 1. Gather all the live state from your game
  const stateMain = useMainStore((state) => state);
  const buildings = useBuildingStore((state) => state.buildings);
  const armory = useArmoryStore((state) => state);
  const expedition = useExpeditionStore((state) => state);
  const statePop = usePopulationStore((state) => state);
  // 2. Package it into the "God Object"
  const gameState = {
    stateMain,
    buildings,
    statePop,
    armory,
    expedition,
  };
  // useEffect(() => {
  //   if (stateBuilding.shack === 10) {
  //     console.log("asd");
  //   }
  // }, [stateBuilding.shack]);
  // const upgradesArray = stateUpgrade.upgradesCompleted.upgrades;
  return (
    <div className="bg-upgrades w-full h-48 flex justify-between">
      {/* Completed Upgrades */}
      <div className="w-1/2">
        {/* {stateUpgrade.upgradesCompleted.upgrades.map((el, i) => {
          // console.log(stateUpgrade.upgradesCompleted[el].tooltip);
          return (
            <Icon
              type="upgrade"
              key={i}
              tooltip={stateUpgrade.upgradesCompleted[el].tooltip}
              path={`${el}.png`}
            />
          );
        })} */}
      </div>
      {/* Available Upgrades */}
      <div className="w-1/2 overflow-y-auto">
        {stateUpgrade.upgradeList.map((upgrade, i) => {
          if (upgrade.unlocked(gameState)) {
            return (
              <Upgrade
                key={i}
                secsToObtain={upgrade.secsToAcquire}
                type={upgrade.type}
                path={upgrade.path}
                cost={upgrade.cost}
                tooltip={upgrade.tooltip}
                name={upgrade.name}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Upgrades;

//  {isUpgradeBuilt(
//           stateBuilding.buildings.find((el) => el.id === "shack").builtAmount >
//             10,
//           stateUpgrade.upgradesCompleted.lumberMill.completed === false,
//         ) && (
//           <Upgrade
//             secsToObtain={secsForLumberMillUpgrade}
//             type={"upgradeLumberMill"}
//             path={"lumberMill.png"}
//             name={"Lumber Mill"}
//             cost={new Cost(stateUpgrade.cost.lumberMill.wood)}
//             tooltip={"Increases wood gathering efficiency for venatrix by ANAN"}
//           />
//         )}
//         {isUpgradeBuilt(
//           stateBuilding.bungalow > 10,
//           stateUpgrade.quarry === false,
//         ) && (
//           <Upgrade
//             secsToObtain={10}
//             type={"upgradeQuarry"}
//             path={"quarry.png"}
//             name={"Quarry"}
//             cost={new Cost(0, stateUpgrade.quarryCost)}
//             tooltip={
//               "Increases stone gathering efficiency for venatrix by ANANNN"
//             }
//           />
//         )}
//         {isUpgradeBuilt(
//           stateMain.totalWoodCollected > requiredWoodForGathering1 &&
//             stateMain.totalMeatCollected > requiredMeatForGathering1 &&
//             stateMain.totalStoneCollected > requiredStoneForGathering1,
//           stateUpgrade.gathering1 === false,
//         ) && (
//           <Upgrade
//             secsToObtain={10}
//             type={"upgradeGathering/1"}
//             path={"muscle.png"}
//             name={"Gathering - 1"}
//             cost={new Cost(10, 20)}
//             tooltip={"Increases gathering multiplier for basic materials"}
//           />
//         )}
