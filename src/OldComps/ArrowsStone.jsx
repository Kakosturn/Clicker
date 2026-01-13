import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import { usePopulationContext } from "../context/PopulationContext";
import { useUpgradeContext } from "../context/UpgradeContext";

function ArrowsStone() {
  // up --- > "venatrixAtWood"
  // down --- > "venatrixReturnFromWood"

  const { state: popState, dispatch: popDispatch } = usePopulationContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  // const [workingNum, setWorkingNum] = useState(popState["venatrixAtStone"]);
  const numOfVenatrix = popState.venatrixAtStone;
  // console.log(popState.venatrix, numOfVenatrix);
  const secsToGather =
    ((10 * 1000) / numOfVenatrix) * stateUpgrade.stoneMultiplier;
  useEffect(() => {
    if (popState.venatrixAtStone > 0) {
      const intervalId = setInterval(
        () => mainDispatch({ type: "gainedStone" }),
        secsToGather
      );

      return () => clearInterval(intervalId);
    }
  }, [mainDispatch, popState.venatrixAtStone, secsToGather]);

  function upArrowHandler() {
    if (popState.venatrix > 0) {
      popDispatch({ type: "venatrixAtStone" });
      // setWorkingNum((prev) => prev + 1);
    }
  }

  function downArrowHandler() {
    if (popState["venatrixAtStone"] > 0) {
      popDispatch({ type: "venatrixReturnFromStone" });
      // setWorkingNum((prev) => prev - 1);
    }
  }

  function onBlurHandler(e) {
    const inputValue = Number(e.target.value);
    console.log(
      `inputValue = ${inputValue} numvenatrix = ${popState.venatrixAtStone} total venatrix(idle) = ${popState.venatrix}`
    );

    if (inputValue - popState.venatrixAtStone > popState.venatrix) {
      // setWorkingNum(0);
      return;
    }
    if (
      inputValue - popState.venatrixAtStone > popState.venatrix &&
      popState.venatrixAtStone > 0
    ) {
      // setWorkingNum(popState.venatrixAtStone);
      return;
    }

    popDispatch({ type: "setVenatrixAtStone", payload: inputValue });
  }
  return (
    <div className="flex gap-3 justify-center items-center">
      <button className="shrink basis-8" onClick={downArrowHandler}>
        <img src="./public/arrow-down.png" alt="" className="" />
      </button>
      <form
        className="w-1/2 bg-[#202020]"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="w-full text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-[#202020]"
          type="number"
          min={0}
          max={popState.venatrix + numOfVenatrix}
          value={popState.venatrixAtStone}
          onChange={(e) =>
            popDispatch({
              type: "setVenatrixAtStone",
              payload: Number(e.target.value),
            })
          }
          onBlur={onBlurHandler}
        />
      </form>
      <button className="shrink basis-8" onClick={upArrowHandler}>
        <img src="./public/arrow-up.png" alt="" className="" />
      </button>
    </div>
  );
}

export default ArrowsStone;
