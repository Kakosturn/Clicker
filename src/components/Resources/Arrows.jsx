import { useEffect, useState } from "react";

import { useMainContext } from "../../context/MainContext";
import { usePopulationContext } from "../../context/PopulationContext";
import { useUpgradeContext } from "../../context/UpgradeContext";
import { errorToast } from "../Toast";

function Arrows({ resource }) {
  const { state: popState, dispatch: popDispatch } = usePopulationContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();

  const secsToGather =
    ((10 * 1000) / popState.assigned[resource]) *
    stateUpgrade.multiplier[resource];

  useEffect(() => {
    if (popState.assigned[resource] > 0) {
      const intervalId = setInterval(
        () =>
          mainDispatch({
            type: "gainResource",
            payload: { resource: resource, amount: 1 },
          }),
        secsToGather,
      );

      return () => clearInterval(intervalId);
    }
  }, [secsToGather, mainDispatch, resource, popState.assigned]);

  function upArrowHandler() {
    if (popState.idle > 0) {
      popDispatch({ type: "assign", payload: resource });
      // setWorkingNum((prev) => prev + 1);
    }
  }

  function downArrowHandler() {
    if (popState.assigned[resource] > 0) {
      popDispatch({ type: "unassign", payload: resource });
      // setWorkingNum((prev) => prev - 1);
    }
  }

  function onBlurHandler(e) {
    console.log("blur aktif");
    const inputValue = Number(e.target.value);

    if (inputValue - popState.assigned[resource] > popState.idle) {
      errorToast("blurhandler error1");
      return;
    }
    if (
      inputValue - popState.assigned[resource] > popState.idle &&
      popState.assigned[resource] > 0
    ) {
      errorToast("blurhandler error2");
      return;
    }

    popDispatch({
      type: "setAssigned",
      payload: { resource: resource, amount: inputValue },
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
          className="text-center w-12 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-[#202020]"
          type="number"
          min={0}
          max={popState.idle + popState.assigned[resource]}
          value={popState.assigned[resource]}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue - popState.assigned[resource] > popState.idle) {
              errorToast("onchangehandler error1");
              return;
            }
            if (
              inputValue - popState.assigned[resource] > popState.idle &&
              popState.assigned[resource] > 0
            ) {
              errorToast("onchangehandler error2");
              return;
            }
            popDispatch({
              type: "setAssigned",
              payload: { resource: resource, amount: Number(e.target.value) },
            });
          }}
          // value={workingNum}
          // onChange={(e) => setWorkingNum(Number(e.target.value))}
          onBlur={onBlurHandler}
        />
      </form>
      <button className="" onClick={upArrowHandler}>
        <img src="./public/arrow-up.png" alt="" className="w-12" />
      </button>
    </div>
  );
}

export default Arrows;
