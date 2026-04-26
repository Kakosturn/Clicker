import {
  gridSize,
  maxHp,
  maximumMeatBrought,
  meatUsedPerMovement,
} from "../variables";
import { createGrid } from "../utils/expeditionHelpers";
import { create } from "zustand";

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
  playerMoveCount: 0,
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

export const useExpeditionStore = create((set) => ({
  ...initialState,
  runStart: (payload) =>
    set((state) => {
      const { armor, dmg } = payload;
      return {
        isExpeditionRunning: true,
        player: { ...state.player, armor: armor, dmg: dmg },
      };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  runEnd: () =>
    set((state) => {
      console.log("run end case i");
      return {
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
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  battleStart: () =>
    set((state) => {
      return { battle: { ...state.battle, isActive: true } };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  battleEnd: () =>
    set((state) => {
      return { battle: { ...state.battle, isActive: false } };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  closeResults: () =>
    set(() => {
      return { resultScreen: false };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  setPlayerPos: (payload) =>
    set((state) => {
      const col = payload.col;
      const row = payload.row;
      const newPos = { col: col, row: row };
      const currentTile = state.grid[row]?.[col];

      return {
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
    }),

  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  playerMoveCounter: () =>
    set((state) => {
      return { playerMoveCount: state.playerMoveCount + 1 };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  keyboardMovement: (payload) =>
    set((state) => {
      const direction = payload.direction;
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
      return { playerPos: newPlayerPos };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  meatSpent: () =>
    set((state) => {
      const newMeat = state.meatBrought - state.meatSpentPerMove;
      // const runGoes = newMeat > 0;
      return {
        meatBrought: newMeat,
        // isExpeditionRunning: runGoes,
        // resultScreen: !runGoes,
      };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  setMeatBrought: (payload) =>
    set(() => {
      return { meatBrought: payload };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  setRefillStationMeat: (payload) =>
    set(() => {
      return { refillStationMeat: payload };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  meatRefillStationTransfer: (payload) =>
    set((state) => {
      return { meatBrought: state.meatBrought + payload };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  setGrid: (payload) =>
    set(() => {
      return { grid: payload ? payload : createGrid() };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  revealAround: () =>
    set((state) => {
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
        grid: newGrid,
      };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  finalizeEncounter: (payload) =>
    set((state) => {
      console.log("finalizeEncounter case i");
      const { row, col } = payload;

      const newGrid = [...state.grid];
      newGrid[row] = [...newGrid[row]];

      newGrid[row][col] = {
        ...newGrid[row][col],
        type: "empty",
        icon: null,
        explored: true,
      };

      return {
        grid: newGrid,
        currentEnemy: null,
        battle: { result: null },
      };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  attack: (payload) =>
    set((state) => {
      const dmg = payload.dmg;
      // console.log(state.currentEnemy);
      // console.log(dmg);

      if (dmg < state.currentEnemy.armor) {
        return {
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
            currentEnemy: { ...state.currentEnemy, hp: 0 },
            battle: { isActive: false, result: "win" },
          };
        }
        return {
          currentEnemy: {
            ...state.currentEnemy,
            armor: state.currentEnemy.armor - dmgToArmor,
            hp: newHp,
          },
        };
      }
      return {
        currentEnemy: {
          ...state.currentEnemy,
          hp: state.currentEnemy.hp - 100,
        },
      };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  npcAttack: (payload) =>
    set((state) => {
      const dmg = payload.dmg;

      return {
        player: { ...state.player, hp: state.player.hp - dmg },
      };
    }),
  //
  ////////////////////////////////////////////////////////////////////////////////!!
  //
  applyMaxMeatUpgrade: (effect) =>
    set((state) => {
      return {
        [effect.stat]: state[effect.stat] + effect.value,
      };
    }),
}));
