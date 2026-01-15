import { createContext, useContext, useReducer } from "react";

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
  upgradesCompleted: [],
  multiplier: {
    wood: 1,
    stone: 1,
    meat: 1,
    ironOre: 1,
  },
  cost: {
    lumberMill: 100,
    quarry: 100,
    gathering1: 1000,
  },
  // woodMultiplier: 1,
  // stoneMultiplier: 1,
  // meatMultiplier: 1,
  // lumberMillCost: 100,
  // quarryCost: 100,
  // gathering1Cost: 1000,
  //! lumberMill: false, ????? hatırlamıyorum neye yarıyodu
  //!quarry: false,
  //!gathering1: false,
};

const UpgradeContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "upgradeLumberMill": {
      return {
        ...state,
        lumberMill: true,
        woodMultiplier: 0.8,
        upgradesCompleted: [...state.upgradesCompleted, "lumberMill"],
      };
    }
    case "upgradeQuarry": {
      return {
        ...state,
        quarry: true,
        stoneMultiplier: 0.8,
        upgradesCompleted: [...state.upgradesCompleted, "quarry"],
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
    default:
      return {
        ...state,
      };
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
      "UpgradeContext was used outside of the UpgradeContext Provider"
    );
  return context;
}

export { UpgradeProvider, useUpgradeContext };
