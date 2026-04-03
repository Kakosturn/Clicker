//prettier-ignore
import { useMainContext } from "../context/MainContext";
import Wood from "./Resources/Wood/Wood";
import Stone from "./Resources/Stone/Stone";
import Meat from "./Resources/Meat/Meat";

import IronOre from "./Resources/Iron/IronOre";
import IronBar from "./Resources/Iron/IronBar";

function Resources() {
  const { state } = useMainContext();
  const status = state.status;
  // console.log(status);
  return (
    <div
      className="
        p-8 bg-game-panel border border-game-border
        rounded-sm shadow-2xl flex flex-col gap-[68px] text-lg w-full"
    >
      {/* Header */}
      <p
        className="
        text-3xl font-bold text-game-ichor tracking-wider pb-4 border-b border-game-border"
      >
        Resources
      </p>

      {/* Resource list */}
      <div className="flex flex-col gap-3 w-full">
        {status === "beginning/0" && <Wood />}

        {status === "firstBungalow/1" && (
          <>
            <Wood />
            <Stone />
            <Meat />
          </>
        )}

        {status === "firstHouse" && (
          <>
            <Wood />
            <Stone />
            <Meat />
            <IronOre />
          </>
        )}

        {status === "firstIronBar" && (
          <>
            <Wood />
            <Stone />
            <Meat />
            <IronOre />
            <IronBar />
          </>
        )}
        {status === "firstArsenal" && (
          <>
            <Wood />
            <Stone />
            <Meat />
            <IronOre />
            <IronBar />
          </>
        )}
      </div>
    </div>
  );
}

export default Resources;
