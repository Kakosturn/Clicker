import { useState } from "react";
import Icon from "../../Icon";
import Label from "../../Layout/Label";

import { useMainContext } from "../../../context/MainContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";
import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";

function IronBar() {
  const { state: stateMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  const [clicksToObtain, setClicksToObtain] = useState(
    stateMain.clicksToObtain.wood,
  );
  //console.log(clicksToObtain);
  return (
    <>
      <ResourceGridBox>
        <Label>
          <Icon path={"ironBar.png"} />
          <p>{"Iron Bar"} : </p>
        </Label>
        <span className="shrink justify-self-center">
          {stateMain.resources.ironBar.amount}
        </span>
      </ResourceGridBox>
    </>
  );
}

export default IronBar;
