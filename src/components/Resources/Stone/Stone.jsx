import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import ArrowsStone from "./ArrowsStone";
import { useMainContext } from "./../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import { amountStoneCollectedOnClick as stoneCollected } from "../../../variables";
function Stone() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [secsToObtain, setSecsToObtain] = useState(
    stateMain.secsToCollectStone
  );
  return (
    <>
      <Label>
        <Icon path={"stone.png"} />
        <p>{"Stone"} : </p>
      </Label>
      <span className="shrink justify-self-center">{stateMain.stone}</span>

      <ProgressBar
        type={"gainedStoneX"}
        secsToObtain={secsToObtain}
        setSecsToObtain={setSecsToObtain}
        payload={stoneCollected * stateUpgrade.selfStoneMultiplier}
      />
      <ArrowsStone />
    </>
  );
}

export default Stone;
