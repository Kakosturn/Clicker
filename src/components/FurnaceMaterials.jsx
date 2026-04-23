import { motion } from "motion/react";
import { errorToast } from "./Toast";
import { costObjectForFurnaceMaterial } from "../utils/helper";
import { useMainStore } from "../stores/useMainStore";
import { useFeaturesStore } from "../stores/useFeaturesStore";
function FurnaceMaterials({ material, amount, isSmelting }) {
  const resources = useMainStore((state) => state.resources);
  const loseResource = useMainStore((state) => state.loseResource);
  const furnaceLimit = useFeaturesStore((state) => state.furnaceLimit);
  const addToFurnace = useFeaturesStore((state) => state.addToFurnace);
  const currentMaterial = resources[material].amount;
  // console.log(currentMaterial, resources[material]);
  // console.log(amount);
  return (
    <div className="flex items-center justify-between bg-game-panel border border-game-border rounded-xs p-4">
      <div className="flex flex-col gap-1">
        <p className="text-white font-bold uppercase tracking-wider text-lg">
          {material}
        </p>
        <p className="text-sm text-gray-500 font-mono">
          {currentMaterial} IN STORAGE
        </p>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#B9FF24",
            color: "#101114",
          }}
          whileTap={{ scale: 0.95 }}
          disabled={isSmelting}
          className="px-3 py-2 rounded-xs bg-game-border text-gray-300 font-bold font-mono transition-colors"
          onClick={() => {
            if (currentMaterial === 0) return;
            if (amount < furnaceLimit) {
              addToFurnace({ resource: material, amount: 1 });
              loseResource({ cost: costObjectForFurnaceMaterial(material, 1) });
            } else errorToast("Furnace is full");
          }}
        >
          +1
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#B9FF24",
            color: "#101114",
          }}
          disabled={isSmelting}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-2 rounded-xs bg-game-border text-gray-300 font-bold uppercase tracking-widest transition-colors"
          onClick={() => {
            if (amount < furnaceLimit) {
              const toAdd = Math.min(furnaceLimit - amount, currentMaterial);
              if (toAdd === 0) return;
              addToFurnace({ resource: material, amount: toAdd });
              loseResource({
                cost: costObjectForFurnaceMaterial(material, toAdd),
              });
            }
          }}
        >
          MAX
        </motion.button>

        <input
          type="number"
          max={currentMaterial}
          disabled
          value={amount}
          className="w-16 px-2 py-2 text-center rounded-xs bg-game-monolith text-game-ichor font-bold font-mono border border-game-border focus:outline-hidden focus:border-game-ichor appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}

export default FurnaceMaterials;
