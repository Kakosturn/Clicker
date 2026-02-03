import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "./../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
function Stone() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.stone,
  );
  return (
    <ResourceGridBox>
      <Label>
        <Icon path={"stone.png"} />
        <p>{"Stone"} : </p>
      </Label>
      <span
        className="
          justify-self-center
          font-mono
          text-lg
          text-emerald-300
          bg-black/40
          px-3
          py-1
          rounded-md
          border
          border-zinc-700
          shadow-inner
        "
      >
        {stateMain.resources.stone.amount}
      </span>

      <ProgressBar
        type={"gainResource"}
        clicksToObtain={clicksToObtain}
        setClicksToObtain={setClicksToObtain}
        payload={
          stateMain.obtainedAmount.stone * stateUpgrade.multiplierSelf.stone
        }
        resource={"stone"}
      />
      <Arrows resource="stone" />
    </ResourceGridBox>
  );
}

export default Stone;
