import { useEffect } from "react";
import { useUpgradeStore } from "../stores/useUpgradeStore";
import Icon from "./Icon";
import Upgrade from "./Upgrade";
import { upgradeList } from "../utils/upgradeList";

function Upgrades() {
  // console.log("upgrades rendered");

  const upgradesCompleted = useUpgradeStore((state) => state.upgradesCompleted);
  const upgradesUnlocked = useUpgradeStore((state) => state.upgradesUnlocked);
  const upgradesVisible = useUpgradeStore((state) => state.upgradesVisible);
  const upgradeEvaluation = useUpgradeStore((state) => state.upgradeEvaluation);
  // 2. The Polling Interval

  // 3. Render your UI normally!
  return (
    <div className="bg-upgrades w-full h-48 flex justify-between">
      {/* Completed */}
      <div className="w-1/2">
        {upgradesCompleted.map((id) => {
          const upgrade = upgradeList.find((el) => el.id === id);
          return (
            <Icon
              key={id}
              type="upgrade"
              tooltip={upgrade.unlockedTooltip}
              path={upgrade.path}
            />
          );
        })}
      </div>

      {/* Available & Visible */}
      <div className="w-1/2 overflow-y-auto">
        {upgradesUnlocked.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            secsToObtain={upgrade.secsToAcquire}
            type={upgrade.type}
            path={upgrade.path}
            cost={upgrade.cost}
            tooltip={upgrade.unlockedTooltip}
            name={upgrade.name}
          />
        ))}

        {upgradesVisible.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            secsToObtain={upgrade.secsToAcquire}
            type={upgrade.type}
            path={upgrade.path}
            cost={upgrade.cost}
            tooltip={upgrade.visibleTooltip}
            name={upgrade.name}
            unlocked={false}
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrades;
