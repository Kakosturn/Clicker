import { useEffect } from "react";
import { useBuildingContext } from "../context/BuildingContext";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";
import Population from "./Population";
import { useFeatureContext } from "../context/FeaturesContext";

function Buildings() {
  const { state: stateBuilding } = useBuildingContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: statePop } = usePopulationContext();
  const { state: stateFeatures, dispatch: dispatchFeatures } =
    useFeatureContext();
  // console.log(stateBuilding.buildings);
  console.log(stateFeatures.expeditionUnlocked);
  useEffect(() => {
    if (
      stateBuilding.buildings.find((el) => el.id === "cabin").builtAmount >=
        4 &&
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
  // return (
  //   <div className="p-6 grid w-full grid-cols-4 grid-rows-[repeat(auto-fill, 2rem)] items-center justify-center border-2 border-[#222]">
  //     <div className="flex gap-12 text-5xl row-start-1 col-span-full self-start place-self-center items-center">
  //       <p className="">Buildings</p>
  //       <p className="text-3xl">
  //         {stateMain.statusArr.slice(1).includes(stateMain.status) ? (
  //           <Population />
  //         ) : (
  //           `Population : ${statePop.venatrix}`
  //         )}
  //       </p>
  //     </div>

  //     <p className="col-start-3 col-end-4 self-center place-self-center">
  //       Amount
  //     </p>
  //     <p className="self-center place-self-center">Cost</p>

  //     <>
  //       {stateBuilding.buildings
  //         .filter((building) => building.unlocked(stateBuilding))
  //         .map((building, i) => {
  //           // console.log(building);
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
  //     </>
  //   </div>
  // );
  return (
    <div className="p-6 grid w-full grid-cols-4 items-center border border-zinc-700 rounded-md bg-zinc-900 shadow-[0_0_25px_rgba(0,0,0,0.8)] gap-y-6">
      {/* HEADER ROW */}
      <div className="col-span-full flex justify-between items-center px-4">
        <p className="text-4xl text-zinc-100 italic">Buildings</p>

        <p className="text-xl text-zinc-300">
          {stateMain.statusArr.slice(1).includes(stateMain.status) ? (
            <Population />
          ) : (
            `Population : ${statePop.venatrix}`
          )}
        </p>
      </div>

      {/* COLUMN TITLES */}
      <p className="col-start-3 text-center text-zinc-300">Amount</p>
      <p className="col-start-4 text-center text-zinc-300">Cost</p>

      {stateBuilding.buildings
        .filter((building) => building.unlocked(stateBuilding))
        .map((building, i) => {
          const Component = building.component;
          return (
            <Component
              key={i}
              builtAmount={building.builtAmount}
              cost={building.cost}
              secsToBuild={building.secsToBuild}
            />
          );
        })}
    </div>
  );
}

export default Buildings;
