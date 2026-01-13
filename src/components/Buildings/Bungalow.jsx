import { useEffect, useState } from "react";
import { Cost, useBuildingContext } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import { useMainContext } from "../../context/MainContext";
import ProgressBarBuilding from "../ProgressBarBuilding";

function Bungalow({ builtAmount, cost, secsToBuild }) {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();

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
          cost={cost}
          material={"wood"}
          secsToBuild={secsToBuild}
          popIncrease={4}
        />
      </div>
      <div className="justify-self-center"> {builtAmount}</div>
      <div className="justify-self-center self-center">
        {cost.wood} <Icon path={"wood.png"} width="w-1/6" />/{cost.stone}{" "}
        <Icon path={"stone.png"} width="w-1/6" />
      </div>
    </>
  );
}

export default Bungalow;
