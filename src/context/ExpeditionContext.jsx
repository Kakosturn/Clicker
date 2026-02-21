import { createContext, useContext, useReducer } from "react";
import {
  gridSize,
  maximumMeatBrought,
  meatUsedPerMovement,
} from "../variables";
import { createGrid } from "../utils/expeditionHelpers";

const ExpeditionContext = createContext();

const initialState = {
  playerPos: {
    row: Math.floor(gridSize / 2),
    col: Math.floor(gridSize / 2),
  },
  // currentTile: {},
  grid: createGrid(gridSize),
  meatBrought: 0,
  maxMeatBrought: maximumMeatBrought,
  meatSpentPerMove: meatUsedPerMovement,
  maxMeatAcquiredFromRefill: 10,
  refillStationMeat: 0,

  gridSize: gridSize,
  isExpeditionRunning: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "runStart":
      return { ...state, isExpeditionRunning: true };
    case "runEnd":
      return { ...state, isExpeditionRunning: false };
    case "setPlayerPos":
      return {
        ...state,
        playerPos: { col: action.payload.col, row: action.payload.row },
      };
    // case "setCurrentTile": {
    //   const { row, col, type } = action.payload;
    //   return {
    //     ...state,
    //     currentTile: { ...state.currentTile, row: row, col: col, type: type },
    //   };
    // }
    // case "currentTileEventComplete": {
    //   return { ...state, currentTile: { ...state.currentTile, type: "empty" } };
    // }
    case "keyboardMovement": {
      const direction = action.payload.direction;
      const newPlayerPos =
        direction === "up"
          ? { col: state.playerPos.col, row: state.playerPos.row - 1 }
          : direction === "left"
            ? { col: state.playerPos.col - 1, row: state.playerPos.row }
            : direction === "right"
              ? { col: state.playerPos.col + 1, row: state.playerPos.row }
              : direction === "down"
                ? { col: state.playerPos.col, row: state.playerPos.row + 1 }
                : { col: state.playerPos.col, row: state.playerPos.row };
      return { ...state, playerPos: newPlayerPos };
    }
    case "meatSpent": {
      const newMeat = state.meatBrought - state.meatSpentPerMove;
      return { ...state, meatBrought: newMeat };
    }
    case "setMeatBrought": {
      return { ...state, meatBrought: action.payload };
    }
    case "setRefillStationMeat": {
      return { ...state, refillStationMeat: action.payload };
    }
    case "meatRefillStationTransfer": {
      return { ...state, meatBrought: state.meatBrought + action.payload };
    }
    case "setGrid": {
      return { ...state, grid: action.payload ? action.payload : createGrid() };
    }
    case "revealAround": {
      const { row, col } = state.playerPos;
      const newGrid = [...state.grid]; // shallow copy outer array

      const positionsToReveal = [
        [row, col],
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
      ];

      for (const [r, c] of positionsToReveal) {
        if (!newGrid[r] || !newGrid[r][c]) continue;

        newGrid[r] = [...newGrid[r]]; // copy only that row
        newGrid[r][c] = {
          ...newGrid[r][c],
          visible: true,
        };
      }

      return {
        ...state,
        grid: newGrid,
      };
    }
    case "finalizeEncounter": {
      const { row, col } = action.payload;

      const newGrid = [...state.grid];
      newGrid[row] = [...newGrid[row]];

      newGrid[row][col] = {
        ...newGrid[row][col],
        type: "empty",
        icon: null,
        explored: true,
      };

      return {
        ...state,
        grid: newGrid,
      };
    }
    // case "revealAround": {
    //   const playerPos = action.payload.playerPos;
    //   console.log(playerPos);
    //   console.log(state.grid);
    //   return {
    //     ...state,
    //     grid: state.grid.map((row) =>
    //       row.map((tile) => {
    //         const isPlayerTile =
    //           tile.row === playerPos.row && tile.col === playerPos.col;

    //         const isAdjacent =
    //           Math.abs(tile.row - playerPos.row) +
    //             Math.abs(tile.col - playerPos.col) ===
    //           1;

    //         if (isPlayerTile || isAdjacent) {
    //           return { ...tile, visible: true };
    //         }
    //         return tile; // leave everything else unchanged
    //         // return { ...tile, visible: true };
    //       }),
    //     ),
    //   };
    // }
    default:
      return { ...state };
  }
}

function ExpeditionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ExpeditionContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpeditionContext.Provider>
  );
}

function useExpeditionContext() {
  const expeditionContext = useContext(ExpeditionContext);

  if (expeditionContext === undefined)
    return new Error("context was used outside of its scope");
  return expeditionContext;
}

export { ExpeditionProvider, useExpeditionContext };
