import { useState } from "react";

import { Cost } from "../utils/costClass";
import { errorToast } from "./Toast";
import { motion } from "motion/react";
import FurnaceMaterials from "./FurnaceMaterials";
import { useMainStore } from "../stores/useMainStore";
import { useShallow } from "zustand/shallow";
import { useFeaturesStore } from "../stores/useFeaturesStore";
function Furnace() {
  const { gainResource, wood, ironBarTotal, loseResource, firstIronBarStatus } =
    useMainStore(
      useShallow((state) => ({
        gainResource: state.gainResource,
        wood: state.resources.wood.amount,
        ironBarTotal: state.resources.ironBar.total,
        loseResource: state.loseResource,
        firstIronBarStatus: state.firstIronBarStatus,
      })),
    );
  const furnaceInput = useFeaturesStore((state) => state.furnaceInput);
  const smeltResourceInSeconds = useFeaturesStore(
    (state) => state.smeltResourceInSeconds,
  );
  const smeltCostFor = useFeaturesStore((state) => state.smeltCostFor);
  const furnaceLimit = useFeaturesStore((state) => state.furnaceLimit);
  const emptyFurnace = useFeaturesStore((state) => state.emptyFurnace);
  const smelt = useFeaturesStore((state) => state.smelt);
  const [isSmelting, setIsSmelting] = useState(false);

  // const ironOreInFurnace = stateFeatures.furnaceInput.ironOre;

  const oreInFurnace = Object.keys(furnaceInput).find(
    (el) => furnaceInput[el] > 0,
  );
  console.log(oreInFurnace);
  const secsToSmelt =
    smeltResourceInSeconds[oreInFurnace] * furnaceInput[oreInFurnace] * 1000;

  const amount = oreInFurnace ? furnaceInput[oreInFurnace] : 0;

  const costOfSmelt =
    amount * smeltCostFor[oreInFurnace]
      ? amount * smeltCostFor[oreInFurnace]
      : 0;

  return (
    <div className="w-full bg-game-panel border border-game-border rounded-xs p-8 flex gap-8 shadow-2xl">
      {/* LEFT SIDE — RESOURCES */}
      <div className="flex-1 bg-game-monolith border border-game-border rounded-xs p-6 flex flex-col gap-6 shadow-inner">
        <h3 className="text-game-ichor font-bold tracking-widest uppercase text-xl border-b border-game-border pb-2">
          Input
        </h3>

        {/* RESOURCE ROW */}
        <FurnaceMaterials
          material={"ironOre"}
          amount={amount}
          isSmelting={isSmelting}
        />
      </div>
      {/* RIGHT SIDE — FURNACE */}
      <div className="w-80 bg-game-monolith border border-game-border rounded-xs p-6 flex flex-col items-center gap-6 shadow-inner relative">
        {/* Furnace Image (With animated heat glow) */}
        <motion.div
          animate={{
            boxShadow: isSmelting
              ? [
                  "inset 0px 0px 10px #D73A4A",
                  "inset 0px 0px 40px #D73A4A",
                  "inset 0px 0px 10px #D73A4A",
                ]
              : "inset 0px 0px 10px rgba(0,0,0,0.5)",
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-32 h-32 rounded-xs bg-game-panel border border-game-border flex items-center justify-center relative overflow-hidden"
        >
          <img
            src="furnace.png"
            alt="furnace"
            className={`w-20 h-20 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] transition-all duration-500 ${isSmelting ? "brightness-125 saturate-150" : "brightness-75"}`}
          />
        </motion.div>

        {/* Capacity */}
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
          Capacity: <span className="text-white">{furnaceLimit}</span>
        </p>
        {/* Input info */}
        <div className="text-center w-full bg-game-panel border border-game-border py-2 rounded-xs">
          <p className="text-game-ichor font-bold tracking-widest text-xs mb-1">
            Queue
          </p>
          <p className="text-white font-mono text-lg">
            {amount} {oreInFurnace}
          </p>
        </div>
        {/* Empty button */}
        <button
          className="text-xs tracking-widest text-gray-500 hover:text-game-rust transition-colors underline underline-offset-4"
          disabled={isSmelting}
          onClick={() => {
            for (const resource of Object.keys(furnaceInput)) {
              if (furnaceInput[resource] > 0) {
                // dispatchMain({
                //   type: "gainResource",
                //   payload: {
                //     resource: resource,
                //     amount: stateFeatures.furnaceInput[resource],
                //   },
                // });
                gainResource({
                  resource: resource,
                  amount: furnaceInput[resource],
                });
              }
            }
            emptyFurnace();
          }}
        >
          Empty Furnace
        </button>

        {/* Progress + Smelt */}
        <div className="w-full flex flex-col gap-3">
          <div className="relative w-full h-12 rounded-xs border border-game-border overflow-hidden bg-game-panel group">
            {/* Animated Progress Fill */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: isSmelting ? "100%" : "0%" }}
              transition={{
                duration: isSmelting ? secsToSmelt / 1000 : 0,
                ease: "linear",
              }}
              className="absolute left-0 top-0 h-full bg-game-rust shadow-[0_0_15px_rgba(215,58,74,0.6)]"
            />

            <button
              className={`
                 relative z-10 w-full h-full font-bold tracking-wider transition-colors
                 ${isSmelting ? "text-white" : "text-gray-400 group-hover:text-white"}
               `}
              disabled={isSmelting}
              onClick={() => {
                if (!oreInFurnace) {
                  errorToast("Smelter queue is empty");
                  return;
                }

                if (wood >= costOfSmelt) {
                  setIsSmelting(true);
                  setTimeout(() => {
                    if (ironBarTotal === 0) {
                      firstIronBarStatus();
                    }

                    smelt();
                    gainResource({
                      resource: `${oreInFurnace.replace("Ore", "Bar")}`,
                      amount: amount,
                    });
                    loseResource({ cost: new Cost(costOfSmelt) });
                    setIsSmelting(false);
                  }, secsToSmelt);
                } else errorToast("Insufficient Wood for heat");
              }}
            >
              {isSmelting ? `Smelting...` : "Smelt"}
            </button>
          </div>

          <p className="text-center text-gray-400 font-mono text-sm">
            Fuel Cost:{" "}
            <span className="text-game-rust">{costOfSmelt} Wood</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Furnace;
