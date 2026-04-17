import { useState } from "react";
import Icon from "../../Icon";
import { motion } from "motion/react";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
function Meat() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();

  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.meat,
  );
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
        key={stateMain.resources.meat.amount}
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
          rounded-xs
          border
          border-game-border
          shadow-inner
        "
      >
        {stateMain.resources.meat.amount}
      </motion.span>

      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={
            stateMain.obtainedAmount.meat * stateUpgrade.multiplierSelf.meat
          }
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
