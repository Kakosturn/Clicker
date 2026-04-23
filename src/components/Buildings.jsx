import { useEffect } from "react";

import Population from "./Population";
import { AnimatePresence, motion } from "motion/react";
import { useMainStore } from "../stores/useMainStore";
import { useShallow } from "zustand/shallow";
import { useBuildingStore } from "../stores/useBuildingStore";
import { useFeaturesStore } from "../stores/useFeaturesStore";

function Buildings() {
  const buildings = useBuildingStore((state) => state.buildings);
  const statusOfProgression = useMainStore(
    (state) => state.statusOfProgression,
  );
  const { firstArsenalStatus, firstBungalowStatus, firstHouseStatus } =
    useMainStore(
      useShallow((state) => ({
        firstHouseStatus: state.firstHouseStatus,
        firstBungalowStatus: state.firstBungalowStatus,
        firstArsenalStatus: state.firstArsenalStatus,
      })),
    );
  const furnaceUnlockedStatus = useFeaturesStore(
    (state) => state.furnaceUnlockedStatus,
  );
  const armoryUnlockedStatus = useFeaturesStore(
    (state) => state.armoryUnlockedStatus,
  );
  const expeditionUnlockedStatus = useFeaturesStore(
    (state) => state.expeditionUnlockedStatus,
  );
  const expeditionUnlocked = useFeaturesStore(
    (state) => state.expeditionUnlocked,
  );

  // console.log(buildings);
  // console.log(stateFeatures.expeditionUnlocked);
  console.log("buildings comp rendered");
  useEffect(() => {
    if (
      buildings.find((el) => el.id === "shack").builtAmount >= 2 &&
      !statusOfProgression.firstBungalow
    ) {
      firstBungalowStatus();
    }
    if (
      buildings.find((el) => el.id === "bungalow").builtAmount >= 5 &&
      !statusOfProgression.firstHouse
    ) {
      firstHouseStatus();
      furnaceUnlockedStatus();
    }
    if (
      buildings.find((el) => el.id === "arsenal").builtAmount >= 1 &&
      !statusOfProgression.firstArsenal
    ) {
      firstArsenalStatus();
      armoryUnlockedStatus();
    }
    if (
      buildings.find((el) => el.id === "arsenal").builtAmount >= 10 &&
      !expeditionUnlocked
    ) {
      expeditionUnlockedStatus();
    }
  }, [
    armoryUnlockedStatus,
    expeditionUnlockedStatus,
    furnaceUnlockedStatus,
    firstArsenalStatus,
    statusOfProgression.firstArsenal,
    statusOfProgression.firstHouse,
    statusOfProgression.firstBungalow,
    firstBungalowStatus,
    firstHouseStatus,
    buildings,
    expeditionUnlocked,
  ]);

  return (
    <div className="p-8 bg-game-panel border border-game-border rounded-xs shadow-2xl flex flex-col gap-6 w-full">
      {/* HEADER ROW */}
      <div className="flex justify-between items-end border-b border-game-border pb-4">
        <h2 className="text-3xl font-bold text-game-ichor tracking-wider">
          Buildings
        </h2>

        <Population />
      </div>

      {/* COLUMN TITLES */}
      <div className="grid grid-cols-4 px-5 text-gray-500 uppercase tracking-widest text-sm font-bold">
        <p className="col-start-1 col-span-2">Structure</p>
        <p className="col-start-3 text-center">Amount</p>
        <p className="col-start-4 text-center">Cost</p>
      </div>

      {/* BUILDINGS LIST */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {buildings
            .filter((building) => building.unlocked(buildings))
            .map((building) => {
              const Component = building.component;
              return (
                <motion.div
                  key={building.id} // use building.id for stable animation keys
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <Component
                    builtAmount={building.builtAmount}
                    cost={building.cost}
                    secsToBuild={building.secsToBuild}
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Buildings;
