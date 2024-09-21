import { useEffect, useState } from "react";
import { Cost, useBuildingContext } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import { useMainContext } from "../../context/MainContext";
import ProgressBarBuilding from "../ProgressBarBuilding";

function Cabin() {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const [secsToBuild, setSecsToBuild] = useState(
    buildingState.secsToBuildCabin
  );

  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center justify-self-start">
        <Label>
          {" "}
          <Icon path={"cabin.png"} />
          Cabin
        </Label>
      </div>
      <div className="">
        <ProgressBarBuilding
          type={"cabin"}
          cost={new Cost(buildingState.costBungalowWood)}
          material={"wood"}
          secsToBuild={secsToBuild}
          popIncrease={2}
        />
      </div>
      <div className="justify-self-center"> {buildingState.cabin}</div>
      <div className="justify-self-center self-center">
        {buildingState.costCabin} <Icon path={"wood.png"} width="w-1/6" />
      </div>
    </>
  );
}

export default Cabin;
