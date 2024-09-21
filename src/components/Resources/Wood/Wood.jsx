import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import ArrowsWood from "./ArrowsWood";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import { amountWoodCollectedOnClick as woodCollected } from "../../../variables";
function Wood() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [secsToObtain, setSecsToObtain] = useState(stateMain.secsToCollectWood);
  return (
    <>
      <Label>
        <Icon path={"wood.png"} />
        <p>{"Wood"} : </p>
      </Label>
      <span className="shrink justify-self-center">{stateMain.wood}</span>

      <ProgressBar
        type={"gainedWoodX"}
        secsToObtain={secsToObtain}
        setSecsToObtain={setSecsToObtain}
        payload={woodCollected * stateUpgrade.selfWoodMultiplier}
      />
      <ArrowsWood />
    </>
  );
}

export default Wood;
