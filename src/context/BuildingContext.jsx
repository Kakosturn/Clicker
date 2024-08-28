import { createContext, useContext, useReducer } from "react";

const BuildingContext = createContext();

export class Cost {
  _fields = ["wood", "stone", "meat"];
  constructor(wood = 0, stone = 0, meat = 0) {
    this.wood = wood;
    this.stone = stone;
    this.meat = meat;
  }

  gte(other) {
    //console.log(this, other);
    return this._fields.every((field) => this[field] >= other[field]);
  }
  lte(other) {
    return this._fields.every((field) => this[field] <= other[field]);
  }
}
// {wood : 10 , stone : 14}
const initialState = {
  costShack: 10,
  costCabin: 30,
  costBungalowWood: 10,
  costBungalowStone: 5,
  costQuarry: 20,
  shack: 0,
  cabin: 0,
  bungalow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "empty": {
      return { ...state };
    }
    case "buildShack": {
      return {
        ...state,
        shack: state.shack + 1,
        costShack: Math.floor(state.costShack * 1.2),
      };
    }
    case "buildCabin": {
      return {
        ...state,
        cabin: state.cabin + 1,
        costCabin: Math.floor(state.costCabin * 1.2),
      };
    }
    case "buildBungalow": {
      return {
        ...state,
        bungalow: state.bungalow + 1,
        costBungalowWood: Math.floor(state.costBungalowWood * 1.2),
        costBungalowStone: Math.floor(state.costBungalowStone * 1.2),
      };
    }

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
