import { useEffect, useState } from "react";
import { useBuildingContext, Cost } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import ProgressBarBuilding from "../ProgressBarBuilding";
import { useMainContext } from "../../context/MainContext";

function Shack() {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const [secsToBuild, setSecsToBuild] = useState(0.5);
  //console.log(new Cost(buildingState.costShack));
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 justify-self-start">
        <Label>
          {" "}
          <Icon path={"shack.png"} />
          Shack
        </Label>
      </div>
      <div className="">
        <ProgressBarBuilding
          type={"shack"}
          cost={new Cost(buildingState.costShack)}
          material={"wood"}
          secsToBuild={secsToBuild}
          popIncrease={1}
        />
      </div>
      <div className="justify-self-center">{buildingState.shack}</div>
      <div className="justify-self-center self-center">
        {buildingState.costShack} <Icon path={"wood.png"} />
      </div>
    </>
  );
}

export default Shack;
