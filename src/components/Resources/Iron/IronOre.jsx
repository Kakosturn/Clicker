import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";
import ProgressBar from "../../ProgressBar";

import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";

import Arrows from "../Arrows";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
function IronOre() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.ironOre
  );
  //console.log(clicksToObtain);
  return (
    <ResourceGridBox>
      <Label>
        <Icon path={"ironOre.png"} />
        <p>{"Iron Ore"} : </p>
      </Label>
      <span className="shrink justify-self-center">
        {stateMain.resources.ironOre.amount}
      </span>

      <ProgressBar
        type={"gainResource"}
        resource={"ironOre"}
        clicksToObtain={clicksToObtain}
        setClicksToObtain={setClicksToObtain}
        payload={
          stateMain.obtainedAmount.ironOre * stateUpgrade.multiplierSelf.ironOre
        }
      />
      <Arrows resource="wood" />
    </ResourceGridBox>
  );
}

export default IronOre;
