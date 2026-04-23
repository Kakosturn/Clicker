import { useState } from "react";
import Icon from "../../Icon";
import { motion } from "motion/react";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
import { useMainStore } from "../../../stores/useMainStore";
function Stone() {
  const clicksToObtainStone = useMainStore(
    (state) => state.clicksToObtain.stone,
  );
  const resourceIncreased = useMainStore((state) => state.resourceIncreased);
  const obtainedAmount = useMainStore((state) => state.obtainedAmount.stone);
  const stone = useMainStore((state) => state.resources.stone.amount);

  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(clicksToObtainStone);
  return (
    <ResourceGridBox>
      {/* LEFT: icon + label */}
      <Label>
        <Icon path={"stone.png"} />
        <p>{"Stone"} : </p>
      </Label>

      {/* AMOUNT */}
      <motion.span
        key={stone}
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
        {stone}
      </motion.span>

      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={obtainedAmount * stateUpgrade.multiplierSelf.stone}
          resource={"stone"}
        />
      </div>

      {/* UPGRADE ARROWS */}
      <div className="flex justify-end">
        <Arrows resource="stone" />
      </div>
    </ResourceGridBox>
  );
}

export default Stone;
