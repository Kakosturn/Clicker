import { useEffect, useState } from "react";

import { useUpgradeStore } from "../stores/useUpgradeStore";
import { upgradeList } from "../variables";
import Icon from "./Icon";
import Upgrade from "./Upgrade";

function Upgrades() {
  // console.log("upgrades rendered");

  const upgradesCompleted = useUpgradeStore((state) => state.upgradesCompleted);
  const upgradesUnlocked = useUpgradeStore((state) => state.upgradesUnlocked);
  const upgradesVisible = useUpgradeStore((state) => state.upgradesVisible);
  const upgradeEvaluation = useUpgradeStore((state) => state.upgradeEvaluation);
  // 2. The Polling Interval
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("useEffect");
      upgradeEvaluation();
    }, 1000); // Checks once every second (1000ms)

    // Cleanup the interval when the component closes
    return () => clearInterval(interval);
  }, [upgradeEvaluation]); // Re-start the interval if the player buys an upgrade

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
              tooltip={upgrade.tooltip}
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
            tooltip={upgrade.tooltip}
            name={upgrade.name}
          />
        ))}

        {upgradesVisible.map((upgrade) => (
          <div key={upgrade.id} className="opacity-50 grayscale p-2">
            <Icon
              type="upgrade"
              tooltip={`Locked: ${upgrade.name}`}
              path={upgrade.path}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrades;
