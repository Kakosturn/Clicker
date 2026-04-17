import { useState } from "react";
import { motion } from "motion/react";
import Icon from "../Icon";

function PlayerCooldownBar({ duration = 3, onAttack, hp, dmg, armor }) {
  const [ready, setReady] = useState(false);
  const [key, setKey] = useState(8);

  const handleAttack = () => {
    if (!ready) return; // can't attack yet

    onAttack?.();
    setKey((prev) => prev + 1); // restart bar

    setReady(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full h-4 bg-zinc-800 rounded-sm overflow-hidden">
        <motion.div
          key={key}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration, ease: "linear" }}
          className="h-full bg-red-600"
          onAnimationComplete={() => setReady(true)}
        />
      </div>
      <button
        onClick={handleAttack}
        className={`px-3 py-1 rounded ${
          ready
            ? "bg-orange-600 hover:bg-orange-700"
            : "bg-zinc-700 cursor-not-allowed"
        }`}
        disabled={!ready}
      >
        Attack
      </button>
      <div className="flex gap-1">
        <Icon path={"damage.png"} type="plain" />
        <p>{dmg}</p>
      </div>
      <div className="flex gap-1">
        <Icon path={"armor.png"} type="plain" />
        <p>{armor}</p>
      </div>
      <div className="flex gap-1">
        <Icon path={"hp.png"} type="plain" />
        <p>{hp}</p>
      </div>
    </div>
  );
}

export default PlayerCooldownBar;
