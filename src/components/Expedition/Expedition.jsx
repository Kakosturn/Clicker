import { useEffect, useState } from "react";
import { createGrid, keyboardMovements } from "../../utils/expeditionHelpers";
import { maxMeatToBring, meatUsedPerMovement } from "../../variables";
import { useArmoryContext } from "../../context/ArmoryContext";
import { errorToast } from "../Toast";
import Icon from "../Icon";
import ExpeditionEncounters from "./ExpeditionEncounters";
import { useMainContext } from "../../context/MainContext";
import { Cost } from "../../context/MainContext";
import { useExpeditionContext } from "../../context/ExpeditionContext";
import ResultScreen from "./ResultScreen";
const tileSize = 16;
export const gridSize = 31;

function Expedition() {
  const center = Math.floor(gridSize / 2);

  const { state: stateArmory } = useArmoryContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: stateExpedition, dispatch: dispatchExpedition } =
    useExpeditionContext();
  const playerPos = stateExpedition.playerPos;
  const isExpeditionRunning = stateExpedition.isExpeditionRunning;
  const currentTile =
    stateExpedition.grid[stateExpedition.playerPos.row]?.[
      stateExpedition.playerPos.col
    ];

  //Effect
  useEffect(() => {
    if (!isExpeditionRunning) return;
    console.log("useeffect");

    if (stateExpedition.meatBrought === 0 || stateExpedition.player.hp <= 0) {
      console.log("hp sifirlandi veya et bitti");
      dispatchExpedition({ type: "runEnd" });
    }
    //
    //BU İKİ DİSPATCH TE YAPTIĞIMI ŞUAN CONTEXT TEKİ CASE TE YAPIYORUM,
    //VALİDATİON LAR CHECKLER KARIŞTI ŞİMDİLİK KALSIN BURDA
    //
    // dispatchExpedition({ type: "setGrid", payload: createGrid() });
    // dispatchExpedition({
    //   type: "setPlayerPos",
    //   payload: { col: center, row: center },
    // });
  }, [
    dispatchExpedition,
    stateExpedition.meatBrought,
    stateExpedition.player.hp,
    isExpeditionRunning,
  ]);
  // console.log(isExpeditionRunning);

  const totalArmor =
    (stateArmory.equipped.head?.armor || 0) +
    (stateArmory.equipped.shoulders?.armor || 0) +
    (stateArmory.equipped.chest?.armor || 0) +
    (stateArmory.equipped.gloves?.armor || 0) +
    (stateArmory.equipped.legs?.armor || 0);
  const totalDamage =
    (stateArmory.equipped.weapon?.damage || 0) +
    (stateArmory.equipped.enhancement?.multiplier || 0);

  function isAdjacent(tile, posPlayer) {
    const rowDiff = Math.abs(tile.row - posPlayer.row);
    const colDiff = Math.abs(tile.col - posPlayer.col);
    return rowDiff + colDiff === 1;
  }

  return (
    <div
      className="flex p-6 relative bg-gradient-to-br from-orange-950 to-[#1b0c05]
    border border-orange-900"
    >
      {stateExpedition.resultScreen && <ResultScreen />}
      <div
        className="grid gap-1 bg-orange-950"
        style={{ gridTemplateColumns: `repeat(${gridSize},1fr)` }}
      >
        {isExpeditionRunning ? (
          stateExpedition.grid.flat().map((tile) => {
            const isPlayer =
              tile.row === playerPos.row && tile.col === playerPos.col;

            let bg = "bg-black"; // fog

            if (tile.visible) bg = "bg-zinc-400"; // revealed area
            // if (tile.visited && !tile.visible) bg = "bg-zinc-900"; // seen before
            if (isPlayer) bg = "bg-orange-500"; // player

            return (
              <div
                tabIndex={0}
                onClick={() => {
                  if (isAdjacent(tile, playerPos)) {
                    dispatchExpedition({ type: "meatSpent" });
                    dispatchExpedition({
                      type: "setPlayerPos",
                      payload: { row: tile.row, col: tile.col },
                    });
                    dispatchExpedition({
                      type: "revealAround",
                      payload: { playerPos: playerPos },
                    });
                  }
                }}
                style={{ width: tileSize, height: tileSize }}
                onKeyDown={(e) => keyboardMovements(e, dispatchExpedition)}
                key={`${tile.row}-${tile.col}`}
                className={`
                 rounded border text-sm border-zinc-700 ${isPlayer && "bg-orange-500"} ${bg}
                `}
              >
                {isPlayer ? "🧍" : tile.icon}
              </div>
            );
          })
        ) : (
          <div className="w-[36.5rem] h-[36.5rem] rounded bg-zinc-900 p-8">
            <div className="flex flex-col gap-8">
              <div className="flex gap-2">
                <p>Meat :</p>
                <input
                  type="text"
                  value={stateExpedition.meatBrought}
                  onChange={(e) =>
                    dispatchExpedition({
                      type: "setMeatBrought",
                      payload: e.target.value,
                    })
                  }
                  max={stateExpedition.maxMeatBrought}
                  className="bg-zinc-800 w-20"
                />
                <button
                  className=""
                  onClick={() =>
                    dispatchExpedition({
                      type: "setMeatBrought",
                      payload: stateExpedition.maxMeatBrought,
                    })
                  }
                >
                  Max
                </button>
              </div>
              <div>
                <p>Damage : {totalDamage}</p>
                <p>Armor : {totalArmor}</p>
              </div>
              <button
                className="bg-orange-700 px-2 py-4 rounded w-fit"
                onClick={() => {
                  if (stateExpedition.meatBrought <= 10) {
                    errorToast("Need at least 10 meat to start expedition");
                    return;
                  }
                  if (
                    stateMain.resources.meat.amount >=
                    stateExpedition.meatBrought
                  ) {
                    dispatchExpedition({
                      type: "runStart",
                      payload: { dmg: totalDamage, armor: totalArmor },
                    });
                    dispatchMain({
                      type: "loseResource",
                      payload: {
                        cost: new Cost(0, 0, stateExpedition.meatBrought),
                      },
                    });
                  } else errorToast("Not enough meat");
                }}
              >
                Start Expedition
              </button>
            </div>
          </div>
        )}
      </div>
      {isExpeditionRunning && (
        <div className="pl-12 h-[40rem] w-full flex flex-col">
          <div className="h-[20rem] bg-zinc-900">
            <p>Stats</p>
            <div className="flex gap-3">
              <Icon path={"meat.png"} type="plain" />
              <p>{stateExpedition.meatBrought}</p>
            </div>
            <div className="flex gap-3">
              <Icon path={"hp.png"} type="plain" />
              <p>{stateExpedition.player.hp}</p>
            </div>
            <div className="flex gap-3">
              <Icon path={"armor.png"} type="plain" />
              <p>{stateExpedition.player.armor}</p>
            </div>
          </div>
          <div className="bg-zinc-950 border border-orange-700 h-[20rem] w-full">
            <ExpeditionEncounters type={currentTile.type || "empty"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Expedition;
