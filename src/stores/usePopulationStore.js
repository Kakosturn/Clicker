import { create } from "zustand";

const initialState = {
  // venatrix: 0,
  // venatrixInjured: 0,
  // venatrixAtWood: 0,
  // venatrixAtStone: 0,
  // venatrixAtMeat: 0,
  idle: 0,
  injured: 0,

  assigned: {
    wood: 0,
    stone: 0,
    meat: 0,
    ironOre: 0,
  },
};

export const usePopulationStore = create((set) => ({
  ...initialState,
  venatrixIncrease: (payload) =>
    set((state) => {
      return { idle: state.idle + payload };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  assign: (payload) =>
    set((state) => {
      const resource = payload;
      if (state.idle === 0) return { ...state };

      return {
        idle: state.idle - 1,
        assigned: {
          ...state.assigned,
          [resource]: state.assigned[resource] + 1,
        },
      };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  unassign: (payload) =>
    set((state) => {
      const resource = payload;
      if (state.assigned[resource] === 0) return { ...state };
      return {
        idle: state.idle + 1,
        assigned: {
          ...state.assigned,
          [resource]: state.assigned[resource] - 1,
        },
      };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  setAssigned: (payload) =>
    set((state) => {
      const { resource, amount } = payload;
      return {
        idle: state.idle - (amount - state.assigned[resource]),
        assigned: {
          ...state.assigned,
          [resource]: amount,
        },
      };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  venatrixInjured: () =>
    set((state) => {
      const activeJobs = Object.keys(state.assigned).filter(
        (el) => state.assigned[el] > 0,
      );
      if (activeJobs.length === 0) {
        return state;
      }
      // const totalWorkingPop = Object.values(state.assigned).reduce(
      //   (acc, curr) => acc + curr,
      //   0,
      // );
      const randomJob =
        activeJobs[Math.floor(Math.random() * activeJobs.length)];

      // const newAssigned = {
      //   ...state.assigned,
      //   [randomJob]:
      //     state.assigned[randomJob] > 0
      //       ? state.assigned[randomJob] - 1
      //       : state.assigned[randomJob],
      // };
      const newAssigned = {
        ...state.assigned,
        // We also don't need the ternary (> 0) here anymore, because
        // the activeJobs filter already proved this number is 1 or higher!
        [randomJob]: state.assigned[randomJob] - 1,
      };
      // const newInjured =
      //   totalWorkingPop !== 0 ? state.injured + 1 : state.injured;
      return { injured: state.injured + 1, assigned: newAssigned };
    }),
  ///
  //////////////////////////////////////////////////////////////////////////////!
  ///
  venatrixRecovered: () =>
    set((state) => {
      const newInjured = state.injured > 0 ? state.injured - 1 : state.injured;
      return {
        ...state,
        idle: state.idle + 1,
        injured: newInjured,
      };
    }),
}));
