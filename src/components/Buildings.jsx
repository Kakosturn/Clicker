import { useEffect } from "react";
import { useBuildingContext } from "../context/BuildingContext";
import Shack from "./Buildings/Shack";
import { useMainContext } from "../context/MainContext";
import Bungalow from "./Buildings/Bungalow";
import { usePopulationContext } from "../context/PopulationContext";
import Cabin from "./Buildings/Cabin";
import Population from "./Population";

function Buildings() {
  const { state: stateBuilding } = useBuildingContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: statePop } = usePopulationContext();
  // console.log(stateBuilding.buildings);

  useEffect(() => {
    if (stateBuilding.shack >= 3) {
      dispatchMain({ type: "firstCabin/1" });
    }
    if (stateBuilding.cabin >= 4) {
      dispatchMain({ type: "firstBungalow/1" });
    }
  }, [dispatchMain, stateBuilding.shack, stateBuilding.cabin]);
  return (
    <div className="p-6 grid w-full grid-cols-4 grid-rows-[repeat(auto-fill, 2rem)] items-center justify-center border-2 border-[#222]">
      <div className="flex gap-12 text-5xl row-start-1 col-span-full self-start place-self-center items-center">
        <p className="">Buildings</p>
        <p className="text-3xl">
          {stateMain.statusArr.slice(1).includes(stateMain.status) ? (
            <Population />
          ) : (
            `Population : ${statePop.venatrix}`
          )}
        </p>
      </div>

      <p className="col-start-3 col-end-4 self-center place-self-center">
        Amount
      </p>
      <p className="self-center place-self-center">Cost</p>

      <>
        {stateBuilding.buildings
          .filter((building) => building.unlocked(stateBuilding))
          .map((building, i) => {
            // console.log(building);
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
      </>
    </div>
  );
}

export default Buildings;
