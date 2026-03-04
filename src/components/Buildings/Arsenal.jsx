import { useEffect, useState } from "react";
import { useBuildingContext } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import { useMainContext } from "../../context/MainContext";
import ProgressBarBuilding from "../ProgressBarBuilding";
import Cost from "../Cost";
import { popIncreaseArsenal } from "../../variables";

function Arsenal({ builtAmount, cost, secsToBuild }) {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();

  return (
    <div className="grid grid-cols-4 items-center gap-4 px-5 py-3 bg-game-monolith border border-game-border rounded-sm hover:border-gray-600 transition-colors group">
      {/* Col 1: Icon & Name */}
      <div className="flex items-center justify-self-start">
        <Label>
          <Icon path={"arsenal.png"} type="plain" />
          <span className="text-gray-200">Arsenal</span>
        </Label>
      </div>

      {/* Col 2: Build Action */}
      <div className="w-full max-w-[160px] justify-self-center">
        <ProgressBarBuilding
          type={"arsenal"}
          cost={cost}
          secsToBuild={secsToBuild}
          popIncrease={popIncreaseArsenal}
        />
      </div>

      {/* Col 3: Amount Built */}
      <div className="justify-self-center text-2xl font-bold font-mono text-game-ichor">
        {builtAmount}
      </div>

      {/* Col 4: Cost */}
      <div className="justify-self-center flex flex-wrap justify-center gap-2">
        <Cost cost={cost} iconType={"plain"} />
      </div>
    </div>
  );
}

export default Arsenal;

// old return

// return (
//     <>
//       <div className="flex flex-col gap-3 items-center justify-center justify-self-start ">
//         <Label>
//           {" "}
//           <Icon type="plain" path={"arsenal.png"} />
//           Arsenal
//         </Label>
//       </div>
//       <div className="flex flex-col gap-3">
//         <ProgressBarBuilding
//           type={"arsenal"}
//           cost={cost}
//           secsToBuild={secsToBuild}
//           popIncrease={0}
//         />
//       </div>
//       <div className="justify-self-center"> {builtAmount}</div>
//       <div className="justify-self-center self-center">
//         <Cost cost={cost} iconType={"plain"} />
//       </div>
//     </>
//   );
