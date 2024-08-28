//prettier-ignore

import { useMainContext } from "../context/MainContext";
import Wood from "./Resources/Wood/Wood";
import Stone from "./Resources/Stone/Stone";
import Meat from "./Resources/Meat/Meat";
import ArrowsMeat from "./Resources/Meat/ArrowsMeat";
import ArrowsWood from "./Resources/Wood/ArrowsWood";
import ArrowsStone from "./Resources/Stone/ArrowsStone";

function Resources() {
  const { state } = useMainContext();
  const status = state.status;

  return (
    <div className="p-12 border-2 border-[#222] flex flex-col items-center gap-12">
      {/* prettier-ignore */}
      <p className="text-5xl">Resources</p>
      <div className="flex flex-col gap-5 items-center justify-center">
        {status === "beginning/0" && (
          <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
            <Wood />
            <ArrowsWood />
          </div>
        )}

        {status.startsWith("first") && (
          <>
            <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
              <Wood />
              <ArrowsWood />
            </div>
            <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
              <Stone />
              <ArrowsStone />
            </div>
            <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
              <Meat />
              <ArrowsMeat />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Resources;
