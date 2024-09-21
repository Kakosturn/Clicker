import { useEffect } from "react";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";
import Popup from "reactjs-popup";
import Modal from "./Modal";

function Population() {
  const { state: statePop, dispatch: dispatchPop } = usePopulationContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();

  const totalPop =
    statePop.venatrix +
    statePop.venatrixAtWood +
    statePop.venatrixAtStone +
    statePop.venatrixAtMeat;
  //console.log(totalPop);
  const meatSpentPerVenatrix = 60000 / totalPop;

  useEffect(() => {
    //
    //Meat var venatrix var besleniyolar.
    //
    if (stateMain.meat > 0 && totalPop > 0) {
      console.log("ilk if");
      const intervalId = setInterval(() => {
        dispatchMain({ type: "lostMeat", payload: 1 });
      }, meatSpentPerVenatrix);

      return () => clearInterval(intervalId);
    }
    //
    //Meat yok venatrix var, injured
    //
    if (totalPop > 0 && stateMain.meat === 0) {
      console.log("ikinci if");
      const intervalId = setInterval(() => {
        dispatchPop({ type: "venatrixInjured" });
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [
    stateMain.meat,
    statePop.venatrix,
    meatSpentPerVenatrix,
    dispatchMain,
    dispatchPop,
    statePop.venatrixInjured,
    statePop.venatrixAtWood,
    totalPop,
  ]);

  useEffect(() => {
    //
    //Injured var, meat var, besleniyo recovered, et-
    //
    if (statePop.venatrixInjured > 0 && stateMain.meat > 0) {
      console.log("ücüncü if");
      const intervalId = setInterval(() => {
        dispatchPop({ type: "venatrixRecovered" });
        dispatchMain({ type: "lostMeat", payload: 1 });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [dispatchMain, stateMain.meat, statePop.venatrixInjured, dispatchPop]);

  return (
    <div>
      Population : {statePop.venatrix}
      {statePop.venatrixInjured ? `(${statePop.venatrixInjured} injured)` : ""}
      <Modal
        content={
          "From now on, Venatrix has to be fed in order to function or they will be injured 🤕"
        }
      />
    </div>
  );
}

export default Population;
