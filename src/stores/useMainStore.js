import { create } from "zustand";
import {
  firstPhaseTexts,
  secondPhaseTexts,
  thirdPhaseTexts,
} from "../utils/newsFeed";
import {
  clicksToObtainIronOre,
  clicksToObtainMeat,
  clicksToObtainStone,
  clicksToObtainWood,
} from "../variables";

// 1. Extract your exact initial state so the "reset" function works perfectly
const initialState = {
  clicksToObtain: {
    wood: clicksToObtainWood,
    stone: clicksToObtainStone,
    meat: clicksToObtainMeat,
    ironOre: clicksToObtainIronOre,
  },
  obtainedAmount: { wood: 1, stone: 1, meat: 1, ironOre: 1 },
  resourceIncreased: true,
  resources: {
    wood: { amount: 990, total: 101 },
    stone: { amount: 990, total: 101 },
    meat: { amount: 999, total: 101 },
    ironOre: { amount: 980, total: 100 },
    ironBar: { amount: 990, total: 100 },
  },
  isRunning: false,
  statusOfProgression: {
    firstHouse: false,
    firstBungalow: false,
    firstIronBar: false,
    firstArsenal: false,
    furnaceUnlocked: false, // Added this because your reducer creates it!
  },
  status: "ready",
  statusArr: [
    "beginning/0",
    "firstCabin/1",
    "firstBungalow/1",
    "firstHouse",
    "firstIronBar",
    "firstArsenal",
  ],
  randomTexts: [...firstPhaseTexts],

  //    Note: Your reducer references flat variables (state.wood, state.totalWoodCollected)
  //    If you still use those in your game, they need to be initialized here too:
  //   wood: 0,
  //   totalWoodCollected: 0,
  //   stone: 0,
  //   totalStoneCollected: 0,
  //   meat: 0,
  //   totalMeatCollected: 0,
};

// 2. Create the Store
export const useMainStore = create((set) => ({
  ...initialState,

  // ==========================================
  // CORE SYSTEM ACTIONS
  // ==========================================
  reset: () => set(initialState),

  // ==========================================
  // PROGRESSION & STORY ACTIONS
  // ==========================================
  beginningStatus: () => set({ status: "beginning/0" }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  firstCabinStatus: () =>
    set({
      status: "firstCabin/1",
      randomTexts: [...secondPhaseTexts],
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  firstBungalowStatus: () =>
    set((state) => ({
      status: "firstBungalow/1",
      statusOfProgression: {
        ...state.statusOfProgression,
        firstBungalow: true,
      },
      randomTexts: [...thirdPhaseTexts],
    })),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  firstHouseStatus: () =>
    set((state) => ({
      status: "firstHouse",
      statusOfProgression: {
        ...state.statusOfProgression,
        firstHouse: true,
        furnaceUnlocked: true,
      },
    })),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  firstIronBarStatus: () =>
    set((state) => ({
      status: "firstIronBar",
      statusOfProgression: { ...state.statusOfProgression, firstIronBar: true },
    })),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  firstArsenalStatus: () =>
    set((state) => ({
      status: "firstArsenal",
      statusOfProgression: { ...state.statusOfProgression, firstArsenal: true },
    })),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  venatrixAvailableStatus: () => set({ status: "venatrixAvailable" }),

  // ==========================================
  // RESOURCE MANAGEMENT ACTIONS
  // ==========================================

  gainResource: (payload) =>
    set((state) => {
      const { resource, amount } = payload;
      return {
        resources: {
          ...state.resources,
          [resource]: {
            amount: state.resources[resource].amount + amount,
            total: state.resources[resource].total + amount,
          },
        },
        resourceIncreased: true,
      };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  loseResource: (payload) =>
    set((state) => {
      const { cost } = payload;
      if (!cost || !cost._fields) {
        console.warn("loseResource called without valid cost", payload);
        return state; // do NOTHING safely
      }

      const newResources = { ...state.resources };
      for (const resource of cost._fields) {
        newResources[resource] = {
          ...newResources[resource],
          amount: newResources[resource].amount - cost[resource],
        };
      }

      return {
        resources: newResources,
        resourceIncreased: false,
      };
    }),

  // ==========================================
  // PROGRESS BAR ACTIONS
  // ==========================================
  resourceBarRuns: () => set({ isRunning: true }),
  resourceBarStops: () => set({ isRunning: false }),
}));
