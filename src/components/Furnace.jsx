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
  const furnaceLimit = stateFeatures.furnaceLimit;
  console.log(stateFeatures);
  return (
    <div className="bg-orange-950 flex justify-between">
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
          <button
            className="bg-blue-900"
            onClick={() => {
              dispatchFeatures({
                type: "addToFurnace",
                payload: {
                  resource: "ironOre",
                  amount:
                    currentIronOre > furnaceLimit
                      ? furnaceLimit
                      : currentIronOre,
                },
              });
              dispatchMain({
                type: "loseResource",
                payload: {
                  cost: new Cost(
                    0,
                    0,
                    0,
                    currentIronOre > furnaceLimit
                      ? furnaceLimit
                      : currentIronOre,
                  ),
                },
              });
            }}
          >
            Add All
          </button>
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
        <button
          className="bg-red-900 px-4 py-2"
          onClick={() => {
            for (const resource of Object.keys(stateFeatures.furnaceInput)) {
              if (stateFeatures.furnaceInput[resource] > 0) {
                dispatchMain({
                  type: "gainResource",
                  payload: {
                    resource: resource,
                    amount: stateFeatures.furnaceInput[resource],
                  },
                });
              }
            }
            dispatchFeatures({ type: "emptyFurnace" });
          }}
        >
          Empty
        </button>
      </div>
    </div>
  );
}

export default Furnace;
