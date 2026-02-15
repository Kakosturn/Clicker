import { useEffect, useState } from "react";
import { createGrid, keyboardMovements } from "../utils/expeditionHelpers";
import { maxMeatToBring, meatUsedPerMovement } from "../variables";
import { useArmoryContext } from "../context/ArmoryContext";
import { errorToast } from "./Toast";
import Icon from "./Icon";
const tileSize = 16;
export const gridSize = 31;
// function createGrid() {
//   return Array.from({ length: gridSize }, (_, row) =>
//     Array.from({ length: gridSize }, (_, col) => ({
//       row,
//       col,
//       visible: false,
//       type: "empty", // later: "forest", "enemy", "treasure", etc.
//     })),
//   );
// }

function Expedition() {
  const center = Math.floor(gridSize / 2);
  const [grid, setGrid] = useState(createGrid());
  const [meatBrought, setMeatBrought] = useState(0);
  const [playerPos, setPlayerPos] = useState({
    row: center,
    col: center,
  });
  const [isExpeditionRunning, setIsExpeditionRunning] = useState(false);
  const { state: stateArmory } = useArmoryContext();
  useEffect(() => {
    // console.log("ilk useeffect");
    revealAround(playerPos);
    if (meatBrought === 0) setIsExpeditionRunning(false);
  }, [playerPos, meatBrought]);
  useEffect(() => {
    // console.log("ikinci useffect");
    setGrid(createGrid());
    setPlayerPos({
      row: center,
      col: center,
    });
  }, [isExpeditionRunning, center]);
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
  function revealAround(playerPos) {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((tile) => {
          const isPlayerTile =
            tile.row === playerPos.row && tile.col === playerPos.col;

          const isAdjacent =
            Math.abs(tile.row - playerPos.row) +
              Math.abs(tile.col - playerPos.col) ===
            1;

          if (isPlayerTile || isAdjacent) {
            return { ...tile, visible: true };
          }
          return tile; // leave everything else unchanged
          // return { ...tile, visible: true };
        }),
      ),
    );
  }
  return (
    <div
      className="flex p-6 bg-gradient-to-br from-orange-950 to-[#1b0c05]
    border border-orange-900"
    >
      <div
        className="grid gap-1 bg-orange-950"
        style={{ gridTemplateColumns: `repeat(${gridSize},1fr)` }}
      >
        {isExpeditionRunning ? (
          grid.flat().map((tile) => {
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
                    setPlayerPos((prev) => {
                      const newPos = { ...prev, row: tile.row, col: tile.col };
                      setMeatBrought((prev) => prev - meatUsedPerMovement);

                      return newPos;
                    });
                  }
                }}
                style={{ width: tileSize, height: tileSize }}
                onKeyDown={(e) => keyboardMovements(e, setPlayerPos)}
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
                  value={meatBrought}
                  onChange={(e) => setMeatBrought(e.target.value)}
                  max={maxMeatToBring}
                  className="bg-zinc-800 w-20"
                />
                <button
                  className=""
                  onClick={() => setMeatBrought(maxMeatToBring)}
                >
                  Max
                </button>
              </div>
              <div>
                <p>Damage : {totalDamage}</p>
                <p>Armor : {totalArmor}</p>
              </div>
              <button
                className="bg-zinc-700 px-2 py-4 rounded w-fit"
                onClick={() => {
                  if (meatBrought <= 10) {
                    errorToast("Need at least 10 meat to start expedition");
                    return;
                  }
                  setIsExpeditionRunning((prev) => !prev);
                }}
              >
                Start Expedition
              </button>
            </div>
          </div>
        )}
      </div>
      {isExpeditionRunning && (
        <div className=" pl-12 h-full">
          <p>Meat Remaining</p>
          <div className="flex gap-3">
            <Icon path={"meat.png"} type="plain" />
            <p>{meatBrought}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expedition;
