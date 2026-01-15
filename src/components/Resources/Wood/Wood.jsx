import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";
import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
function Wood() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.wood
  );
  //console.log(clicksToObtain);
  return (
    <ResourceGridBox>
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
        payload={
          stateMain.obtainedAmount.wood * stateUpgrade.multiplierSelf.wood
        }
      />
      <Arrows resource="wood" />
    </ResourceGridBox>
  );
}

export default Wood;
