// import { createContext, useContext, useReducer } from "react";

// const initialState = {
//   // venatrix: 0,
//   // venatrixInjured: 0,
//   // venatrixAtWood: 0,
//   // venatrixAtStone: 0,
//   // venatrixAtMeat: 0,
//   idle: 0,
//   injured: 0,

//   assigned: {
//     wood: 0,
//     stone: 0,
//     meat: 0,
//     ironOre: 0,
//   },
// };
// const PopulationContext = createContext();

// function reducer(state, action) {
//   switch (action.type) {
//     case "venatrixIncrease": {
//       return { ...state, idle: state.idle + action.payload };
//     }
//     case "assign": {
//       const resource = action.payload;
//       if (state.idle === 0) return { ...state };

//       return {
//         ...state,
//         idle: state.idle - 1,
//         assigned: {
//           ...state.assigned,
//           [resource]: state.assigned[resource] + 1,
//         },
//       };
//     }

//     case "unassign": {
//       const resource = action.payload;
//       if (state.assigned[resource] === 0) return { ...state };
//       return {
//         ...state,
//         idle: state.idle + 1,
//         assigned: {
//           ...state.assigned,
//           [resource]: state.assigned[resource] - 1,
//         },
//       };
//     }
//     case "setAssigned": {
//       const { resource, amount } = action.payload;
//       return {
//         ...state,
//         idle: state.idle - (amount - state.assigned[resource]),
//         assigned: {
//           ...state.assigned,
//           [resource]: amount,
//         },
//       };
//     }

//     //! yeni resource geldiğinde buranın anası sikilicek.
//     case "venatrixInjured": {
//       const activeJobs = Object.keys(state.assigned).filter(
//         (el) => state.assigned[el] > 0,
//       );
//       if (activeJobs.length === 0) {
//         return state;
//       }
//       // const totalWorkingPop = Object.values(state.assigned).reduce(
//       //   (acc, curr) => acc + curr,
//       //   0,
//       // );
//       const randomJob =
//         activeJobs[Math.floor(Math.random() * activeJobs.length)];

//       // const newAssigned = {
//       //   ...state.assigned,
//       //   [randomJob]:
//       //     state.assigned[randomJob] > 0
//       //       ? state.assigned[randomJob] - 1
//       //       : state.assigned[randomJob],
//       // };
//       const newAssigned = {
//         ...state.assigned,
//         // We also don't need the ternary (> 0) here anymore, because
//         // the activeJobs filter already proved this number is 1 or higher!
//         [randomJob]: state.assigned[randomJob] - 1,
//       };
//       // const newInjured =
//       //   totalWorkingPop !== 0 ? state.injured + 1 : state.injured;
//       return { ...state, injured: state.injured + 1, assigned: newAssigned };
//     }
//     case "venatrixRecovered": {
//       const newInjured = state.injured > 0 ? state.injured - 1 : state.injured;
//       return {
//         ...state,
//         idle: state.idle + 1,
//         injured: newInjured,
//       };
//     }

//     default: {
//       console.log("default case");
//       return { ...state };
//     }
//   }
// }

// function PopulationProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <PopulationContext.Provider value={{ state, dispatch }}>
//       {children}
//     </PopulationContext.Provider>
//   );
// }

// function usePopulationContext() {
//   const context = useContext(PopulationContext);
//   //console.log(context);
//   if (context === undefined)
//     throw new Error(
//       "PopulationContext was used outside of the MainContext Provider",
//     );
//   return context;
// }

// export { PopulationProvider, usePopulationContext };
