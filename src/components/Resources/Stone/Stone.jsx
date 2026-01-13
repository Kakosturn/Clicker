import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import ArrowsStone from "../../../OldComps/ArrowsStone";
import { useMainContext } from "./../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import { amountStoneCollectedOnClick as stoneCollected } from "../../../variables";
import Arrows from "../Arrows";
function Stone() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.stone
  );
  return (
    <>
      <Label>
        <Icon path={"stone.png"} />
        <p>{"Stone"} : </p>
      </Label>
      <span className="shrink justify-self-center">
        {stateMain.resources.stone.amount}
      </span>

      <ProgressBar
        type={"gainResource"}
        clicksToObtain={clicksToObtain}
        setClicksToObtain={setClicksToObtain}
        payload={stoneCollected * stateUpgrade.selfStoneMultiplier}
        resource={"stone"}
      />
      <Arrows resource="stone" />
    </>
  );
}

export default Stone;
