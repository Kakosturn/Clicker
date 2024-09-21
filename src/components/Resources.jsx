//prettier-ignore

import { useMainContext } from "../context/MainContext";
import Wood from "./Resources/Wood/Wood";
import Stone from "./Resources/Stone/Stone";
import Meat from "./Resources/Meat/Meat";

import ResourcesByPhase from "./Layout/ResourcesByPhase";

function Resources() {
  const { state } = useMainContext();
  const status = state.status;

  return (
    <div className="p-12 border-2 border-[#222] flex flex-col items-center gap-12">
      {/* prettier-ignore */}
      <p className="text-5xl">Resources</p>
      <div className="flex flex-col gap-5 items-center justify-center">
        {status === "beginning/0" && (
          <ResourcesByPhase phase={"initialPhase"} />
        )}

        {status.startsWith("first") && (
          <ResourcesByPhase phase={"firstPhase"} />
        )}
      </div>
    </div>
  );
}

export default Resources;
