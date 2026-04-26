import { useEffect } from "react";
import { keyboardMovements } from "../../utils/expeditionHelpers";

import { errorToast } from "../Toast";
import Icon from "../Icon";
import ExpeditionEncounters from "./ExpeditionEncounters";
import { Cost } from "../../utils/costClass";
import ResultScreen from "./ResultScreen";
import { AnimatePresence, motion } from "motion/react";
import { useMainStore } from "../../stores/useMainStore";
import { useArmoryStore } from "../../stores/useArmoryStore";
import { useExpeditionStore } from "../../stores/useExpeditionStore";
const tileSize = 18;
export const gridSize = 31;

function Expedition() {
  const meat = useMainStore((state) => state.resources.meat.amount);
  const loseResource = useMainStore((state) => state.loseResource);
  const equipped = useArmoryStore((state) => state.equipped);
  const grid = useExpeditionStore((state) => state.grid);
  const playerPos = useExpeditionStore((state) => state.playerPos);
  const isExpeditionRunning = useExpeditionStore(
    (state) => state.isExpeditionRunning,
  );
  const player = useExpeditionStore((state) => state.player);
  const meatBrought = useExpeditionStore((state) => state.meatBrought);
  const runEnd = useExpeditionStore((state) => state.runEnd);
  const resultScreen = useExpeditionStore((state) => state.resultScreen);
  const revealAround = useExpeditionStore((state) => state.revealAround);
  const meatSpent = useExpeditionStore((state) => state.meatSpent);
  const setPlayerPos = useExpeditionStore((state) => state.setPlayerPos);
  const maxMeatBrought = useExpeditionStore((state) => state.maxMeatBrought);
  const setMeatBrought = useExpeditionStore((state) => state.setMeatBrought);
  const runStart = useExpeditionStore((state) => state.runStart);
  const playerMoveCounter = useExpeditionStore(
    (state) => state.playerMoveCounter,
  );
  console.log(useExpeditionStore.getState());
  const currentTile = grid[playerPos.row]?.[playerPos.col];
  // const center = Math.floor(gridSize / 2);

  //Effect
  useEffect(() => {
    if (!isExpeditionRunning) return;
    console.log("useeffect");

    if (meatBrought === 0 || player.hp <= 0) {
      console.log("hp sifirlandi veya et bitti");
      runEnd();
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
  }, [isExpeditionRunning, meatBrought, player.hp, runEnd]);
  // console.log(isExpeditionRunning);

  const totalArmor =
    (equipped.head?.armor || 0) +
    (equipped.shoulders?.armor || 0) +
    (equipped.chest?.armor || 0) +
    (equipped.gloves?.armor || 0) +
    (equipped.legs?.armor || 0);
  const totalDamage =
    (equipped.weapon?.damage || 0) + (equipped.enhancement?.multiplier || 0);

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
      {resultScreen && <ResultScreen />}
      <div
        className="grid gap-[2px] bg-game-border p-px rounded-sm shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${gridSize},1fr)`,
          height: "fit-content",
        }}
      >
        {isExpeditionRunning ? (
          grid.flat().map((tile) => {
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
                tile.type === "mediumEnemy" ||
                tile.type === "hardEnemy")
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
                    meatSpent();
                    setPlayerPos({ row: tile.row, col: tile.col });
                    revealAround({ playerPos: playerPos });
                    playerMoveCounter();
                  }
                }}
                style={{ width: tileSize, height: tileSize }}
                //!!!!!!!!!
                //keyboard movement ını şimdilik kaldırıyorum hallet sonra.
                //!!!!!!!!!
                // onKeyDown={(e) => keyboardMovements(e, dispatchExpedition)}
                key={`${tile.row}-${tile.col}`}
                className={`
                   flex items-center rounded-md justify-center text-sm transition-all duration-150
                   ${tileStyle} ${isAdjacent(tile, playerPos) ? "cursor-pointer hover:bg-game-border" : "outline-hidden"}
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
            className="w-146 h-146 rounded-sm bg-game-panel p-10 flex items-center justify-center"
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
                    value={meatBrought}
                    onChange={(e) => setMeatBrought(Number(e.target.value))}
                    max={maxMeatBrought}
                    className="bg-game-monolith border border-game-border text-game-ichor px-3 py-2 w-24 text-center outline-hidden focus:border-game-ichor transition-colors font-bold"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-game-border hover:bg-game-ichor hover:text-game-monolith px-4 py-2 rounded-sm font-bold transition-colors"
                    onClick={() => setMeatBrought(maxMeatBrought)}
                  >
                    MAX
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-col gap-3 bg-game-monolith p-4 rounded-sm border border-game-border">
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
                className="bg-game-ichor text-game-monolith px-4 py-4 rounded-sm font-bold text-xl uppercase tracking-widest shadow-[0_0_15px_rgba(185,255,36,0.2)] hover:shadow-[0_0_25px_rgba(185,255,36,0.6)] hover:scale-[1.02] transition-all"
                onClick={() => {
                  if (meatBrought <= 10) {
                    errorToast("Need at least 10 meat to start expedition");
                    return;
                  }
                  if (meat >= meatBrought) {
                    runStart({
                      dmg: totalDamage,
                      armor: totalArmor,
                    });
                    loseResource({
                      cost: new Cost(0, 0, meatBrought),
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
            <div className="bg-game-panel border border-game-border rounded-sm p-6 shadow-xl">
              <h3 className="text-game-ichor uppercase tracking-widest font-bold mb-6 text-xl border-b border-game-border pb-2">
                Vitals
              </h3>

              <div className="flex flex-col gap-5 text-lg font-bold">
                <div className="flex items-center gap-8">
                  <div className="flex gap-2 items-center justify-center">
                    <Icon path={"meat.png"} type="plain" />
                    <span className="text-gray-400 w-16">Meat</span>
                  </div>
                  <p className="text-game-rust text-xl">{meatBrought}</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex gap-2 items-center justify-center">
                    <Icon path={"hp.png"} type="plain" />
                    <span className="text-gray-400 w-16">HP</span>
                  </div>
                  <p className="text-game-rust  text-xl">{player.hp}</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex gap-2 items-center justify-center">
                    <Icon path={"armor.png"} type="plain" />
                    <span className="text-gray-400 w-16">Armor</span>
                  </div>
                  <p className="text-white  text-xl">{player.armor}</p>
                </div>
              </div>
            </div>

            <div className="bg-game-monolith border border-game-border rounded-sm shadow-inner grow relative overflow-hidden flex flex-col">
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
//         className="grid gap-px bg-game-border p-px rounded-sm shadow-2xl"
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
//                   ${tileStyle} ${isAdjacent(tile, playerPos) ? "cursor-pointer hover:bg-game-border" : "outline-hidden"}
//                 `}
//               >
//                 {isPlayer ? "X" : tile.visible ? tile.icon : ""}
//               </div>
//             );
//           })
//         ) : (
//           /* --- PRE-EXPEDITION START MENU --- */
//           <div className="w-146 h-146 rounded-sm bg-game-panel p-10 flex items-center justify-center">
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
//                     className="bg-game-monolith border border-game-border text-game-ichor px-3 py-2 w-24 text-center outline-hidden focus:border-game-ichor transition-colors font-bold"
//                   />
//                   <button
//                     className="bg-game-border hover:bg-game-ichor hover:text-game-monolith px-4 py-2 rounded-sm font-bold transition-colors"
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

//               <div className="flex flex-col gap-3 bg-game-monolith p-4 rounded-sm border border-game-border">
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
//                 className="bg-game-ichor text-game-monolith px-4 py-4 rounded-sm font-bold text-xl uppercase tracking-widest shadow-[0_0_15px_rgba(185,255,36,0.2)] hover:shadow-[0_0_25px_rgba(185,255,36,0.6)] hover:scale-[1.02] transition-all"
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
//           <div className="bg-game-panel border border-game-border rounded-sm p-6 shadow-xl">
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

//           <div className="bg-game-monolith border border-game-border rounded-sm shadow-inner grow relative overflow-hidden flex flex-col">
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
//         className="grid gap-px bg-game-border p-px rounded-sm shadow-2xl relative z-10"
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
//                   ${tileStyle} ${isAdjacent(tile, playerPos) ? "cursor-pointer hover:bg-game-border" : "outline-hidden"}
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
//             className="w-146 h-146 rounded-sm bg-game-panel p-10 flex items-center justify-center"
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
//                     className="bg-game-monolith border border-game-border text-game-ichor px-3 py-2 w-24 text-center outline-hidden focus:border-game-ichor transition-colors font-bold"
//                   />
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-game-border hover:bg-game-ichor hover:text-game-monolith px-4 py-2 rounded-sm font-bold transition-colors"
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

//               <div className="flex flex-col gap-3 bg-game-monolith p-4 rounded-sm border border-game-border">
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
//                 className="bg-game-ichor text-game-monolith px-4 py-4 rounded-sm font-bold text-xl uppercase tracking-widest shadow-[0_0_15px_rgba(185,255,36,0.2)]"
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
//             <div className="bg-game-panel border border-game-border rounded-sm p-6 shadow-xl">
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

//             <div className="bg-game-monolith border border-game-border rounded-sm shadow-inner grow relative overflow-hidden flex flex-col">
//                <ExpeditionEncounters type={currentTile.type || "empty"} />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
