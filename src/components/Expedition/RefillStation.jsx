import { useExpeditionContext } from "../../context/ExpeditionContext";
import Icon from "../Icon";

function RefillStation() {
  const { state: stateExpedition, dispatch: dispatchExpedition } =
    useExpeditionContext();
  return (
    <div>
      <h1 className="text-4xl text-center p-4">Refill Station</h1>
      <div className="flex gap-2">
        <div className="flex gap-1 items-center justify-center">
          <Icon type="plain" path={"meat.png"} />
          <p>Meat</p>
        </div>
        <input
          type="text"
          value={stateExpedition.refillStationMeat}
          onChange={(e) =>
            dispatchExpedition({
              type: "setRefillStationMeat",
              payload: e.target.value,
            })
          }
          max={stateExpedition.maxMeatAcquiredFromRefill}
          className="bg-zinc-800 w-20"
        />
        <button
          className=""
          onClick={() =>
            dispatchExpedition({
              type: "setRefillStationMeat",
              payload: stateExpedition.maxMeatAcquiredFromRefill,
            })
          }
        >
          Max ({stateExpedition.maxMeatAcquiredFromRefill})
        </button>
      </div>
      <button
        onClick={() => {
          dispatchExpedition({
            type: "finalizeEncounter",
            payload: {
              row: stateExpedition.playerPos.row,
              col: stateExpedition.playerPos.col,
            },
          });
          dispatchExpedition({
            type: "meatRefillStationTransfer",
            payload: stateExpedition.refillStationMeat,
          });
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default RefillStation;
