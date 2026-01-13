import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import ArrowsWood from "../../../OldComps/ArrowsWood";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import { amountWoodCollectedOnClick as woodCollected } from "../../../variables";
import Arrows from "../Arrows";
function Wood() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.wood
  );
  //console.log(clicksToObtain);
  return (
    <>
      <Label>
        <Icon path={"wood.png"} />
        <p>{"Wood"} : </p>
      </Label>
      <span className="shrink justify-self-center">
        {stateMain.resources.wood.amount}
      </span>

      <ProgressBar
        type={"gainResource"}
        resource={"wood"}
        clicksToObtain={clicksToObtain}
        setClicksToObtain={setClicksToObtain}
        payload={woodCollected * stateUpgrade.selfWoodMultiplier}
      />
      <Arrows resource="wood" />
    </>
  );
}

export default Wood;
