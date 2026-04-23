// import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import { motion } from "motion/react";
// import { useUpgradeContext } from "../../../context/UpgradeContext";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
import { useMainStore } from "../../../stores/useMainStore";

function IronBar() {
  const resourceIncreased = useMainStore((state) => state.resourceIncreased);
  const ironBar = useMainStore((state) => state.resources.ironBar.amount);
  // const { state: stateUpgrade } = useUpgradeContext();
  // const [clicksToObtain, setClicksToObtain] = useState(
  //   stateMain.clicksToObtain.wood,
  // );
  //console.log(clicksToObtain);
  return (
    <>
      <ResourceGridBox>
        {/* LEFT: icon + label */}
        <div className="flex items-center gap-3">
          <Label>
            <Icon path={"ironBar.png"} />
            <p>{"Iron Bar"} : </p>
          </Label>
        </div>

        {/* AMOUNT */}
        <motion.span
          key={ironBar}
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
          {ironBar}
        </motion.span>
      </ResourceGridBox>
    </>
  );
}

export default IronBar;
