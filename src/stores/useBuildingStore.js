import { create } from "zustand";

import Bungalow from "../components/Buildings/Bungalow";
import Cabin from "../components/Buildings/Cabin";
import Shack from "../components/Buildings/Shack";
import House from "../components/Buildings/House";
import Arsenal from "../components/Buildings/Arsenal";
import { Cost } from "../utils/costClass";
import {
  requiredBungalowForHouse,
  requiredCabinForBungalow,
  requiredHouseForArsenal,
  requiredShackForCabin,
  secsToBuildArsenal,
  secsToBuildBungalow,
  secsToBuildCabin,
  secsToBuildHouse,
  secsToBuildShack,
} from "../variables";

const initialState = {
  buildings: [
    {
      id: "shack",
      component: Shack,
      builtAmount: 90,
      cost: new Cost(10, 0, 0),
      secsToBuild: secsToBuildShack,
      costMultiplier: { wood: 1.2 },
      unlocked: () => true,
    },
    {
      id: "cabin",
      component: Cabin,
      builtAmount: 90,
      cost: new Cost(30, 0, 0),
      secsToBuild: secsToBuildCabin,
      costMultiplier: { wood: 1.2 },
      unlocked: (buildings) =>
        buildings[0].builtAmount >= requiredShackForCabin,
    },
    {
      id: "bungalow",
      component: Bungalow,
      builtAmount: 90,
      cost: new Cost(10, 5, 0),
      secsToBuild: secsToBuildBungalow,
      costMultiplier: { wood: 1.2, stone: 1.2 },
      unlocked: (buildings) =>
        buildings[1].builtAmount >= requiredCabinForBungalow,
    },
    {
      id: "house",
      component: House,
      builtAmount: 90,
      cost: new Cost(10, 0, 0, 0, 10),
      secsToBuild: secsToBuildHouse,
      costMultiplier: { wood: 1.2, ironBar: 1.2 },
      unlocked: (buildings) =>
        buildings[2].builtAmount >= requiredBungalowForHouse,
    },
    {
      id: "arsenal",
      component: Arsenal,
      builtAmount: 90,
      cost: new Cost(10, 0, 0, 0, 20),
      secsToBuild: secsToBuildArsenal,
      costMultiplier: { wood: 1.2, ironBar: 1.2 },
      unlocked: (buildings) =>
        buildings[3].builtAmount >= requiredHouseForArsenal,
    },
  ],
};

export const useBuildingStore = create((set) => ({
  ...initialState,
  build: (payload) =>
    set((state) => {
      const buildingId = payload;

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
    }),
  empty: () => set((state) => ({ ...state })),
}));

// import { create } from "zustand";
// import Bungalow from "../components/Buildings/Bungalow";
// import Cabin from "../components/Buildings/Cabin";
// import Shack from "../components/Buildings/Shack";
// import House from "../components/Buildings/House";
// import Arsenal from "../components/Buildings/Arsenal";
// import { Cost } from "../utils/costClass"; // Or wherever your new Cost.js lives!
// import {
//   requiredBungalowForHouse,
//   requiredCabinForBungalow,
//   requiredHouseForArsenal,
//   requiredShackForCabin,
// } from "../variables";

// const initialState = {
//   buildings: [
//     {
//       id: "shack",
//       component: Shack,
//       builtAmount: 90,
//       cost: new Cost(10, 0, 0),
//       secsToBuild: 2,
//       costMultiplier: { wood: 1.2 },
//       unlocked: (buildingState) => true,
//     },
//     {
//       id: "cabin",
//       component: Cabin,
//       builtAmount: 90,
//       cost: new Cost(30, 0, 0),
//       secsToBuild: 1,
//       costMultiplier: { wood: 1.2 },
//       unlocked: (buildingState) =>
//         buildingState.buildings[0].builtAmount >= requiredShackForCabin,
//     },
//     {
//       id: "bungalow",
//       component: Bungalow,
//       builtAmount: 90,
//       cost: new Cost(10, 5, 0),
//       secsToBuild: 1,
//       costMultiplier: { wood: 1.2, stone: 1.2 },
//       unlocked: (buildingState) =>
//         buildingState.buildings[1].builtAmount >= requiredCabinForBungalow,
//     },
//     {
//       id: "house",
//       component: House,
//       builtAmount: 90,
//       cost: new Cost(10, 0, 0, 0, 10),
//       secsToBuild: 1,
//       costMultiplier: { wood: 1.2, ironBar: 1.2 },
//       unlocked: (buildingState) =>
//         buildingState.buildings[2].builtAmount >= requiredBungalowForHouse,
//     },
//     {
//       id: "arsenal",
//       component: Arsenal,
//       builtAmount: 90,
//       cost: new Cost(10, 0, 0, 0, 20),
//       secsToBuild: 1,
//       costMultiplier: { wood: 1.2, ironBar: 1.2 },
//       unlocked: (buildingState) =>
//         buildingState.buildings[3].builtAmount >= requiredHouseForArsenal,
//     },
//   ],
// };

// export const useBuildingStore = create((set) => ({
//   ...initialState,

//   // ==========================================
//   // ACTIONS
//   // ==========================================

//   build: (buildingId) =>
//     set((state) => ({
//       buildings: state.buildings.map((building) => {
//         // If it's not the building we clicked, return it untouched
//         if (building.id !== buildingId) return building;

//         // If it IS the building we clicked, update its amount and scale its cost
//         return {
//           ...building,
//           builtAmount: building.builtAmount + 1,
//           cost: building.cost.scale(building.costMultiplier),
//         };
//       }),
//     })),
// }));
