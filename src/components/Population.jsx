// import { useEffect } from "react";
// import { useMainContext } from "../context/MainContext";
// import { usePopulationContext } from "../context/PopulationContext";
// import Popup from "reactjs-popup";
// import Modal from "./Modal";
// import { Cost } from "../context/MainContext";

// function Population() {
//   const { state: statePop, dispatch: dispatchPop } = usePopulationContext();
//   const { state: stateMain, dispatch: dispatchMain } = useMainContext();

//   const totalWorkingPop =
//     statePop.assigned.wood +
//     statePop.assigned.stone +
//     statePop.assigned.meat +
//     statePop.assigned.ironOre;
//   console.log(totalWorkingPop);

//   const meatSpentPerVenatrix = 60000 / totalWorkingPop;
//   // console.log("asads");
//   // console.log(stateMain.resources.meat);
//   useEffect(() => {
//     //
//     //Meat var venatrix var besleniyolar.
//     //
//     if (stateMain.resources.meat.amount > 0 && totalWorkingPop > 0) {
//       console.log("ilk if");
//       const intervalId = setInterval(() => {
//         dispatchMain({
//           type: "loseResource",
//           payload: { cost: new Cost(0, 0, 1) },
//         });
//       }, meatSpentPerVenatrix);

//       return () => clearInterval(intervalId);
//     }
//     //
//     //Meat yok venatrix var, injured
//     //
//     if (totalWorkingPop > 0 && stateMain.resources.meat.amount === 0) {
//       console.log("ikinci if");
//       const intervalId = setInterval(() => {
//         dispatchPop({ type: "venatrixInjured" });
//       }, 1000);

//       return () => clearInterval(intervalId);
//     }
//   }, [
//     stateMain.resources.meat.amount,
//     totalWorkingPop,
//     meatSpentPerVenatrix,
//     dispatchMain,
//     dispatchPop,
//   ]);

//   useEffect(() => {
//     //
//     //Injured var, meat var, besleniyo recovered, et-
//     //
//     if (statePop.injured > 0 && stateMain.resources.meat.amount > 0) {
//       console.log("ücüncü if");
//       const intervalId = setInterval(() => {
//         dispatchPop({ type: "venatrixRecovered" });
//         dispatchMain({
//           type: "loseResource",
//           payload: { cost: new Cost(0, 0, 1) },
//         });
//       }, 1000);

//       return () => clearInterval(intervalId);
//     }
//   }, [
//     dispatchMain,
//     stateMain.resources.meat.amount,
//     statePop.injured,
//     dispatchPop,
//   ]);

//   return (
//     <div>
//       Population : {statePop.idle}
//       {statePop.injured ? `(${statePop.injured} injured)` : ""}
//       <Modal
//         content={
//           "From now on, Venatrix has to be fed in order to function or they will be injured 🤕"
//         }
//       />
//     </div>
//   );
// }

// export default Population;

import { useEffect, useRef } from "react";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";
import Modal from "./Modal";
import { Cost } from "../context/MainContext";

function Population() {
  const { state: statePop, dispatch: dispatchPop } = usePopulationContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  // 1. Create refs to track changing resources WITHOUT resetting our timers
  const currentMeatRef = useRef(stateMain.resources.meat.amount);
  const injuredRef = useRef(statePop.injured);

  const totalWorkingPop =
    statePop.assigned.wood +
    statePop.assigned.stone +
    statePop.assigned.meat +
    statePop.assigned.ironOre;

  const meatSpentPerVenatrix =
    totalWorkingPop > 0 ? 6000 / totalWorkingPop : null;
  console.log(totalWorkingPop, statePop.injured);

  // 2. Keep the refs updated every time the state changes
  useEffect(() => {
    currentMeatRef.current = stateMain.resources.meat.amount;
    injuredRef.current = statePop.injured;
  }, [stateMain.resources.meat.amount, statePop.injured]);

  // --- EFFECT 1: Working Venatrix (Eating or Starving) ---
  useEffect(() => {
    if (totalWorkingPop === 0) return; // Nobody is working, no timer needed

    const intervalId = setInterval(() => {
      // Check the REF, not the state!
      if (currentMeatRef.current > 0) {
        dispatchMain({
          type: "loseResource",
          payload: { cost: new Cost(0, 0, 1) },
        });
      } else {
        dispatchPop({ type: "venatrixInjured" });
      }
    }, meatSpentPerVenatrix);

    return () => clearInterval(intervalId);
    // Notice: currentMeatRef is NOT in the dependencies.
    // This timer will only reset if the totalWorkingPop changes!
  }, [totalWorkingPop, meatSpentPerVenatrix, dispatchMain, dispatchPop]);

  // --- EFFECT 2: Injured Venatrix (Recovering) ---
  useEffect(() => {
    // We only need to start this timer if there are actually injured Venatrix
    if (statePop.injured === 0) return;

    const intervalId = setInterval(() => {
      // If we have meat AND we have injured people
      if (currentMeatRef.current > 0 && injuredRef.current > 0) {
        dispatchPop({ type: "venatrixRecovered" });
        dispatchMain({
          type: "loseResource",
          payload: { cost: new Cost(0, 0, 1) },
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [statePop.injured, dispatchMain, dispatchPop]); // Timer resets only if injured count changes

  return (
    <div>
      Population : {statePop.idle}
      {statePop.injured ? ` (${statePop.injured} injured)` : ""}
      <Modal
        content={
          "From now on, Venatrix must be fed to function, or they will become injured 🤕"
        }
      />
    </div>
  );
}

export default Population;
