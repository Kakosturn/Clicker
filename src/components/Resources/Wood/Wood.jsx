import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";

function Wood() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [secsToObtain, setSecsToObtain] = useState(1);
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
        payload={stateUpgrade.selfWoodMultiplier}
      />
    </>
  );
}

export default Wood;
