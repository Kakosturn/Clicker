import { useState } from "react";
import { useMainContext } from "../context/MainContext";
import { useFeatureContext } from "../context/FeaturesContext";
import { Cost } from "../context/BuildingContext";
import { errorToast } from "./Toast";
function Furnace() {
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: stateFeatures, dispatch: dispatchFeatures } =
    useFeatureContext();
  const [isSmelting, setIsSmelting] = useState(false);
  const currentIronOre = stateMain.resources.ironOre.amount;
  const ironOreInFurnace = stateFeatures.furnaceInput.ironOre;
  const furnaceLimit = stateFeatures.furnaceLimit;
  const oreInFurnace = Object.keys(stateFeatures.furnaceInput).find(
    (el) => stateFeatures.furnaceInput[el] > 0,
  );
  const secsToSmelt =
    stateFeatures.smeltResourceInSeconds[oreInFurnace] *
    stateFeatures.furnaceInput[oreInFurnace] *
    1000;
  // console.log(stateFeatures);
  const amount = oreInFurnace ? stateFeatures.furnaceInput[oreInFurnace] : 0;
  const startSmelting = () => {
    if (!oreInFurnace) {
      errorToast("Smelter is empty");
      return;
    }

    setIsSmelting(true);

    setTimeout(() => {
      dispatchFeatures({ type: "smelt" });
      setIsSmelting(false);
    }, secsToSmelt);
  };
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
        <div className="relative w-48 h-10 rounded-xl border-2 border-gray-200 overflow-hidden bg-[#303030]">
          {/* progress fill */}
          <div
            className="
          absolute left-0 top-0 h-full
          bg-gradient-to-r from-red-700 via-orange-600 to-yellow-400
          shadow-[0_0_12px_rgba(255,120,60,0.8)]
        "
            style={{
              width: isSmelting ? "100%" : "0%",
              transition: isSmelting
                ? `width ${secsToSmelt / 1000}s linear`
                : "none",
            }}
          />

          {/* optional glow */}
          {isSmelting && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="building-shine" />
            </div>
          )}

          {/* button */}
          <button
            className={`
          relative z-10 w-full h-full font-semibold
          ${isSmelting ? "text-yellow-100" : "text-gray-200"}
        `}
            disabled={isSmelting}
            onClick={startSmelting}
          >
            {isSmelting ? `Smelting ${amount} ${oreInFurnace}...` : "Smelt"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Furnace;
