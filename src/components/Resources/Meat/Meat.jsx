import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";

function Meat() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();

  const [secsToObtain, setSecsToObtain] = useState(1);
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
        payload={stateUpgrade.selfMeatMultiplier}
      />
    </>
  );
}

export default Meat;
