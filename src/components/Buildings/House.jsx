import { useBuildingContext } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import { useMainContext } from "../../context/MainContext";
import ProgressBarBuilding from "../ProgressBarBuilding";

function House({ builtAmount, cost, secsToBuild }) {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();

  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center justify-self-start">
        <Label>
          {" "}
          <Icon path={"house.png"} />
          House
        </Label>
      </div>
      <div className="">
        <ProgressBarBuilding
          type={"house"}
          cost={cost}
          secsToBuild={secsToBuild}
          popIncrease={10}
        />
      </div>
      <div className="justify-self-center"> {builtAmount}</div>
      <div className="justify-self-center self-center">
        {cost.wood} <Icon path={"wood.png"} width="w-1/6" />/{cost.ironBar}{" "}
        <Icon path={"ironBar.png"} width="w-1/6" />
      </div>
    </>
  );
}

export default House;
