import { createContext, useContext, useReducer } from "react";
import Bungalow from "../components/Buildings/Bungalow";
import Cabin from "../components/Buildings/Cabin";
import Shack from "../components/Buildings/Shack";
import House from "../components/Buildings/House";
import Arsenal from "../components/Buildings/Arsenal";
import { Cost } from "./MainContext";

const BuildingContext = createContext();

const initialState = {
  buildings: [
    {
      id: "shack",
      component: Shack,
      builtAmount: 100,
      cost: new Cost(10, 0, 0),
      secsToBuild: 2,
      costMultiplier: { wood: 1.2 },
      unlocked: (buildingState) => true,
    },
    {
      id: "cabin",
      component: Cabin,
      builtAmount: 10,
      cost: new Cost(30, 0, 0),
      secsToBuild: 1,
      costMultiplier: { wood: 1.2 },
      unlocked: (buildingState) => buildingState.buildings[0].builtAmount >= 1,
    },
    {
      id: "bungalow",
      component: Bungalow,
      builtAmount: 10,
      cost: new Cost(10, 5, 0),
      secsToBuild: 1,
      costMultiplier: { wood: 1.2, stone: 1.2 },
      unlocked: (buildingState) => buildingState.buildings[1].builtAmount >= 4,
    },
    {
      id: "house",
      component: House,
      builtAmount: 10,
      cost: new Cost(10, 0, 0, 0, 10),
      secsToBuild: 1,
      costMultiplier: { wood: 1.2, ironBar: 1.2 },
      unlocked: (buildingState) => buildingState.buildings[2].builtAmount >= 5,
    },
    {
      id: "arsenal",
      component: Arsenal,
      builtAmount: 0,
      cost: new Cost(10, 0, 0, 0, 20),
      secsToBuild: 1,
      costMultiplier: { wood: 1.2, ironBar: 1.2 },
      unlocked: (buildingState) => buildingState.buildings[3].builtAmount >= 5,
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
    default: {
      console.log("default case");
      return { ...state };
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
      "BuildingContext was used outside of the BuildingContext Provider",
    );
  return context;
}

export { BuildingProvider, useBuildingContext };
