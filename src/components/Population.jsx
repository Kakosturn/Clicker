import { useEffect, useRef } from "react";
import Modal from "./Modal";
import { Cost } from "../utils/costClass";
import { useMainStore } from "../stores/useMainStore";
import { usePopulationStore } from "../stores/usePopulationStore";

function Population() {
  const injured = usePopulationStore((state) => state.injured);
  const assigned = usePopulationStore((state) => state.assigned);
  const idle = usePopulationStore((state) => state.idle);
  const venatrixInjured = usePopulationStore(state=>state.venatrixInjured)
  const venatrixRecovered = usePopulationStore(state=>state.venatrixRecovered)
  const meat = useMainStore((state) => state.resources.meat.amount);
  const loseResource = useMainStore((state) => state.loseResource);
  // 1. Create refs to track changing resources WITHOUT resetting our timers
  const currentMeatRef = useRef(meat);
  const injuredRef = useRef(injured);

  const totalWorkingPop = Object.values(assigned).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  // console.log(statePop);
  // console.log(totalWorkingPop);
  const meatSpentPerVenatrix =
    totalWorkingPop > 0 ? 60000 / totalWorkingPop : null;

  // console.log(totalWorkingPop, statePop.injured);
  // 2. Keep the refs updated every time the state changes
  useEffect(() => {
    currentMeatRef.current = meat;
    injuredRef.current = injured;
  }, [meat, injured]);

  // --- EFFECT 1: Working Venatrix (Eating or Starving) ---
  useEffect(() => {
    if (totalWorkingPop === 0) return; // Nobody is working, no timer needed

    const intervalId = setInterval(() => {
      // Check the REF, not the state!
      if (currentMeatRef.current > 0) {
        loseResource({ cost: new Cost(0, 0, 1) });
      } else {
        venatrixInjured();
      }
    }, meatSpentPerVenatrix);

    return () => clearInterval(intervalId);
    // Notice: currentMeatRef is NOT in the dependencies.
    // This timer will only reset if the totalWorkingPop changes!
  }, [totalWorkingPop, meatSpentPerVenatrix, loseResource,venatrixInjured]);

  // --- EFFECT 2: Injured Venatrix (Recovering) ---
  useEffect(() => {
    // We only need to start this timer if there are actually injured Venatrix
    if (injured === 0) return;

    const intervalId = setInterval(() => {
      // If we have meat AND we have injured people
      if (currentMeatRef.current > 0 && injuredRef.current > 0) {
        venatrixRecovered();
        loseResource({ cost: new Cost(0, 0, 1) });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ loseResource,injured,venatrixRecovered]); // Timer resets only if injured count changes

  return (
    <div>
      Population : {idle}
      {injured ? ` (${injured} injured)` : ""}
      <Modal
        content={
          "From now on, Venatrix must be fed to function, or they will become injured 🤕"
        }
      />
    </div>
  );
}

export default Population;

//! eski population, useEffect ler değişti yenisinde
// import { useEffect } from "react";
// import Popup from "reactjs-popup";
// import Modal from "./Modal";
// import { Cost } from "../context/MainContext";

// function Population() {

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
