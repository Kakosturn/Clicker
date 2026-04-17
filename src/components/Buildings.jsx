import { useEffect } from "react";
import { useBuildingContext } from "../context/BuildingContext";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";
import Population from "./Population";
import { useFeatureContext } from "../context/FeaturesContext";
import { AnimatePresence, motion } from "motion/react";

function Buildings() {
  const { state: stateBuilding } = useBuildingContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: statePop } = usePopulationContext();
  const { state: stateFeatures, dispatch: dispatchFeatures } =
    useFeatureContext();
  // console.log(stateBuilding.buildings);
  // console.log(stateFeatures.expeditionUnlocked);
  useEffect(() => {
    if (
      stateBuilding.buildings.find((el) => el.id === "shack").builtAmount >=
        2 &&
      !stateMain.firstBungalow
    ) {
      dispatchMain({ type: "firstBungalow/1" });
    }
    if (
      stateBuilding.buildings.find((el) => el.id === "bungalow").builtAmount >=
        5 &&
      !stateMain.firstHouse
    ) {
      dispatchMain({ type: "firstHouse" });
      dispatchFeatures({ type: "furnaceUnlocked" });
    }
    if (
      stateBuilding.buildings.find((el) => el.id === "arsenal").builtAmount >=
        1 &&
      !stateMain.firstArsenal
    ) {
      dispatchMain({ type: "firstArsenal" });
      dispatchFeatures({ type: "armoryUnlocked" });
    }
    if (
      stateBuilding.buildings.find((el) => el.id === "arsenal").builtAmount >=
        10 &&
      !stateFeatures.expeditionUnlocked
    ) {
      dispatchFeatures({ type: "expeditionUnlocked" });
    }
  }, [
    stateBuilding.buildings,
    dispatchMain,
    dispatchFeatures,
    stateMain.firstBungalow,
    stateMain.firstHouse,
    stateMain.firstArsenal,
    stateFeatures.expeditionUnlocked,
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
          {stateBuilding.buildings
            .filter((building) => building.unlocked(stateBuilding))
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

// import { useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { useBuildingContext } from "../context/BuildingContext";
// import { useMainContext } from "../context/MainContext";
// import { usePopulationContext } from "../context/PopulationContext";
// import Population from "./Population";
// import { useFeatureContext } from "../context/FeaturesContext";

// function Buildings() {
//   const { state: stateBuilding } = useBuildingContext();
//   const { state: stateMain, dispatch: dispatchMain } = useMainContext();
//   const { state: statePop } = usePopulationContext();
//   const { state: stateFeatures, dispatch: dispatchFeatures } = useFeatureContext();

//   // --- GAME LOGIC (Untouched) ---
//   useEffect(() => {
//     if (
//       stateBuilding.buildings.find((el) => el.id === "cabin").builtAmount >= 4 &&
//       !stateMain.firstBungalow
//     ) {
//       dispatchMain({ type: "firstBungalow/1" });
//     }
//     if (
//       stateBuilding.buildings.find((el) => el.id === "bungalow").builtAmount >= 5 &&
//       !stateMain.firstHouse
//     ) {
//       dispatchMain({ type: "firstHouse" });
//       dispatchFeatures({ type: "furnaceUnlocked" });
//     }
//     if (
//       stateBuilding.buildings.find((el) => el.id === "arsenal").builtAmount >= 1 &&
//       !stateMain.firstArsenal
//     ) {
//       dispatchMain({ type: "firstArsenal" });
//       dispatchFeatures({ type: "armoryUnlocked" });
//     }
//     if (
//       stateBuilding.buildings.find((el) => el.id === "arsenal").builtAmount >= 10 &&
//       !stateFeatures.expeditionUnlocked
//     ) {
//       dispatchFeatures({ type: "expeditionUnlocked" });
//     }
//   }, [
//     stateBuilding.buildings,
//     dispatchMain,
//     dispatchFeatures,
//     stateMain.firstBungalow,
//     stateMain.firstHouse,
//     stateMain.firstArsenal,
//     stateFeatures.expeditionUnlocked,
//   ]);

// return (
//   <div className="p-8 bg-game-panel border border-game-border rounded-xs shadow-2xl flex flex-col gap-6 w-full">

//     {/* HEADER ROW */}
//     <div className="flex justify-between items-end border-b border-game-border pb-4">
//       <h2 className="text-3xl font-bold text-game-ichor uppercase tracking-widest">
//         Buildings
//       </h2>

//       <div className="text-lg font-bold text-gray-400 uppercase tracking-widest flex items-center">
//         {stateMain.statusArr.slice(1).includes(stateMain.status) ? (
//           <Population />
//         ) : (
//           <span className="bg-game-monolith px-4 py-1 rounded-xs border border-game-border shadow-inner text-game-ichor">
//             POPULATION: {statePop.venatrix}
//           </span>
//         )}
//       </div>
//     </div>

//     {/* COLUMN TITLES */}
//     <div className="grid grid-cols-4 px-5 text-gray-500 uppercase tracking-widest text-sm font-bold">
//       <p className="col-start-1 col-span-2">Structure</p>
//       <p className="col-start-3 text-center">Amount</p>
//       <p className="col-start-4 text-center">Cost</p>
//     </div>

//     {/* BUILDINGS LIST */}
//     <div className="flex flex-col gap-3">
//       <AnimatePresence>
//         {stateBuilding.buildings
//           .filter((building) => building.unlocked(stateBuilding))
//           .map((building, i) => {
//             const Component = building.component;
//             return (
//               <motion.div
//                 key={building.id} // use building.id for stable animation keys
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ type: "spring", stiffness: 100, damping: 15 }}
//               >
//                 <Component
//                   builtAmount={building.builtAmount}
//                   cost={building.cost}
//                   secsToBuild={building.secsToBuild}
//                 />
//               </motion.div>
//             );
//           })}
//       </AnimatePresence>
//     </div>
//   </div>
// );
// }

// export default Buildings;

//// OLD RETURN

// return (
//     <div className="p-8 grid w-full text-xl grid-cols-4 items-center border border-game-border rounded-xs bg-game-panel shadow-[0_0_25px_rgba(0,0,0,0.8)] gap-y-6">
//       {/* HEADER ROW */}
//       <div className="col-span-full flex justify-between items-center px-4">
//         <p className="text-4xl text-zinc-100 italic">Buildings</p>

//         <p className="text-xl text-zinc-300">
//           {stateMain.statusArr.slice(1).includes(stateMain.status) ? (
//             <Population />
//           ) : (
//             `Population : ${statePop.venatrix}`
//           )}
//         </p>
//       </div>

//       {/* COLUMN TITLES */}
//       <p className="col-start-3 text-center text-zinc-300">Amount</p>
//       <p className="col-start-4 text-center text-zinc-300">Cost</p>

//       {stateBuilding.buildings
//         .filter((building) => building.unlocked(stateBuilding))
//         .map((building, i) => {
//           const Component = building.component;
//           return (
//             <Component
//               key={i}
//               builtAmount={building.builtAmount}
//               cost={building.cost}
//               secsToBuild={building.secsToBuild}
//             />
//           );
//         })}
//     </div>
//   );
