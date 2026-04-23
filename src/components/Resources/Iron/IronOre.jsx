import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { motion } from "motion/react";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
import { useMainStore } from "../../../stores/useMainStore";

function IronOre() {
  const clicksToObtainIronOre = useMainStore(
    (state) => state.clicksToObtain.ironOre,
  );
  const ironOre = useMainStore((state) => state.resources.ironOre.amount);
  const resourceIncreased = useMainStore((state) => state.resourceIncreased);
  const obtainedAmount = useMainStore((state) => state.obtainedAmount.ironOre);
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(clicksToObtainIronOre);
  //console.log(clicksToObtain);
  return (
    <ResourceGridBox>
      {/* LEFT: icon + label */}
      <div className="flex items-center gap-3">
        <Label>
          <Icon path={"ironOre.png"} />
          <p>{"Iron Ore"} : </p>
        </Label>
      </div>

      {/* AMOUNT */}
      <motion.span
        key={ironOre}
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
        {ironOre}
      </motion.span>
      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          resource={"ironOre"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={obtainedAmount * stateUpgrade.multiplierSelf.ironOre}
        />
      </div>
      {/* UPGRADE ARROWS */}
      <div className="flex justify-end">
        <Arrows resource="ironOre" />
      </div>
    </ResourceGridBox>
  );
}

export default IronOre;
