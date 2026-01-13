import { createContext, useContext, useReducer } from "react";
import Bungalow from "../components/Buildings/Bungalow";
import Cabin from "../components/Buildings/Cabin";
import Shack from "../components/Buildings/Shack";

const BuildingContext = createContext();

export class Cost {
  _fields = ["wood", "stone", "meat"];
  constructor(wood = 0, stone = 0, meat = 0) {
    this.wood = wood;
    this.stone = stone;
    this.meat = meat;
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
  buildings: [
    {
      id: "shack",
      component: Shack,
      builtAmount: 110,
      cost: new Cost(10, 0, 0),
      secsToBuild: 10,
      costMultiplier: { wood: 1.2 },
      unlocked: (buildingState) => true,
    },
    {
      id: "cabin",
      component: Cabin,
      builtAmount: 110,
      cost: new Cost(30, 0, 0),
      secsToBuild: 12,
      costMultiplier: { wood: 1.2 },
      unlocked: (buildingState) => buildingState.buildings[0].builtAmount >= 10,
    },
    {
      id: "bungalow",
      component: Bungalow,
      builtAmount: 110,
      cost: new Cost(10, 5, 0),
      secsToBuild: 15,
      costMultiplier: { wood: 1.2, stone: 1.2 },
      unlocked: (buildingState) => buildingState.buildings[1].builtAmount >= 5,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "empty": {
      return { ...state };
    }
    case "build": {
      const buildingId = action.payload;

      return {
        ...state,
        buildings: state.buildings.map((building) => {
          if (building.id !== buildingId) return building;
          return {
            ...building,
            builtAmount: building.builtAmount + 1,
            cost: building.cost.scale(building.costMultiplier),
          };
        }),
      };
    }

    // case "buildShack": {
    //   return {
    //     ...state,
    //     shack: state.shack + 1,
    //     costShack: Math.floor(state.costShack * 1.2),
    //   };
    // }
    // case "buildCabin": {
    //   return {
    //     ...state,
    //     cabin: state.cabin + 1,
    //     costCabin: Math.floor(state.costCabin * 1.2),
    //   };
    // }
    // case "buildBungalow": {
    //   return {
    //     ...state,
    //     bungalow: state.bungalow + 1,
    //     costBungalowWood: Math.floor(state.costBungalowWood * 1.2),
    //     costBungalowStone: Math.floor(state.costBungalowStone * 1.2),
    //   };
    // }

    default: {
      return { ...state };
    }
  }
}

function BuildingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BuildingContext.Provider value={{ state, dispatch }}>
      {children}
    </BuildingContext.Provider>
  );
}

function useBuildingContext() {
  const context = useContext(BuildingContext);
  //console.log(context);
  if (context === undefined)
    throw new Error(
      "BuildingContext was used outside of the BuildingContext Provider"
    );
  return context;
}

export { BuildingProvider, useBuildingContext };
