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
    stateMain.clicksToObtain.ironOre,
  );
  //console.log(clicksToObtain);
  return (
    <ResourceGridBox>
      <Label>
        <Icon path={"ironOre.png"} />
        <p>{"Iron Ore"} : </p>
      </Label>
      <span
        className="
          justify-self-center
          font-mono
          text-lg
          text-emerald-300
          bg-black/40
          px-3
          py-1
          rounded-md
          border
          border-zinc-700
          shadow-inner
        "
      >
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
      <Arrows resource="ironOre" />
    </ResourceGridBox>
  );
}

export default IronOre;
