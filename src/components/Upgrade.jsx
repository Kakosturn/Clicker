import { Tooltip } from "react-tooltip";

import Icon from "./Icon";
import ProgressBarUpgrades from "./ProgressBarUpgrades";
import Cost from "./Cost";
function Upgrade({ secsToObtain, type, name, path, cost, tooltip }) {
  const objectKeys = Object.keys(cost);
  // console.log(cost);
  // console.log(objectKeys);
  return (
    <div className="flex scale-90 gap-12 p-3">
      <div className="flex gap-2">
        <Icon path={path} width="w-10" />
        <div className="relative">
          <p>{name}</p>
          <Tooltip
            id="tooltip-1"
            style={{
              backgroundColor: "#303030",
              color: "rgb(229,231,235)",
              zIndex: "9999",
            }}
          />
          <img
            src="./public/info.png"
            alt=""
            className="absolute w-4 top-3/4 left-full"
            data-tooltip-id="tooltip-1"
            data-tooltip-content={tooltip}
          />
        </div>
      </div>
      <ProgressBarUpgrades
        secsToObtain={secsToObtain}
        type={type}
        cost={cost}
      />
      <div>
        {objectKeys.map((el, i) =>
          cost[el] > 0 ? (
            <span key={i}>
              {/* {" "}
              {cost[el]} <Icon type="plain" path={`${el}.png`} /> */}
              <Cost cost={cost} iconType={"plain"} />
            </span>
          ) : (
            <span key={i}></span>
          ),
        )}
      </div>
    </div>
  );
}
// {costIdentifier} <Icon path={costIcon} />
export default Upgrade;
