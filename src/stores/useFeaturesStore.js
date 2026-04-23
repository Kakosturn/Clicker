import { create } from "zustand";

const initialState = {
  furnaceUnlocked: false,
  armoryUnlocked: false,
  expeditionUnlocked: false,
  furnaceOpen: false,

  furnaceInput: {
    ironOre: 0,
    goldOre: 0,
    isRunning: false,
  },
  furnaceLimit: 20,
  smeltResourceInSeconds: {
    ironOre: 2,
    goldOre: 10,
  },
  smeltCostFor: {
    ironOre: 5,
    goldOre: 10,
  },
};

export const useFeaturesStore = create((set) => ({
  ...initialState,
  furnaceUnlockedStatus: () => set(() => ({ furnaceUnlocked: true })),

  armoryUnlockedStatus: () => set(() => ({ armoryUnlocked: true })),
  expeditionUnlockedStatus: () => set(() => ({ expeditionUnlocked: true })),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  addToFurnace: (payload) =>
    set((state) => {
      const { resource, amount } = payload;

      //   for (const x of Object.keys(state.furnaceInput)) {
      //     console.log(x);
      //     state.furnaceInput[x]
      //   }
      return {
        furnaceInput: {
          ...state.furnaceInput,
          [resource]: state.furnaceInput[resource] + amount,
        },
      };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  emptyFurnace: () =>
    set(() => {
      return {
        furnaceInput: {
          ironOre: 0,
          goldOre: 0,
          isRunning: false,
        },
      };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  smelt: () =>
    set(() => {
      return {
        furnaceInput: {
          ironOre: 0,
          goldOre: 0,
          isRunning: false,
        },
      };
    }),
}));
