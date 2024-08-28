import { useEffect, useState } from "react";
import { useMainContext } from "../../../context/MainContext";
import { usePopulationContext } from "../../../context/PopulationContext";
import { useUpgradeContext } from "../../../context/UpgradeContext";

function ArrowsWood() {
  // up --- > "venatrixAtWood"
  // down --- > "venatrixReturnFromWood"

  const { state: popState, dispatch: popDispatch } = usePopulationContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  // const [workingNum, setWorkingNum] = useState(popState["venatrixAtWood"]);
  const numOfVenatrix = popState.venatrixAtWood;
  // console.log(popState.venatrix, numOfVenatrix);
  const secsToGather =
    ((10 * 1000) / numOfVenatrix) * stateUpgrade.woodMultiplier;
  useEffect(() => {
    if (popState.venatrixAtWood > 0) {
      const intervalId = setInterval(
        () => mainDispatch({ type: "gainedWood" }),
        secsToGather
      );

      return () => clearInterval(intervalId);
    }
  }, [mainDispatch, secsToGather, popState.venatrixAtWood]);

  function upArrowHandler() {
    if (popState.venatrix > 0) {
      popDispatch({ type: "venatrixAtWood" });
      // setWorkingNum((prev) => prev + 1);
    }
  }

  function downArrowHandler() {
    if (popState["venatrixAtWood"] > 0) {
      popDispatch({ type: "venatrixReturnFromWood" });
      // setWorkingNum((prev) => prev - 1);
    }
  }

  function onBlurHandler(e) {
    const inputValue = Number(e.target.value);
    console.log(
      `inputValue = ${inputValue} numvenatrix = ${popState.venatrixAtWood} total venatrix(idle) = ${popState.venatrix}`
    );

    if (inputValue - popState.venatrixAtWood > popState.venatrix) {
      // setWorkingNum(0);
      return;
    }
    if (
      inputValue - popState.venatrixAtWood > popState.venatrix &&
      popState.venatrixAtWood > 0
    ) {
      // setWorkingNum(popState.venatrixAtWood);
      return;
    }

    popDispatch({ type: "setVenatrixAtWood", payload: inputValue });
  }
  return (
    <div className="flex gap-3 justify-between items-center">
      <button className="shrink basis-8" onClick={downArrowHandler}>
        <img src="./public/arrow-down.png" alt="" className="" />
      </button>
      <form
        className="w-1/2 text-center bg-[#202020]"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="text-center w-full bg-[#202020]"
          type="number"
          min={0}
          max={popState.venatrix + numOfVenatrix}
          value={popState.venatrixAtWood}
          onChange={(e) =>
            popDispatch({
              type: "setVenatrixAtWood",
              payload: Number(e.target.value),
            })
          }
          // value={workingNum}
          // onChange={(e) => setWorkingNum(Number(e.target.value))}
          onBlur={onBlurHandler}
        />
      </form>
      <button className="shrink basis-8" onClick={upArrowHandler}>
        <img src="./public/arrow-up.png" alt="" className="" />
      </button>
    </div>
  );
}

export default ArrowsWood;
