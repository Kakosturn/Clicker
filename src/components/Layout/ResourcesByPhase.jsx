import ResourceGridBox from "../ResourceComponents/ResourceGridBox";
import Meat from "../Resources/Meat/Meat";
import Stone from "../Resources/Stone/Stone";
import Wood from "../Resources/Wood/Wood";

function ResourcesByPhase({ phase }) {
  if (phase === "initialPhase")
    return (
      <ResourceGridBox>
        <Wood />
      </ResourceGridBox>
    );
  if (phase === "firstPhase")
    return (
      <>
        <ResourceGridBox>
          <Wood />
        </ResourceGridBox>
        <ResourceGridBox>
          <Stone />
        </ResourceGridBox>
        <ResourceGridBox>
          <Meat />
        </ResourceGridBox>
      </>
    );
  return <div></div>;
}

export default ResourcesByPhase;
