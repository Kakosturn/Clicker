import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "./../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";

function Stone() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [secsToObtain, setSecsToObtain] = useState(10);
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
        payload={stateUpgrade.selfStoneMultiplier}
      />
    </>
  );
}

export default Stone;
