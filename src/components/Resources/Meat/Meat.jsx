import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import ArrowsMeat from "../../../OldComps/ArrowsMeat";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import { amountMeatCollectedOnClick as meatCollected } from "../../../variables";
import Arrows from "../Arrows";
function Meat() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();

  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.meat
  );
  return (
    <>
      <Label>
        <Icon path={"meat.png"} />
        <p>{"Meat"} : </p>
      </Label>
      <span className="shrink justify-self-center">
        {stateMain.resources.meat.amount}
      </span>

      <ProgressBar
        type={"gainResource"}
        clicksToObtain={clicksToObtain}
        setClicksToObtain={setClicksToObtain}
        payload={meatCollected * stateUpgrade.selfMeatMultiplier}
        resource={"meat"}
      />
      <Arrows resource={"meat"} />
    </>
  );
}

export default Meat;
