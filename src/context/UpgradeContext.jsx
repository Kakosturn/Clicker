import { createContext, useContext, useReducer } from "react";
import { tooltipLumberMill, tooltipQuarry } from "../variables";
const initialState = {
  // selfWoodMultiplier: 1,
  // selfStoneMultiplier: 1,
  // selfMeatMultiplier: 1,
  // selfGatheringUpgradeCounter: 0,
  multiplierSelf: {
    wood: 1,
    stone: 1,
    meat: 1,
    ironOre: 1,
    gatheringUpgradeCounter: 0,
  },
  upgradesCompleted: {
    upgrades: [],
    lumberMill: {
      completed: false,
      tooltip: tooltipLumberMill,
    },
    quarry: {
      completed: false,
      tooltip: tooltipQuarry,
    },
  },
  multiplier: {
    wood: 1,
    stone: 1,
    meat: 1,
    ironOre: 1,
  },
  cost: {
    lumberMill: { wood: 100 },
    quarry: { stone: 100 },
    gathering1: 1000,
  },
  lumberMill: false,
  quarry: false,
  gathering1: false,
  // woodMultiplier: 1,
  // stoneMultiplier: 1,
  // meatMultiplier: 1,
  // lumberMillCost: 100,
  // quarryCost: 100,
  // gathering1Cost: 1000,
};

const UpgradeContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "upgradeLumberMill": {
      return {
        ...state,
        upgradesCompleted: {
          ...state.upgradesCompleted,
          upgrades: [...state.upgradesCompleted.upgrades, "lumberMill"],
          lumberMill: {
            ...state.upgradesCompleted.lumberMill,
            completed: true,
          },
        },
        multiplier: { ...state.multiplier, wood: 1.2 },
      };
    }
    case "upgradeQuarry": {
      return {
        ...state,
        upgradesCompleted: {
          ...state.upgradesCompleted,
          upgrades: [...state.upgradesCompleted.upgrades, "quarry"],
          quarry: {
            ...state.upgradesCompleted.quarry,
            completed: true,
          },
        },
        multiplier: { ...state.multiplier, stone: 1.2 },
      };
    }
    case "upgradeGathering/1": {
      return {
        ...state,
        selfWoodMultiplier: 2,
        selfStoneMultiplier: 2,
        selfMeatMultiplier: 2,
        gathering1: true,
        upgradesCompleted: [...state.upgradesCompleted, "muscle"],
      };
    }
    default: {
      console.log("default case");
      return { ...state };
    }
  }
}

function UpgradeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UpgradeContext.Provider value={{ state, dispatch }}>
      {children}
    </UpgradeContext.Provider>
  );
}

function useUpgradeContext() {
  const context = useContext(UpgradeContext);
  //console.log(context);
  if (context === undefined)
    throw new Error(
      "UpgradeContext was used outside of the UpgradeContext Provider",
    );
  return context;
}

export { UpgradeProvider, useUpgradeContext };
