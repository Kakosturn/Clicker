//prettier-ignore
import Wood from "./Resources/Wood/Wood";
import Stone from "./Resources/Stone/Stone";
import Meat from "./Resources/Meat/Meat";

import IronOre from "./Resources/Iron/IronOre";
import IronBar from "./Resources/Iron/IronBar";
import { useMainStore } from "../stores/useMainStore";

function Resources() {
  const status = useMainStore((state) => state.status);

  // console.log(status);
  // console.log("resources comp rendered");
  return (
    <div
      className="
        p-8 bg-game-panel border border-game-border
        rounded-xs shadow-2xl flex flex-col gap-17 text-lg w-full"
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
