import { createContext, useContext, useReducer } from "react";
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
const MainContext = createContext();

export class Cost {
  _fields = ["wood", "stone", "meat", "ironOre", "ironBar"];
  constructor(wood = 0, stone = 0, meat = 0, ironOre = 0, ironBar = 0) {
    this.wood = wood;
    this.stone = stone;
    this.ironOre = ironOre;
    this.meat = meat;
    this.ironBar = ironBar;
  }
  scale(multiplier = {}) {
    const next = new Cost();
    this._fields.forEach((field) => {
      const factor = multiplier[field] ?? 1;
      next[field] = Math.floor(this[field] * factor);
    });
    return next;
  }
  gte(other) {
    //console.log(this, other);
    return this._fields.every((field) => this[field] >= other[field]);
  }
  lte(other) {
    return this._fields.every((field) => this[field] <= other[field]);
  }
}

const initialState = {
  clicksToObtain: {
    wood: clicksToObtainWood,
    stone: clicksToObtainStone,
    meat: clicksToObtainMeat,
    ironOre: clicksToObtainIronOre,
  },
  obtainedAmount: {
    wood: 1,
    stone: 1,
    meat: 1,
    ironOre: 1,
  },
  resources: {
    wood: { amount: 99, total: 0 },
    stone: { amount: 99, total: 0 },
    meat: { amount: 99990, total: 0 },
    ironOre: { amount: 10990, total: 0 },
    ironBar: { amount: 11990, total: 0 },
  },

  isRunning: false,
  //
  firstHouse: false,
  firstBungalow: false,
  firstIronBar: false,
  firstArsenal: false,

  // secsToCollectWood: 5,
  // secsToCollectStone: 6,
  // secsToCollectMeat: 7,
  // secsToCollectIronOre: 10,
  // wood: 99990,
  // totalWoodCollected: 0,
  // stone: 99990,
  // totalStoneCollected: 0,
  // meat: 99990,
  // totalMeatCollected: 0,
  // ironOre: 99990,
  // totalIronOreCollected: 0,

  status: "ready",
  randomTexts: [...firstPhaseTexts],
  statusArr: [
    "beginning/0",
    "firstCabin/1",
    "firstBungalow/1",
    "firstHouse",
    "firstIronBar",
    "firstArsenal",
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "reset": {
      return { ...initialState };
    }
    case "beginning/0": {
      return { ...state, status: "beginning/0" };
    }

    case "firstCabin/1": {
      return {
        ...state,
        status: "firstCabin/1",
        randomTexts: [...secondPhaseTexts],
      };
    }
    case "firstBungalow/1": {
      return {
        ...state,
        status: "firstBungalow/1",
        firstBungalow: true,
        randomTexts: [...thirdPhaseTexts],
      };
    }
    case "firstHouse": {
      return {
        ...state,
        status: "firstHouse",
        furnaceUnlocked: true,
        firstHouse: true,
      };
    }
    case "firstIronBar": {
      return { ...state, status: "firstIronBar", firstIronBar: true };
    }
    case "firstArsenal": {
      return { ...state, status: "firstArsenal", firstArsenal: true };
    }
    case "gainResource": {
      const { resource, amount } = action.payload;

      return {
        ...state,
        resources: {
          ...state.resources,
          [resource]: {
            amount: state.resources[resource].amount + amount,
            total: state.resources[resource].total + amount,
          },
        },
      };
    }
    case "loseResource": {
      const { cost } = action.payload; // cost {fields:["wood","stone","meat"],wood:0,stone:0,meat:0}
      const newResources = { ...state.resources };
      // {
      //   wood: { amount: 990, total: 0 },
      //   stone: { amount: 990, total: 0 },
      //   meat: { amount: 990, total: 0 },
      //   ironOre: { amount: 990, total: 0 },
      // }
      console.log(cost);
      if (!cost || !cost._fields) {
        console.warn("loseResource called without valid cost", action.payload);
        return { ...state }; // do NOTHING safely
      }
      for (const resource of cost._fields) {
        newResources[resource] = {
          ...newResources[resource],
          amount: newResources[resource].amount - cost[resource],
        };
      }

      return {
        ...state,
        resources: newResources,
      };
    }
    case "venatrixAvailable": {
      return { ...state, status: "venatrixAvailable" };
    }
    case "gainedWood": {
      return {
        ...state,
        wood: state.wood + 1,
        totalWoodCollected: state.totalWoodCollected + 1,
      };
    }
    case "gainedWoodX": {
      return {
        ...state,
        wood: state.wood + action.payload,
        totalWoodCollected: state.totalWoodCollected + action.payload,
      };
    }
    case "gainedStone": {
      return {
        ...state,
        stone: state.stone + 1,
        totalStoneCollected: state.totalStoneCollected + 1,
      };
    }
    case "gainedStoneX": {
      return {
        ...state,
        stone: state.stone + action.payload,
        totalStoneCollected: state.totalStoneCollected + action.payload,
      };
    }
    case "gainedMeat": {
      return {
        ...state,
        meat: state.meat + 1,
        totalMeatCollected: state.totalMeatCollected + 1,
      };
    }
    case "gainedMeatX": {
      return {
        ...state,
        meat: state.meat + action.payload,
        totalMeatCollected: state.totalMeatCollected + action.payload,
      };
    }
    case "lostWood": {
      return { ...state, wood: state.wood - action.payload };
    }
    case "lostStone": {
      return { ...state, stone: state.stone - action.payload };
    }
    case "lostWood&Stone": {
      console.log(action);
      return {
        ...state,
        stone: state.stone - action.payload.stone,
        wood: state.wood - action.payload.wood,
      };
    }
    case "lostMeat": {
      return { ...state, meat: state.meat - action.payload };
    }
    case "resourceBarRuns": {
      return { ...state, isRunning: true };
    }
    case "resourceBarStops": {
      return { ...state, isRunning: false };
    }

    default: {
      console.log("default case");
      return { ...state };
    }
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
}

function useMainContext() {
  const context = useContext(MainContext);
  //console.log(context);
  if (context === undefined)
    throw new Error("MainContext was used outside of the MainContext Provider");
  return context;
}

export { ContextProvider, useMainContext };
