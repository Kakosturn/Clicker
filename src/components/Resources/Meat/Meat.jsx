import { useState } from "react";
import Icon from "../../Icon";
import { motion } from "motion/react";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
import { useMainStore } from "../../../stores/useMainStore";
import { useUpgradeStore } from "../../../stores/useUpgradeStore";
function Meat() {
  const clicksToObtainMeat = useMainStore((state) => state.clicksToObtain.meat);
  const resourceIncreased = useMainStore((state) => state.resourceIncreased);
  const obtainedAmount = useMainStore((state) => state.obtainedAmount.meat);
  const meat = useMainStore((state) => state.resources.meat.amount);
  const multiplierSelfMeat = useUpgradeStore(
    (state) => state.multiplierSelf.meat,
  );
  const [clicksToObtain, setClicksToObtain] = useState(clicksToObtainMeat);
  return (
    <ResourceGridBox>
      {/* LEFT: icon + label */}
      <div className="flex items-center gap-3">
        <Label>
          <Icon path={"meat.png"} />
          <p>{"Meat"} : </p>
        </Label>
      </div>

      {/* AMOUNT */}
      <motion.span
        key={meat}
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
        transition={{ duration: 0.2 }}
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
        {meat}
      </motion.span>

      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={obtainedAmount * multiplierSelfMeat}
          resource={"meat"}
        />
      </div>
      {/* UPGRADE ARROWS */}
      <div className="flex justify-end">
        <Arrows resource="meat" />
      </div>
    </ResourceGridBox>
  );
}

export default Meat;
