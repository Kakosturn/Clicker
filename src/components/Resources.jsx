//prettier-ignore

import { useMainContext } from "../context/MainContext";
import Wood from "./Resources/Wood/Wood";
import Stone from "./Resources/Stone/Stone";
import Meat from "./Resources/Meat/Meat";

import IronOre from "./Resources/Iron/IronOre";

function Resources() {
  const { state } = useMainContext();
  const status = state.status;

  return (
    <div className="p-6 border-2 border-[#222] flex flex-col items-center gap-12">
      {/* prettier-ignore */}
      <p className="text-5xl">Resources</p>
      <div className="flex flex-col gap-5 items-center justify-center">
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
      </div>
    </div>
  );
}

export default Resources;
