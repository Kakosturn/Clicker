import { useState } from "react";
import Icon from "../../Icon";
import { motion } from "motion/react";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";

import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
import { useMainStore } from "../../../stores/useMainStore";

function Wood() {
 
  const clicksToObtainWood = useMainStore((state) => state.clicksToObtain.wood);
  const resourceIncreased = useMainStore((state) => state.resourceIncreased);
  const obtainedAmount = useMainStore((state) => state.obtainedAmount.wood);
  const wood = useMainStore((state) => state.resources.wood.amount);
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    clicksToObtainWood,
  );
  // const deneme = [null, null];
  console.log("wood comp rendered");
  return (
    <ResourceGridBox>
      {/* LEFT: icon + label */}
      <div className="flex items-center gap-3">
        <Label>
          <Icon path={"wood.png"} />
          <p className="text-zinc-200 tracking-wide">Wood :</p>
        </Label>
      </div>

      {/* AMOUNT */}
      <motion.span
        key={wood}
        initial={{
          scale: 1.1,
          color: resourceIncreased ? "#ffffff" : "#ff0000",
          textShadow: "0px 0px 8px #ffffff",
        }}
        animate={{
          scale: 1,
          color: "#B9FF24",
          textShadow: "0px 0px 0px transparent",
        }}
        transition={{ duration: resourceIncreased ? 0.2 : 1 }}
        className="
          justify-self-center
          font-bold
          bg-game-panel
          px-4
          py-1
          rounded-xs
          border
          border-game-border
          shadow-inner
        "
      >
        {wood}
      </motion.span>

      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          resource={"wood"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={
            obtainedAmount * stateUpgrade.multiplierSelf.wood
          }
        />
      </div>

      {/* UPGRADE ARROWS */}
      <div className="flex justify-end">
        <Arrows resource="wood" />
      </div>
    </ResourceGridBox>
  );
}

export default Wood;
