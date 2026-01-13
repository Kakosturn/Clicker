import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";
import { useUpgradeContext } from "../context/UpgradeContext";
import { errorToast } from "../components/Toast";

function ArrowsWood() {
  // up --- > "venatrixAtWood"
  // down --- > "venatrixReturnFromWood"
  const { state: popState, dispatch: popDispatch } = usePopulationContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  // const [workingNum, setWorkingNum] = useState(popState["venatrixAtWood"]);
  const numOfVenatrix = popState.assigned.wood;
  // console.log(popState.venatrix, numOfVenatrix);
  const secsToGather =
    ((10 * 1000) / numOfVenatrix) * stateUpgrade.woodMultiplier;

  useEffect(() => {
    if (popState.assigned.wood > 0) {
      const intervalId = setInterval(
        () =>
          mainDispatch({
            type: "gainResource",
            payload: { resource: "wood", amount: 1 },
          }),
        secsToGather
      );

      return () => clearInterval(intervalId);
    }
  }, [secsToGather, popState.assigned.wood, mainDispatch]);

  function upArrowHandler() {
    if (popState.idle > 0) {
      popDispatch({ type: "assign", payload: "wood" });
      // setWorkingNum((prev) => prev + 1);
    }
  }

  function downArrowHandler() {
    if (popState.assigned.wood > 0) {
      popDispatch({ type: "unassign", payload: "wood" });
      // setWorkingNum((prev) => prev - 1);
    }
  }

  function onBlurHandler(e) {
    console.log("blur aktif");
    const inputValue = Number(e.target.value);
    // console.log(
    //   `inputValue = ${inputValue} numvenatrix = ${popState.venatrixAtWood} total venatrix(idle) = ${popState.venatrix}`
    // );

    if (inputValue - popState.assigned.wood > popState.idle) {
      // setWorkingNum(0);
      return;
    }
    if (
      inputValue - popState.assigned.wood > popState.idle &&
      popState.assigned.wood > 0
    ) {
      // setWorkingNum(popState.assigned.wood);
      return;
    }

    popDispatch({
      type: "setAssigned",
      payload: { resource: "wood", amount: inputValue },
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
          max={popState.idle + numOfVenatrix}
          value={popState.assigned.wood}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue - popState.assigned.wood > popState.idle) {
              // setWorkingNum(0);
              errorToast("asdasd");
              return;
            }
            if (
              inputValue - popState.assigned.wood > popState.idle &&
              popState.assigned.wood > 0
            ) {
              // setWorkingNum(popState.assigned.wood);
              errorToast("asdasd");
              return;
            }
            popDispatch({
              type: "setAssigned",
              payload: { resource: "wood", amount: Number(e.target.value) },
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

export default ArrowsWood;
