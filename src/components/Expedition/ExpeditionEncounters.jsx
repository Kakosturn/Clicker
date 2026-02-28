import RefillStation from "./RefillStation";
import { AnimatePresence } from "motion/react";
import Enemy from "./Enemy";

function ExpeditionEncounters({ type }) {
  return (
    <AnimatePresence mode="wait">
      {type === "empty" && <div key={"empty"}></div>}
      {type === "treasure" && <div>treasure</div>}
      {type === "smallEnemy" && <Enemy key={"smallEnemy"} />}
      {type === "mediumEnemy" && <Enemy key={"mediumEnemy"} />}
      {type === "boss" && <div>boss</div>}
      {type === "newElement" && <div>new element</div>}
      {type === "refillStation" && <RefillStation key={"refillStation"} />}
    </AnimatePresence>
  );
}

export default ExpeditionEncounters;
