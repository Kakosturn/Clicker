import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Icon from "../Icon";

function EnemyCooldownBar({
  duration = 3,
  onComplete,
  hpEnemy,
  armorEnemy,
  dmgEnemy,
}) {
  const [key, setKey] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log("tick");
  //     onComplete?.();
  //     setKey((prev) => prev + 1); // restart animation
  //   }, duration * 1000);

  //   return () => clearTimeout(timer);
  // }, [duration, onComplete]);
  function handleAttack() {
    onComplete?.();
    setKey((prev) => prev + 1);
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full h-4 bg-zinc-800 rounded-sm overflow-hidden">
        <motion.div
          key={key}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration, ease: "linear" }}
          className="h-full bg-red-600"
          onAnimationComplete={handleAttack}
        />
      </div>
      <div className="flex gap-1">
        <Icon path={"damage.png"} type="plain" />
        <p>{dmgEnemy}</p>
      </div>
      <div className="flex gap-1">
        <Icon path={"armor.png"} type="plain" />
        <p>{armorEnemy}</p>
      </div>
      <div className="flex gap-1">
        <Icon path={"hp.png"} type="plain" />
        <p>{hpEnemy}</p>
      </div>
    </div>
  );
}

export default EnemyCooldownBar;
