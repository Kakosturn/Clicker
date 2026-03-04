import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { motion } from "motion/react";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
function IronOre() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.ironOre,
  );
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
        key={stateMain.resources.ironOre.amount}
        initial={{
          scale: 1.1,
          color: stateMain.resourceIncreased ? "#ffffff" : "#ff0000",
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
          rounded-sm
          border
          border-game-border
          shadow-inner
        "
      >
        {stateMain.resources.ironOre.amount}
      </motion.span>
      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          resource={"ironOre"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={
            stateMain.obtainedAmount.ironOre *
            stateUpgrade.multiplierSelf.ironOre
          }
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
