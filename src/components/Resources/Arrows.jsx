// import { useEffect, useState } from "react";

import { useEffect } from "react";
import { errorToast } from "../Toast";
import { useUpgradeContext } from "../../context/UpgradeContext";
import { useMainContext } from "../../context/MainContext";
import { usePopulationContext } from "../../context/PopulationContext";

// import { useMainContext } from "../../context/MainContext";
// import { usePopulationContext } from "../../context/PopulationContext";
// import { useUpgradeContext } from "../../context/UpgradeContext";
// import { errorToast } from "../Toast";

// function Arrows({ resource }) {
//   const { state: popState, dispatch: popDispatch } = usePopulationContext();
//   const { state: mainState, dispatch: mainDispatch } = useMainContext();
//   const { state: stateUpgrade } = useUpgradeContext();

//   const secsToGather =
//     ((10 * 1000) / popState.assigned[resource]) *
//     stateUpgrade.multiplier[resource];

//   useEffect(() => {
//     if (popState.assigned[resource] > 0) {
//       const intervalId = setInterval(
//         () =>
//           mainDispatch({
//             type: "gainResource",
//             payload: { resource: resource, amount: 1 },
//           }),
//         secsToGather,
//       );

//       return () => clearInterval(intervalId);
//     }
//   }, [secsToGather, mainDispatch, resource, popState.assigned]);

//   function upArrowHandler() {
//     if (popState.idle > 0) {
//       popDispatch({ type: "assign", payload: resource });
//       // setWorkingNum((prev) => prev + 1);
//     }
//   }

//   function downArrowHandler() {
//     if (popState.assigned[resource] > 0) {
//       popDispatch({ type: "unassign", payload: resource });
//       // setWorkingNum((prev) => prev - 1);
//     }
//   }

//   function onBlurHandler(e) {
//     console.log("blur aktif");
//     const inputValue = Number(e.target.value);

//     if (inputValue - popState.assigned[resource] > popState.idle) {
//       errorToast("blurhandler error1");
//       return;
//     }
//     if (
//       inputValue - popState.assigned[resource] > popState.idle &&
//       popState.assigned[resource] > 0
//     ) {
//       errorToast("blurhandler error2");
//       return;
//     }

//     popDispatch({
//       type: "setAssigned",
//       payload: { resource: resource, amount: inputValue },
//     });
//   }
//   return (
//     <div className="flex justify-between items-center">
//       <button className="" onClick={downArrowHandler}>
//         <img src="./public/arrow-down.png" alt="" className="w-12" />
//       </button>
//       <form
//         className="w-1/2 text-center bg-[#202020]"
//         action=""
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           className="text-center w-12 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-[#202020]"
//           type="number"
//           min={0}
//           max={popState.idle + popState.assigned[resource]}
//           value={popState.assigned[resource]}
//           onChange={(e) => {
//             const inputValue = Number(e.target.value);
//             if (inputValue - popState.assigned[resource] > popState.idle) {
//               errorToast("onchangehandler error1");
//               return;
//             }
//             if (
//               inputValue - popState.assigned[resource] > popState.idle &&
//               popState.assigned[resource] > 0
//             ) {
//               errorToast("onchangehandler error2");
//               return;
//             }
//             popDispatch({
//               type: "setAssigned",
//               payload: { resource: resource, amount: Number(e.target.value) },
//             });
//           }}
//           // value={workingNum}
//           // onChange={(e) => setWorkingNum(Number(e.target.value))}
//           onBlur={onBlurHandler}
//         />
//       </form>
//       <button className="" onClick={upArrowHandler}>
//         <img src="./public/arrow-up.png" alt="" className="w-12" />
//       </button>
//     </div>
//   );
// }

// export default Arrows;

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
    }
  }

  function downArrowHandler() {
    if (popState.assigned[resource] > 0) {
      popDispatch({ type: "unassign", payload: resource });
    }
  }

  function onBlurHandler(e) {
    const inputValue = Number(e.target.value);

    if (inputValue - popState.assigned[resource] > popState.idle) {
      errorToast("blurhandler error1");
      return;
    }

    popDispatch({
      type: "setAssigned",
      payload: { resource: resource, amount: inputValue },
    });
  }

  return (
    <div
      className="
        flex items-center justify-end gap-2
        bg-zinc-800
        
        rounded-lg
        px-2 py-1
      "
    >
      {/* Down */}
      <button
        onClick={downArrowHandler}
        className="
          w-8 h-8
          flex items-center justify-center
          rounded-md
          bg-zinc-700
          hover:bg-zinc-600
          active:scale-95
          transition
        "
      >
        <img src="./public/arrow-down.png" alt="" className="w-4 opacity-80" />
      </button>

      {/* Input */}
      <form
        className="
          w-12
          bg-zinc-900
          border border-zinc-700
          rounded-md
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
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

            popDispatch({
              type: "setAssigned",
              payload: { resource: resource, amount: inputValue },
            });
          }}
          onBlur={onBlurHandler}
          className="
            w-full h-8
            text-center
            text-zinc-100
            bg-transparent
            outline-none
            appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
          "
        />
      </form>

      {/* Up */}
      <button
        onClick={upArrowHandler}
        className="
          w-8 h-8
          flex items-center justify-center
          rounded-md
          bg-zinc-700
          hover:bg-zinc-600
          active:scale-95
          transition
        "
      >
        <img src="./public/arrow-up.png" alt="" className="w-4 opacity-80" />
      </button>
    </div>
  );
}

export default Arrows;
