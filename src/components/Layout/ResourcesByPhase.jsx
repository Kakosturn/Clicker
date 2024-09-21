import Meat from "../Resources/Meat/Meat";
import Stone from "../Resources/Stone/Stone";
import Wood from "../Resources/Wood/Wood";

function ResourcesByPhase({ phase }) {
  if (phase === "initialPhase")
    return (
      <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
        <Wood />
      </div>
    );
  if (phase === "firstPhase")
    return (
      <>
        <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
          <Wood />
        </div>
        <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
          <Stone />
        </div>
        <div className="grid gap-5 grid-cols-[0.5fr,0.3fr,0.7fr,0.7fr]">
          <Meat />
        </div>
      </>
    );
  return <div></div>;
}

export default ResourcesByPhase;
