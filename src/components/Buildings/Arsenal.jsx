import { useEffect, useState } from "react";
import { useBuildingContext } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import { useMainContext } from "../../context/MainContext";
import ProgressBarBuilding from "../ProgressBarBuilding";
import Cost from "../Cost";

function Arsenal({ builtAmount, cost, secsToBuild }) {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();

  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center justify-self-start ">
        <Label>
          {" "}
          <Icon type="plain" path={"arsenal.png"} />
          Arsenal
        </Label>
      </div>
      <div className="flex flex-col gap-3">
        <ProgressBarBuilding
          type={"arsenal"}
          cost={cost}
          secsToBuild={secsToBuild}
          popIncrease={0}
        />
      </div>
      <div className="justify-self-center"> {builtAmount}</div>
      <div className="justify-self-center self-center">
        <Cost cost={cost} iconType={"plain"} />
      </div>
    </>
  );
}

export default Arsenal;
