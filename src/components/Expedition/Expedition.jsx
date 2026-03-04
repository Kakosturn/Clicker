import { useEffect, useState } from "react";
import { keyboardMovements } from "../../utils/expeditionHelpers";

import { useArmoryContext } from "../../context/ArmoryContext";
import { errorToast } from "../Toast";
import Icon from "../Icon";
import ExpeditionEncounters from "./ExpeditionEncounters";
import { useMainContext } from "../../context/MainContext";
import { Cost } from "../../context/MainContext";
import { useExpeditionContext } from "../../context/ExpeditionContext";
import ResultScreen from "./ResultScreen";
import { AnimatePresence, motion } from "motion/react";
const tileSize = 18;
export const gridSize = 31;

function Expedition() {
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
  // const center = Math.floor(gridSize / 2);

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
      className="flex p-6 relative bg-game-monolith text-gray-300 font-sans tracking-wide
    border border-orange-900"
    >
      {stateExpedition.resultScreen && <ResultScreen />}
      <div
        className="grid gap-[2px] bg-game-border p-[1px] rounded shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${gridSize},1fr)`,
          height: "fit-content",
        }}
      >
        {isExpeditionRunning ? (
          stateExpedition.grid.flat().map((tile) => {
            const isPlayer =
              tile.row === playerPos.row && tile.col === playerPos.col;

            let tileStyle = "bg-game-monolith text-transparent"; // fog

            if (tile.visible) tileStyle = "bg-game-panel text-gray-500"; // revealed area
            // if (tile.visited && !tile.visible) bg = "bg-zinc-900"; // seen before
            if (isPlayer) tileStyle = "bg-orange-500"; // player
            if (
              tile.visible &&
              (tile.type === "smallEnemy" ||
                tile.type === "boss" ||
                tile.type === "mediumEnemy")
            ) {
              tileStyle =
                "bg-game-panel text-game-rust drop-shadow-[0_0_5px_rgba(215,58,74,0.8)]";
            }
            if (
              tile.visible &&
              (tile.type === "treasure" || tile.type === "newElement")
            ) {
              tileStyle =
                "bg-game-panel text-game-ichor drop-shadow-[0_0_5px_rgba(185,255,36,0.8)]";
            }
            if (isPlayer) {
              tileStyle =
                "bg-game-ichor text-game-monolith shadow-[0_0_12px_rgba(185,255,36,0.5)] z-10 font-bold";
            }
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
                   flex items-center rounded-md justify-center text-sm transition-all duration-150
                   ${tileStyle} ${isAdjacent(tile, playerPos) ? "cursor-pointer hover:bg-game-border" : "outline-none"}
                 `}
              >
                {isPlayer ? "🧍" : tile.visible ? tile.icon : ""}
              </div>
            );
          })
        ) : (
          /* --- PRE-EXPEDITION START MENU (ANIMATED) --- */
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-[36.5rem] h-[36.5rem] rounded bg-game-panel p-10 flex items-center justify-center"
          >
            <div className="flex flex-col gap-10 w-full max-w-sm">
              <h2 className="text-3xl font-bold tracking-widest text-game-ichor uppercase border-b border-game-border pb-4">
                Prepare
              </h2>
              <div className="flex gap-2 items-center justify-between">
                <p className="text-lg tracking-wider text-gray-400">
                  Meat Cost:
                </p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={stateExpedition.meatBrought}
                    onChange={(e) =>
                      dispatchExpedition({
                        type: "setMeatBrought",
                        payload: Number(e.target.value),
                      })
                    }
                    max={stateExpedition.maxMeatBrought}
                    className="bg-game-monolith border border-game-border text-game-ichor px-3 py-2 w-24 text-center outline-none focus:border-game-ichor transition-colors font-bold"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-game-border hover:bg-game-ichor hover:text-game-monolith px-4 py-2 rounded font-bold transition-colors"
                    onClick={() =>
                      dispatchExpedition({
                        type: "setMeatBrought",
                        payload: stateExpedition.maxMeatBrought,
                      })
                    }
                  >
                    MAX
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-col gap-3 bg-game-monolith p-4 rounded border border-game-border">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400 tracking-wider">
                    Total Damage
                  </span>
                  <span className="font-bold text-white">{totalDamage}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400 tracking-wider">
                    Total Armor
                  </span>
                  <span className="font-bold text-white">{totalArmor}</span>
                </div>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 0px 25px rgba(185,255,36,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-game-ichor text-game-monolith px-4 py-4 rounded font-bold text-xl uppercase tracking-widest shadow-[0_0_15px_rgba(185,255,36,0.2)] hover:shadow-[0_0_25px_rgba(185,255,36,0.6)] hover:scale-[1.02] transition-all"
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
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isExpeditionRunning && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="pl-8 w-full flex flex-col gap-6"
          >
            <div className="bg-game-panel border border-game-border rounded p-6 shadow-xl">
              <h3 className="text-game-ichor uppercase tracking-widest font-bold mb-6 text-xl border-b border-game-border pb-2">
                Vitals
              </h3>

              <div className="flex flex-col gap-5 text-lg font-bold">
                <div className="flex items-center gap-8">
                  <div className="flex gap-2 items-center justify-center">
                    <Icon path={"meat.png"} type="plain" />
                    <span className="text-gray-400 w-16">Meat</span>
                  </div>
                  <p className="text-game-rust text-xl">
                    {stateExpedition.meatBrought}
                  </p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex gap-2 items-center justify-center">
                    <Icon path={"hp.png"} type="plain" />
                    <span className="text-gray-400 w-16">HP</span>
                  </div>
                  <p className="text-game-rust  text-xl">
                    {stateExpedition.player.hp}
                  </p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex gap-2 items-center justify-center">
                    <Icon path={"armor.png"} type="plain" />
                    <span className="text-gray-400 w-16">Armor</span>
                  </div>
                  <p className="text-white  text-xl">
                    {stateExpedition.player.armor}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-game-monolith border border-game-border rounded shadow-inner flex-grow relative overflow-hidden flex flex-col">
              <ExpeditionEncounters type={currentTile.type || "empty"} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Expedition;

// return (
//     <div className="flex p-6 relative bg-game-monolith min-h-screen text-gray-300 font-sans tracking-wide">
//       {stateExpedition.resultScreen && <ResultScreen />}

//       <div
//         className="grid gap-[1px] bg-game-border p-[1px] rounded shadow-2xl"
//         style={{ gridTemplateColumns: `repeat(${gridSize},1fr)`, height: "fit-content" }}
//       >
//         {isExpeditionRunning ? (
//           stateExpedition.grid.flat().map((tile) => {
//             const isPlayer = tile.row === playerPos.row && tile.col === playerPos.col;

//             // Default: The unexplored void
//             let tileStyle = "bg-game-monolith text-transparent";

//             // Revealed tiles
//             if (tile.visible) {
//               tileStyle = "bg-game-panel text-gray-500";
//             }

//             // Danger / Biological (Enemies, Bosses)
//             if (tile.visible && (tile.type === "smallEnemy" || tile.type === "boss" || tile.type === "mediumEnemy")) {
//               tileStyle = "bg-game-panel text-game-rust drop-shadow-[0_0_5px_rgba(215,58,74,0.8)]";
//             }

//             // Alien / High Value (Treasure, New Elements)
//             if (tile.visible && (tile.type === "treasure" || tile.type === "newElement")) {
//               tileStyle = "bg-game-panel text-game-ichor drop-shadow-[0_0_5px_rgba(185,255,36,0.8)]";
//             }

//             // The Player (Brightest element on the board)
//             if (isPlayer) {
//               tileStyle = "bg-game-ichor text-game-monolith shadow-[0_0_12px_rgba(185,255,36,0.5)] z-10 font-bold";
//             }

//             return (
//               <div
//                 tabIndex={0}
//                 onClick={() => {
//                   if (isAdjacent(tile, playerPos)) {
//                     dispatchExpedition({ type: "meatSpent" });
//                     dispatchExpedition({
//                       type: "setPlayerPos",
//                       payload: { row: tile.row, col: tile.col },
//                     });
//                     dispatchExpedition({
//                       type: "revealAround",
//                       payload: { playerPos: playerPos },
//                     });
//                   }
//                 }}
//                 style={{ width: tileSize, height: tileSize }}
//                 onKeyDown={(e) => keyboardMovements(e, dispatchExpedition)}
//                 key={`${tile.row}-${tile.col}`}
//                 className={`
//                   flex items-center justify-center text-sm transition-all duration-150
//                   ${tileStyle} ${isAdjacent(tile, playerPos) ? "cursor-pointer hover:bg-game-border" : "outline-none"}
//                 `}
//               >
//                 {isPlayer ? "X" : tile.visible ? tile.icon : ""}
//               </div>
//             );
//           })
//         ) : (
//           /* --- PRE-EXPEDITION START MENU --- */
//           <div className="w-[36.5rem] h-[36.5rem] rounded bg-game-panel p-10 flex items-center justify-center">
//             <div className="flex flex-col gap-10 w-full max-w-sm">
//               <h2 className="text-3xl font-bold tracking-widest text-game-ichor uppercase border-b border-game-border pb-4">
//                 Prepare
//               </h2>

//               <div className="flex items-center justify-between gap-4">
//                 <p className="text-lg uppercase tracking-wider text-gray-400">Meat Cost:</p>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     value={stateExpedition.meatBrought}
//                     onChange={(e) =>
//                       dispatchExpedition({
//                         type: "setMeatBrought",
//                         payload: Number(e.target.value),
//                       })
//                     }
//                     max={stateExpedition.maxMeatBrought}
//                     className="bg-game-monolith border border-game-border text-game-ichor px-3 py-2 w-24 text-center outline-none focus:border-game-ichor transition-colors font-bold"
//                   />
//                   <button
//                     className="bg-game-border hover:bg-game-ichor hover:text-game-monolith px-4 py-2 rounded font-bold transition-colors"
//                     onClick={() =>
//                       dispatchExpedition({
//                         type: "setMeatBrought",
//                         payload: stateExpedition.maxMeatBrought,
//                       })
//                     }
//                   >
//                     MAX
//                   </button>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-3 bg-game-monolith p-4 rounded border border-game-border">
//                 <div className="flex justify-between text-lg">
//                   <span className="text-gray-400 uppercase tracking-wider">Total Damage</span>
//                   <span className="font-bold text-white">{totalDamage}</span>
//                 </div>
//                 <div className="flex justify-between text-lg">
//                   <span className="text-gray-400 uppercase tracking-wider">Total Armor</span>
//                   <span className="font-bold text-white">{totalArmor}</span>
//                 </div>
//               </div>

//               <button
//                 className="bg-game-ichor text-game-monolith px-4 py-4 rounded font-bold text-xl uppercase tracking-widest shadow-[0_0_15px_rgba(185,255,36,0.2)] hover:shadow-[0_0_25px_rgba(185,255,36,0.6)] hover:scale-[1.02] transition-all"
//                 onClick={() => {
//                   if (stateExpedition.meatBrought <= 10) {
//                     errorToast("Need at least 10 meat to start expedition");
//                     return;
//                   }
//                   if (stateMain.resources.meat.amount >= stateExpedition.meatBrought) {
//                     dispatchExpedition({
//                       type: "runStart",
//                       payload: { dmg: totalDamage, armor: totalArmor },
//                     });
//                     dispatchMain({
//                       type: "loseResource",
//                       payload: {
//                         cost: new Cost(0, 0, stateExpedition.meatBrought),
//                       },
//                     });
//                   } else errorToast("Not enough meat");
//                 }}
//               >
//                 Initialize
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- RIGHT SIDE STATS & ENCOUNTER PANEL --- */}
//       {isExpeditionRunning && (
//         <div className="pl-8 w-96 flex flex-col gap-6">
//           <div className="bg-game-panel border border-game-border rounded p-6 shadow-xl">
//             <h3 className="text-game-ichor uppercase tracking-widest font-bold mb-6 text-xl border-b border-game-border pb-2">
//               Vitals
//             </h3>

//             <div className="flex flex-col gap-5 text-lg font-bold">
//               <div className="flex items-center gap-4">
//                 <Icon path={"meat.png"} type="plain" />
//                 <span className="text-gray-400 w-16">MEAT</span>
//                 <p className="text-game-rust ml-auto text-xl">{stateExpedition.meatBrought}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Icon path={"hp.png"} type="plain" />
//                 <span className="text-gray-400 w-16">HP</span>
//                 <p className="text-game-rust ml-auto text-xl">{stateExpedition.player.hp}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Icon path={"armor.png"} type="plain" />
//                 <span className="text-gray-400 w-16">ARMOR</span>
//                 <p className="text-white ml-auto text-xl">{stateExpedition.player.armor}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-game-monolith border border-game-border rounded shadow-inner flex-grow relative overflow-hidden flex flex-col">
//              <ExpeditionEncounters type={currentTile.type || "empty"} />
//           </div>
//         </div>
//       )}
//     </div>
//   );

// return (
//     <div className="flex p-6 relative bg-game-monolith min-h-screen text-gray-300 font-sans tracking-wide overflow-hidden">
//       {stateExpedition.resultScreen && <ResultScreen />}

//       <div
//         className="grid gap-[1px] bg-game-border p-[1px] rounded shadow-2xl relative z-10"
//         style={{ gridTemplateColumns: `repeat(${gridSize},1fr)`, height: "fit-content" }}
//       >
//         {isExpeditionRunning ? (
//           stateExpedition.grid.flat().map((tile) => {
//             const isPlayer = tile.row === playerPos.row && tile.col === playerPos.col;

//             let tileStyle = "bg-game-monolith text-transparent";

//             if (tile.visible) {
//               tileStyle = "bg-game-panel text-gray-500";
//             }

//             if (tile.visible && (tile.type === "smallEnemy" || tile.type === "boss" || tile.type === "mediumEnemy")) {
//               tileStyle = "bg-game-panel text-game-rust drop-shadow-[0_0_5px_rgba(215,58,74,0.8)]";
//             }

//             if (tile.visible && (tile.type === "treasure" || tile.type === "newElement")) {
//               tileStyle = "bg-game-panel text-game-ichor drop-shadow-[0_0_5px_rgba(185,255,36,0.8)]";
//             }

//             if (isPlayer) {
//               tileStyle = "bg-game-ichor text-game-monolith shadow-[0_0_12px_rgba(185,255,36,0.5)] z-20 font-bold";
//             }

//             return (
//               <div
//                 tabIndex={0}
//                 onClick={() => {
//                   if (isAdjacent(tile, playerPos)) {
//                     dispatchExpedition({ type: "meatSpent" });
//                     dispatchExpedition({
//                       type: "setPlayerPos",
//                       payload: { row: tile.row, col: tile.col },
//                     });
//                     dispatchExpedition({
//                       type: "revealAround",
//                       payload: { playerPos: playerPos },
//                     });
//                   }
//                 }}
//                 style={{ width: tileSize, height: tileSize }}
//                 onKeyDown={(e) => keyboardMovements(e, dispatchExpedition)}
//                 key={`${tile.row}-${tile.col}`}
//                 className={`
//                   flex items-center justify-center text-sm transition-colors duration-150
//                   ${tileStyle} ${isAdjacent(tile, playerPos) ? "cursor-pointer hover:bg-game-border" : "outline-none"}
//                 `}
//               >
//                 {isPlayer ? "X" : tile.visible ? tile.icon : ""}
//               </div>
//             );
//           })
//         ) : (
//           /* --- PRE-EXPEDITION START MENU (ANIMATED) --- */
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="w-[36.5rem] h-[36.5rem] rounded bg-game-panel p-10 flex items-center justify-center"
//           >
//             <div className="flex flex-col gap-10 w-full max-w-sm">
//               <h2 className="text-3xl font-bold tracking-widest text-game-ichor uppercase border-b border-game-border pb-4">
//                 Prepare
//               </h2>

//               <div className="flex items-center justify-between gap-4">
//                 <p className="text-lg uppercase tracking-wider text-gray-400">Meat Cost:</p>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     value={stateExpedition.meatBrought}
//                     onChange={(e) =>
//                       dispatchExpedition({
//                         type: "setMeatBrought",
//                         payload: Number(e.target.value),
//                       })
//                     }
//                     max={stateExpedition.maxMeatBrought}
//                     className="bg-game-monolith border border-game-border text-game-ichor px-3 py-2 w-24 text-center outline-none focus:border-game-ichor transition-colors font-bold"
//                   />
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-game-border hover:bg-game-ichor hover:text-game-monolith px-4 py-2 rounded font-bold transition-colors"
//                     onClick={() =>
//                       dispatchExpedition({
//                         type: "setMeatBrought",
//                         payload: stateExpedition.maxMeatBrought,
//                       })
//                     }
//                   >
//                     MAX
//                   </motion.button>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-3 bg-game-monolith p-4 rounded border border-game-border">
//                 <div className="flex justify-between text-lg">
//                   <span className="text-gray-400 uppercase tracking-wider">Total Damage</span>
//                   <span className="font-bold text-white">{totalDamage}</span>
//                 </div>
//                 <div className="flex justify-between text-lg">
//                   <span className="text-gray-400 uppercase tracking-wider">Total Armor</span>
//                   <span className="font-bold text-white">{totalArmor}</span>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02, boxShadow: "0px 0px 25px rgba(185,255,36,0.4)" }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-game-ichor text-game-monolith px-4 py-4 rounded font-bold text-xl uppercase tracking-widest shadow-[0_0_15px_rgba(185,255,36,0.2)]"
//                 onClick={() => {
//                   if (stateExpedition.meatBrought <= 10) {
//                     errorToast("Need at least 10 meat to start expedition");
//                     return;
//                   }
//                   if (stateMain.resources.meat.amount >= stateExpedition.meatBrought) {
//                     dispatchExpedition({
//                       type: "runStart",
//                       payload: { dmg: totalDamage, armor: totalArmor },
//                     });
//                     dispatchMain({
//                       type: "loseResource",
//                       payload: {
//                         cost: new Cost(0, 0, stateExpedition.meatBrought),
//                       },
//                     });
//                   } else errorToast("Not enough meat");
//                 }}
//               >
//                 Initialize
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </div>

//       {/* --- RIGHT SIDE STATS & ENCOUNTER PANEL (ANIMATED) --- */}
//       <AnimatePresence>
//         {isExpeditionRunning && (
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             transition={{ type: "spring", stiffness: 120, damping: 15 }}
//             className="pl-8 w-96 flex flex-col gap-6"
//           >
//             <div className="bg-game-panel border border-game-border rounded p-6 shadow-xl">
//               <h3 className="text-game-ichor uppercase tracking-widest font-bold mb-6 text-xl border-b border-game-border pb-2">
//                 Vitals
//               </h3>

//               <div className="flex flex-col gap-5 text-lg font-bold">
//                 <div className="flex items-center gap-4">
//                   <Icon path={"meat.png"} type="plain" />
//                   <span className="text-gray-400 w-16">MEAT</span>
//                   <p className="text-game-rust ml-auto text-xl">{stateExpedition.meatBrought}</p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Icon path={"hp.png"} type="plain" />
//                   <span className="text-gray-400 w-16">HP</span>
//                   <motion.p
//                     key={stateExpedition.player.hp} // Forces a quick re-render animation when HP drops
//                     initial={{ scale: 1.2, color: "#D73A4A" }}
//                     animate={{ scale: 1, color: "#D73A4A" }}
//                     className="ml-auto text-xl"
//                   >
//                     {stateExpedition.player.hp}
//                   </motion.p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Icon path={"armor.png"} type="plain" />
//                   <span className="text-gray-400 w-16">ARMOR</span>
//                   <p className="text-white ml-auto text-xl">{stateExpedition.player.armor}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-game-monolith border border-game-border rounded shadow-inner flex-grow relative overflow-hidden flex flex-col">
//                <ExpeditionEncounters type={currentTile.type || "empty"} />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
