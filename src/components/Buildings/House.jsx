import { useBuildingContext } from "../../context/BuildingContext";
import Icon from "../Icon";
import Label from "../Layout/Label";
import { useMainContext } from "../../context/MainContext";
import ProgressBarBuilding from "../ProgressBarBuilding";
import Cost from "../Cost";

function House({ builtAmount, cost, secsToBuild }) {
  const { state: buildingState } = useBuildingContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();

  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center justify-self-start">
        <Label>
          {" "}
          <Icon path={"house.png"} type="plain" />
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
        <Cost cost={cost} iconType={"plain"} />
      </div>
    </>
  );
}

export default House;
