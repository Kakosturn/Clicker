import { useState } from "react";
import { useMainContext } from "../context/MainContext";
import { useFeatureContext } from "../context/FeaturesContext";
import { Cost } from "../context/BuildingContext";
function Furnace() {
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: stateFeatures, dispatch: dispatchFeatures } =
    useFeatureContext();
  const currentIronOre = stateMain.resources.ironOre.amount;
  const ironOreInFurnace = stateFeatures.furnaceInput.ironOre;
  console.log(stateFeatures);
  return (
    <div className="bg-orange-950 flex gap-12">
      <div className="flex justify-center items-center gap-8">
        <p>Iron Ore : {stateMain.resources.ironOre.amount}</p>
        <div className="flex text-xl gap-6">
          <button
            onClick={() => {
              if (currentIronOre === 0) return;
              dispatchFeatures({
                type: "addToFurnace",
                payload: { resource: "ironOre", amount: 1 },
              });
              dispatchMain({
                type: "loseResource",
                payload: { cost: new Cost(0, 0, 0, 1) },
              });
            }}
          >
            Add
          </button>
          <button>Add All</button>
          Add{" "}
          <input
            type="number"
            max={currentIronOre}
            className="bg-orange-800 w-12 rounded-md"
          />
        </div>
      </div>

      <div>
        <img src="furnace.png" alt="" />
        <p>Input: {ironOreInFurnace}</p>
      </div>
    </div>
  );
}

export default Furnace;
