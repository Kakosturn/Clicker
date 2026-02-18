import RefillStation from "./RefillStation";

function ExpeditionEncounters({
  type,
  meatBrought,
  setMeatBrought,
  maxMeatToBring,
}) {
  switch (type) {
    case "empty":
      return <div>empty</div>;
    case "treasure":
      return <div>treasure</div>;
    case "smallEnemy":
      return <div>small enemy</div>;
    case "boss":
      return <div>boss</div>;
    case "newElement":
      return <div>new element</div>;
    case "refillStation":
      return (
        <div>
          <RefillStation />
        </div>
      );
    default:
      return <div>empty</div>;
  }
}

export default ExpeditionEncounters;
