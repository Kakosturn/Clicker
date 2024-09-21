import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import ArrowsMeat from "./ArrowsMeat";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import { amountMeatCollectedOnClick as meatCollected } from "../../../variables";
function Meat() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();

  const [secsToObtain, setSecsToObtain] = useState(stateMain.secsToCollectMeat);
  return (
    <>
      <Label>
        <Icon path={"meat.png"} />
        <p>{"Meat"} : </p>
      </Label>
      <span className="shrink justify-self-center">{stateMain.meat}</span>

      <ProgressBar
        type={"gainedMeatX"}
        secsToObtain={secsToObtain}
        setSecsToObtain={setSecsToObtain}
        payload={meatCollected * stateUpgrade.selfMeatMultiplier}
      />
      <ArrowsMeat />
    </>
  );
}

export default Meat;
