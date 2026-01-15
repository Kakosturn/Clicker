import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
function Meat() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();

  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.meat
  );
  return (
    <ResourceGridBox>
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
        payload={
          stateMain.obtainedAmount.meat * stateUpgrade.multiplierSelf.meat
        }
        resource={"meat"}
      />
      <Arrows resource={"meat"} />
    </ResourceGridBox>
  );
}

export default Meat;
