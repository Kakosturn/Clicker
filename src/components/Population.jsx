import { useEffect } from "react";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";
import Popup from "reactjs-popup";
import Modal from "./Modal";
import { Cost } from "../context/BuildingContext";

function Population() {
  const { state: statePop, dispatch: dispatchPop } = usePopulationContext();
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();

  const totalPop =
    statePop.idle +
    statePop.assigned.wood +
    statePop.assigned.stone +
    statePop.assigned.meat +
    statePop.assigned.ironOre;
  // console.log(totalPop);

  const meatSpentPerVenatrix = 60000 / totalPop;
  // console.log("asads");
  // console.log(stateMain.resources.meat);
  useEffect(() => {
    //
    //Meat var venatrix var besleniyolar.
    //
    if (stateMain.resources.meat.amount > 0 && totalPop > 0) {
      console.log("ilk if");
      const intervalId = setInterval(() => {
        dispatchMain({
          type: "loseResource",
          payload: { cost: new Cost(0, 0, 1) },
        });
      }, meatSpentPerVenatrix);

      return () => clearInterval(intervalId);
    }
    //
    //Meat yok venatrix var, injured
    //
    if (totalPop > 0 && stateMain.resources.meat.amount === 0) {
      console.log("ikinci if");
      const intervalId = setInterval(() => {
        dispatchPop({ type: "venatrixInjured" });
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [
    stateMain.resources.meat.amount,
    totalPop,
    meatSpentPerVenatrix,
    dispatchMain,
    dispatchPop,
  ]);

  useEffect(() => {
    //
    //Injured var, meat var, besleniyo recovered, et-
    //
    if (statePop.injured > 0 && stateMain.resources.meat.amount > 0) {
      console.log("ücüncü if");
      const intervalId = setInterval(() => {
        dispatchPop({ type: "venatrixRecovered" });
        dispatchMain({
          type: "loseResource",
          payload: { cost: new Cost(0, 0, 1) },
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [
    dispatchMain,
    stateMain.resources.meat.amount,
    statePop.injured,
    dispatchPop,
  ]);

  return (
    <div>
      Population : {statePop.idle}
      {statePop.injured ? `(${statePop.injured} injured)` : ""}
      <Modal
        content={
          "From now on, Venatrix has to be fed in order to function or they will be injured 🤕"
        }
      />
    </div>
  );
}

export default Population;
