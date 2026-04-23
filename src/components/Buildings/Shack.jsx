import Icon from "../Icon";
import Label from "../Layout/Label";
import ProgressBarBuilding from "../ProgressBarBuilding";
import Cost from "../Cost";
import { popIncreaseShack } from "../../variables";

function Shack({ builtAmount, cost, secsToBuild }) {
  // console.log(cost);
  //console.log(new Cost(buildingState.costShack));
  return (
    <div className="grid grid-cols-4 items-center gap-4 px-5 py-3 bg-game-monolith border border-game-border rounded-xs hover:border-gray-600 transition-colors group">
      {/* Col 1: Icon & Name */}
      <div className="flex items-center justify-self-start">
        <Label>
          <Icon path={"shack.png"} type="plain" />
          <span className="text-gray-200">Shack</span>
        </Label>
      </div>

      {/* Col 2: Build Action */}
      <div className="w-full max-w-[160px] justify-self-center">
        <ProgressBarBuilding
          type={"shack"}
          cost={cost}
          secsToBuild={secsToBuild}
          popIncrease={popIncreaseShack}
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

export default Shack;
