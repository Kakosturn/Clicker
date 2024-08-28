import { useEffect, useState } from "react";
import { useMainContext } from "../../../context/MainContext";
import { usePopulationContext } from "../../../context/PopulationContext";

function ArrowsMeat() {
  // up --- > "venatrixAtWood"
  // down --- > "venatrixReturnFromWood"

  const { state: popState, dispatch: popDispatch } = usePopulationContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  // const [workingNum, setWorkingNum] = useState(popState["venatrixAtMeat"]);
  const numOfVenatrix = popState.venatrixAtMeat;
  // console.log(popState.venatrix, numOfVenatrix);
  const secsToGather = (10 * 1000) / numOfVenatrix;

  useEffect(() => {
    if (popState.venatrixAtMeat > 0) {
      const intervalId = setInterval(
        () => mainDispatch({ type: "gainedMeat" }),
        secsToGather
      );

      return () => clearInterval(intervalId);
    }
  }, [mainDispatch, popState.venatrixAtMeat, secsToGather]);

  function upArrowHandler() {
    if (popState.venatrix > 0) {
      popDispatch({ type: "venatrixAtMeat" });
      // setWorkingNum((prev) => prev + 1);
    }
  }
  function downArrowHandler() {
    if (popState["venatrixAtMeat"] > 0) {
      popDispatch({ type: "venatrixReturnFromMeat" });
      // setWorkingNum((prev) => prev - 1);
    }
  }

  function onBlurHandler(e) {
    const inputValue = Number(e.target.value);
    //console.log(`inputValue = ${inputValue} total pop = ${popState.venatrix}`);

    if (inputValue - numOfVenatrix > popState.venatrix) {
      // setWorkingNum(0);
      return;
    }
    if (inputValue - numOfVenatrix > popState.venatrix && numOfVenatrix) {
      // setWorkingNum(numOfVenatrix);
      return;
    }
    popDispatch({ type: "setVenatrixAtMeat", payload: inputValue });
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
          className="w-full text-center bg-[#202020]"
          type="number"
          min={0}
          max={numOfVenatrix + popState.venatrix}
          value={popState.venatrixAtMeat}
          onChange={(e) =>
            popDispatch({
              type: "setVenatrixAtMeat",
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

export default ArrowsMeat;
