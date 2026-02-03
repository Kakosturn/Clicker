// import { useState } from "react";
// import Icon from "../../Icon";
// import Label from "../../Layout/Label";
// import ProgressBar from "../../ProgressBar";
// import { useMainContext } from "../../../context/MainContext";
// import { useUpgradeContext } from "../../../context/UpgradeContext";
// import Arrows from "../Arrows";
// import ResourceGridBox from "../../ResourceComponents/ResourceGridBox";
// function Wood() {
//   const { state: stateMain } = useMainContext();
//   const { state: stateUpgrade } = useUpgradeContext();
//   const [clicksToObtain, setClicksToObtain] = useState(
//     stateMain.clicksToObtain.wood,
//   );
//   //console.log(clicksToObtain);
//   return (
//     <ResourceGridBox>
//       <Label>
//         <Icon path={"wood.png"} />
//         <p>{"Wood"} : </p>
//       </Label>
//       <span className="shrink justify-self-center">
//         {stateMain.resources.wood.amount}
//       </span>

//       <ProgressBar
//         type={"gainResource"}
//         resource={"wood"}
//         clicksToObtain={clicksToObtain}
//         setClicksToObtain={setClicksToObtain}
//         payload={
//           stateMain.obtainedAmount.wood * stateUpgrade.multiplierSelf.wood
//         }
//       />
//       <Arrows resource="wood" />
//     </ResourceGridBox>
//   );
// }

// export default Wood;

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
    stateMain.clicksToObtain.wood,
  );

  return (
    <ResourceGridBox>
      {/* LEFT: icon + label */}
      <div className="flex items-center gap-3">
        <Label>
          <Icon path={"wood.png"} />
          <p className="text-zinc-200 tracking-wide">Wood</p>
        </Label>
      </div>

      {/* AMOUNT */}
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
        {stateMain.resources.wood.amount}
      </span>

      {/* PROGRESS BAR */}
      <div className="w-full">
        <ProgressBar
          type={"gainResource"}
          resource={"wood"}
          clicksToObtain={clicksToObtain}
          setClicksToObtain={setClicksToObtain}
          payload={
            stateMain.obtainedAmount.wood * stateUpgrade.multiplierSelf.wood
          }
        />
      </div>

      {/* UPGRADE ARROWS */}
      <div className="flex justify-end">
        <Arrows resource="wood" />
      </div>
    </ResourceGridBox>
  );
}

export default Wood;
