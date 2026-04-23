import { useExpeditionStore } from "../../stores/useExpeditionStore";
import { useMainStore } from "../../stores/useMainStore";
import { Cost } from "../../utils/costClass";
import Icon from "../Icon";
import { errorToast } from "../Toast";
import { motion } from "motion/react";
function RefillStation() {
  const meat = useMainStore((state) => state.resources.meat.amount);
  const loseResource = useMainStore((state) => state.loseResource);
  const refillStationMeat = useExpeditionStore(
    (state) => state.refillStationMeat,
  );
  const setRefillStationMeat = useExpeditionStore(
    (state) => state.setRefillStationMeat,
  );
  const meatRefillStationTransfer = useExpeditionStore(
    (state) => state.meatRefillStationTransfer,
  );
  const maxMeatAcquiredFromRefill = useExpeditionStore(
    (state) => state.maxMeatAcquiredFromRefill,
  );
  const finalizeEncounter = useExpeditionStore(
    (state) => state.finalizeEncounter,
  );
  const playerPos = useExpeditionStore((state) => state.playerPos);
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full bg-linear-to-br from-zinc-900 via-zinc-800 to-black text-zinc-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <div className="shadow-2xl p-4 w-full h-full max-w-md flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-orange-400 text-center tracking-wider drop-shadow-lg">
          Refill Station
        </h1>
        <div className="flex items-center justify-between bg-zinc-800 p-2 shadow-md">
          <div className="flex items-center gap-3">
            <Icon type="plain" path={"meat.png"} />
            <span className="font-semibold text-lg">Meat</span>
          </div>
          <span className="text-sm text-zinc-400">Available: {meat}</span>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <input
            type="number"
            value={refillStationMeat}
            onChange={(e) => setRefillStationMeat(e.target.value)}
            max={maxMeatAcquiredFromRefill}
            className="bg-zinc-700 h-full rounded-lg px-4 py-2 text-2xl focus:outline-hidden focus:ring-2 focus:ring-orange-400 w-24 text-center"
            onBlur={(e) => {
              if (e.target.value > maxMeatAcquiredFromRefill) {
                setRefillStationMeat(maxMeatAcquiredFromRefill);
              }
            }}
          />
          <button
            onClick={() => setRefillStationMeat(maxMeatAcquiredFromRefill)}
            className="px-2 py-2 rounded-lg bg-orange-900 hover:bg-orange-700 text-zinc-200 shadow-sm transition"
          >
            Max
          </button>
        </div>
        <div className="text-sm text-zinc-400 text-center">
          Station Capacity:{" "}
          <span className="text-orange-400">{maxMeatAcquiredFromRefill}</span>
        </div>
        <div className="text-center text-base">
          You will receive{" "}
          <span className="text-orange-400 font-bold">{refillStationMeat}</span>{" "}
          Meat
        </div>
        <button
          onClick={() => {
            if (meat > refillStationMeat) {
              finalizeEncounter({
                row: playerPos.row,
                col: playerPos.col,
              });
              meatRefillStationTransfer(refillStationMeat);
              loseResource({
                cost: new Cost(0, 0, refillStationMeat),
              });
            } else errorToast("Not enough meat");
          }}
          className="w-32 py-2 rounded-xl bg-orange-700 hover:bg-orange-600 active:scale-95 transition font-bold text-lg shadow-lg mx-auto"
        >
          Continue Expedition
        </button>
      </div>
    </motion.div>
  );
}

export default RefillStation;
