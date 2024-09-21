import { useEffect, useState } from "react";
import { Cost, useBuildingContext } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import { useMainContext } from "../../context/MainContext";
import ProgressBarBuilding from "../ProgressBarBuilding";

function Bungalow() {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const [secsToBuild, setSecsToBuild] = useState(
    buildingState.secsToBuildBungalow
  );

  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center justify-self-start">
        <Label>
          {" "}
          <Icon path={"bungalow.png"} />
          Bungalow
        </Label>
      </div>
      <div className="flex flex-col gap-3">
        <ProgressBarBuilding
          type={"bungalow"}
          cost={
            new Cost(
              buildingState.costBungalowWood,
              buildingState.costBungalowStone
            )
          }
          material={"wood"}
          secsToBuild={secsToBuild}
          popIncrease={4}
        />
      </div>
      <div className="justify-self-center"> {buildingState.bungalow}</div>
      <div className="justify-self-center self-center">
        {buildingState.costBungalowWood}{" "}
        <Icon path={"wood.png"} width="w-1/6" />/
        {buildingState.costBungalowStone}{" "}
        <Icon path={"stone.png"} width="w-1/6" />
      </div>
    </>
  );
}

export default Bungalow;
