import { useEffect, useState } from "react";

import { errorToast } from "../components/Toast";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";

function ArrowsMeat() {
  // up --- > "venatrixAtWood"
  // down --- > "venatrixReturnFromWood"

  const { state: popState, dispatch: popDispatch } = usePopulationContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  // const [workingNum, setWorkingNum] = useState(popState["venatrixAtMeat"]);

  // console.log(popState.venatrix, numOfVenatrix);
  const secsToGather = (10 * 1000) / popState.assigned.meat;

  useEffect(() => {
    if (popState.assigned.meat > 0) {
      const intervalId = setInterval(
        () =>
          mainDispatch({
            type: "gainResource",
            payload: { resource: "meat", amount: 1 },
          }),
        secsToGather
      );

      return () => clearInterval(intervalId);
    }
  }, [secsToGather, popState.assigned.meat, mainDispatch]);

  function upArrowHandler() {
    if (popState.idle > 0) {
      popDispatch({ type: "assign", payload: "meat" });
      // setWorkingNum((prev) => prev + 1);
    }
  }
  function downArrowHandler() {
    if (popState.assigned.meat > 0) {
      popDispatch({ type: "unassign", payload: "meat" });
      // setWorkingNum((prev) => prev - 1);
    }
  }

  function onBlurHandler(e) {
    const inputValue = Number(e.target.value);
    //console.log(`inputValue = ${inputValue} total pop = ${popState.venatrix}`);

    if (inputValue - popState.assigned.meat > popState.idle) {
      // setWorkingNum(0);
      errorToast("blurhandler error1");
      return;
    }
    if (inputValue - popState.assigned.meat > popState.idle && popState.idle) {
      // setWorkingNum(numOfVenatrix);
      errorToast("blurhandler error2");

      return;
    }
    popDispatch({
      type: "setAssigned",
      payload: { resource: "meat", amount: inputValue },
    });
  }
  return (
    <div className="flex justify-between items-center">
      <button className="" onClick={downArrowHandler}>
        <img src="./public/arrow-down.png" alt="" className="w-12" />
      </button>
      <form
        className="w-1/2 text-center bg-[#202020]"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-[#202020]"
          type="number"
          min={0}
          max={popState.idle + popState.assigned.meat}
          value={popState.assigned.meat}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue - popState.assigned.meat > popState.idle) {
              errorToast("changehandler error1");

              return;
            }
            if (
              inputValue - popState.assigned.meat > popState.idle &&
              popState.assigned.meat > 0
            ) {
              errorToast("changehandler error2");
              return;
            }
            popDispatch({
              type: "setAssigned",
              payload: { resource: "meat", amount: Number(e.target.value) },
            });
          }}
          onBlur={onBlurHandler}
        />
      </form>
      <button className="" onClick={upArrowHandler}>
        <img src="./public/arrow-up.png" alt="" className="w-12" />
      </button>
    </div>
  );
}

export default ArrowsMeat;
