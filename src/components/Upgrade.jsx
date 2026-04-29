import { Tooltip } from "react-tooltip";

import Icon from "./Icon";
import ProgressBarUpgrades from "./ProgressBarUpgrades";
import Cost from "./Cost";
function Upgrade({
  secsToObtain,
  type,
  name,
  path,
  cost,
  tooltip,
  unlocked = true,
}) {
  const objectKeys = Object.keys(cost);

  // console.log(cost);
  // console.log(objectKeys);

  if (!unlocked) {
    return (
      // Added grayscale and opacity-70 to make it feel "inactive", and select-none to prevent highlighting
      <div className="flex text-xl scale-90 gap-12 p-3 opacity-70 grayscale select-none">
        <div className="flex gap-4 items-center justify-center">
          {/* Adds a slight blur to the icon */}
          <div className="blur-[3px] pointer-events-none">
            <Icon path={path} width="w-10" />
          </div>

          <div className="relative flex items-center justify-center">
            {/* Heavy blur on the text. You can keep `{name}` or replace it with "Locked" or "???" */}
            <p className="blur-sm text-gray-400 font-bold tracking-widest">
              {name}
            </p>

            <Tooltip
              id={`tooltip-${name}`} // Use dynamic ID so multiple tooltips don't break
              style={{
                backgroundColor: "#303030",
                color: "rgb(229,231,235)",
                zIndex: "9999",
              }}
            />
            <img
              src="./public/info.png"
              alt="info"
              // Cursor help indicates they can still hover it
              className="absolute w-4 top-5 -left-4"
              data-tooltip-id={`tooltip-${name}`}
              data-tooltip-content={tooltip}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex text-xl scale-90 gap-12 p-3">
      <div className="flex gap-4 items-center justify-center">
        <Icon path={path} width="w-10" />
        <div className="relative flex items-center justify-center">
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
            className="absolute w-4 top-5 -left-4"
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
