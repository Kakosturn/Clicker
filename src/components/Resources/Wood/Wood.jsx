import { useState } from "react";
import Icon from "../../Icon";
import { motion } from "motion/react";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";

function Wood() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.wood,
  );
  const deneme = [null, null];
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
        key={stateMain.resources.wood.amount}
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
        transition={{ duration: stateMain.resourceIncreased ? 0.2 : 1 }}
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
        {stateMain.resources.wood.amount}
      </motion.span>

      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          resource={"wood"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={
            stateMain.obtainedAmount.wood * stateUpgrade.multiplierSelf.wood
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
