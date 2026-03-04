import { createContext, useContext, useReducer } from "react";
import {
  gridSize,
  maxHp,
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
  player: {
    hp: maxHp,
    armor: 0,
    dmg: 0,
  },
  battle: {
    isActive: false,
    result: null,
  },
  currentEnemy: null,
  gridSize: gridSize,
  isExpeditionRunning: false,
  resultScreen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "runStart": {
      const { armor, dmg } = action.payload;
      return {
        ...state,
        isExpeditionRunning: true,
        player: { ...state.player, armor: armor, dmg: dmg },
      };
    }
    case "runEnd": {
      console.log("run end case i");
      return {
        ...state,
        isExpeditionRunning: false,
        resultScreen: true,
        grid: createGrid(),
        playerPos: {
          row: Math.floor(gridSize / 2),
          col: Math.floor(gridSize / 2),
        },
        player: {
          ...state.player,
          hp: maxHp,
        },
      };
    }
    case "battleStart": {
      return { ...state, battle: { ...state.battle, isActive: true } };
    }
    case "battleEnd": {
      return { ...state, battle: { ...state.battle, isActive: false } };
    }
    case "closeResults": {
      return { ...state, resultScreen: false };
    }
    case "setPlayerPos": {
      const col = action.payload.col;
      const row = action.payload.row;
      const newPos = { col: col, row: row };
      const currentTile = state.grid[row]?.[col];

      return {
        ...state,
        playerPos: newPos,
        currentEnemy: currentTile.type.includes("Enemy")
          ? {
              ...state.currentEnemy,
              enemyType: currentTile.type,
              hp: currentTile.hp,
              dmg: currentTile.dmg,
              armor: currentTile.armor,
            }
          : null,
      };
    }

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
      // const runGoes = newMeat > 0;
      return {
        ...state,
        meatBrought: newMeat,
        // isExpeditionRunning: runGoes,
        // resultScreen: !runGoes,
      };
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
      console.log("finalizeEncounter case i");
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
        currentEnemy: null,
        battle: { result: null },
      };
    }
    // case "setCurrentEnemy": {
    //   const tile = action.payload;
    //   console.log(tile);
    //   return {
    //     ...state,
    //     currentEnemy: {
    //       ...state.currentEnemy,
    //       enemyType: tile.type,
    //       hp: tile.hp,
    //       dmg: tile.dmg,
    //       armor: tile.armor,
    //     },
    //   };
    // }
    case "attack": {
      const dmg = action.payload.dmg;
      // console.log(state.currentEnemy);
      // console.log(dmg);

      if (dmg < state.currentEnemy.armor) {
        return {
          ...state,
          currentEnemy: {
            ...state.currentEnemy,
            armor: state.currentEnemy.armor - dmg,
          },
        };
      }
      if (dmg - state.currentEnemy.armor > 0) {
        const dmgToArmor = state.currentEnemy.armor;
        const dmgToHp = dmg - state.currentEnemy.armor;
        const newHp = state.currentEnemy.hp - dmgToHp;
        console.log(newHp);
        if (newHp <= 0) {
          return {
            ...state,
            currentEnemy: { ...state.currentEnemy, hp: 0 },
            battle: { isActive: false, result: "win" },
          };
        }
        return {
          ...state,
          currentEnemy: {
            ...state.currentEnemy,
            armor: state.currentEnemy.armor - dmgToArmor,
            hp: newHp,
          },
        };
      }
      return {
        ...state,
        currentEnemy: {
          ...state.currentEnemy,
          hp: state.currentEnemy.hp - 100,
        },
      };
    }
    case "npcAttack": {
      const dmg = action.payload.dmg;

      return {
        ...state,
        player: { ...state.player, hp: state.player.hp - dmg },
      };
    }

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
