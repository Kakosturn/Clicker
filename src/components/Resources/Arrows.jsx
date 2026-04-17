import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { errorToast } from "../Toast";
import { useUpgradeContext } from "../../context/UpgradeContext";
import { useMainContext } from "../../context/MainContext";
import { usePopulationContext } from "../../context/PopulationContext";

function Arrows({ resource }) {
  const { state: popState, dispatch: popDispatch } = usePopulationContext();
  const { state: mainState, dispatch: mainDispatch } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  // --- ANIMATION TRACKING ---
  const [flash, setFlash] = useState({ active: false, color: "#B9FF24" }); // defaults to game-ichor
  const currentAssigned = popState.assigned[resource];
  const prevAssigned = useRef(currentAssigned);

  // console.log(currentAssigned, prevAssigned);
  useEffect(() => {
    if (currentAssigned !== prevAssigned.current) {
      const isIncrease = currentAssigned > prevAssigned.current;

      // Flash bright white for gain, game-rust (red) for loss/injury
      setFlash({
        active: true,
        color: isIncrease ? "#ffffff" : "#D73A4A",
      });

      // Settle back to default color after 300ms
      const timeoutId = setTimeout(() => {
        setFlash({ active: false, color: "#B9FF24" }); // game-ichor hex
      }, 200);

      prevAssigned.current = currentAssigned;
      return () => clearTimeout(timeoutId);
    }
  }, [currentAssigned]);

  const secsToGather =
    ((10 * 1000) / currentAssigned) * stateUpgrade.multiplier[resource];

  useEffect(() => {
    if (currentAssigned > 0) {
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
  }, [secsToGather, mainDispatch, resource, currentAssigned]);

  function upArrowHandler() {
    if (popState.idle > 0) {
      popDispatch({ type: "assign", payload: resource });
    }
  }

  function downArrowHandler() {
    if (currentAssigned > 0) {
      popDispatch({ type: "unassign", payload: resource });
    }
  }

  function onBlurHandler(e) {
    const inputValue = Number(e.target.value);

    if (inputValue - currentAssigned > popState.idle) {
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
        flex items-center justify-end gap-1
        bg-game-panel
        border border-game-border
        rounded-xs
        "
    >
      {/* Down */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={downArrowHandler}
        className="
          w-8 h-8
          flex items-center justify-center
          rounded-xs
          bg-game-border
          transition-colors
        "
      >
        <img
          src="./public/arrow-down.png"
          alt=""
          className="w-full h-full object-scale-down opacity-80"
        />
      </motion.button>

      {/* Input */}
      <form className="w-12 h-8" onSubmit={(e) => e.preventDefault()}>
        <motion.input
          type="number"
          min={0}
          max={popState.idle + currentAssigned}
          value={currentAssigned}
          // The Animation Magic happens here:
          animate={{
            scale: flash.active ? 1.2 : 1,
            color: flash.color,
            textShadow: flash.active
              ? `0px 0px 8px ${flash.color}`
              : "0px 0px 0px transparent",
          }}
          transition={{ duration: 0.2 }}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue - currentAssigned > popState.idle) {
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
            font-bold
            bg-transparent
            outline-hidden
            appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            "
        />
      </form>

      {/* Up */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={upArrowHandler}
        className="
        w-8 h-8
        flex items-center justify-center
        rounded-xs        
        bg-game-border
        transition-colors
        "
      >
        <img
          src="./public/arrow-up.png"
          alt=""
          className="w-full h-full object-scale-down opacity-80"
        />
      </motion.button>
    </div>
  );
}

export default Arrows;

//! eski animasyonsuz arrowlar. ilk useEffect, ref ve flash state siz.
// // import { useEffect, useState } from "react";
// import { motion } from "motion/react";
// import { useEffect } from "react";
// import { errorToast } from "../Toast";
// import { useUpgradeContext } from "../../context/UpgradeContext";
// import { useMainContext } from "../../context/MainContext";
// import { usePopulationContext } from "../../context/PopulationContext";

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
//     }
//   }

//   function downArrowHandler() {
//     if (popState.assigned[resource] > 0) {
//       popDispatch({ type: "unassign", payload: resource });
//     }
//   }

//   function onBlurHandler(e) {
//     const inputValue = Number(e.target.value);

//     if (inputValue - popState.assigned[resource] > popState.idle) {
//       errorToast("blurhandler error1");
//       return;
//     }

//     popDispatch({
//       type: "setAssigned",
//       payload: { resource: resource, amount: inputValue },
//     });
//   }

//   return (
//     <div
//       className="
//         flex items-center justify-end gap-1
//         bg-game-panel
//         border border-game-border
//         rounded-xs

//       "
//     >
//       {/* Down */}
//       <motion.button
//         whileHover={{ scale: 1.05 }} // game-rust color on hover to indicate removing
//         whileTap={{ scale: 0.9 }}
//         onClick={downArrowHandler}
//         className="
//           w-8 h-8
//           flex items-center justify-center
//           rounded-xs
//           bg-game-border
//           transition-colors

//         "
//       >
//         <img
//           src="./public/arrow-down.png"
//           alt=""
//           className="w-full h-full object-scale-down opacity-80"
//         />
//       </motion.button>

//       {/* Input */}
//       <form
//         className="
//           w-12
//           h-8
//         "
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
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

//             popDispatch({
//               type: "setAssigned",
//               payload: { resource: resource, amount: inputValue },
//             });
//           }}
//           onBlur={onBlurHandler}
//           className="
//             w-full h-8
//             text-center
//             text-zinc-100
//             bg-transparent
//             outline-hidden
//             appearance-none
//             [&::-webkit-inner-spin-button]:appearance-none
//             [&::-webkit-outer-spin-button]:appearance-none
//           "
//         />
//       </form>

//       {/* Up */}
//       <motion.button
//         whileHover={{ scale: 1.05 }} // game-ichor color on hover to indicate adding
//         whileTap={{ scale: 0.9 }}
//         onClick={upArrowHandler}
//         className="
//           w-8 h-8
//           flex items-center justify-center
//           rounded-xs
//           bg-game-border
//           transition-colors

//         "
//       >
//         <img
//           src="./public/arrow-up.png"
//           alt=""
//           className="w-full h-full object-scale-down opacity-80"
//         />
//       </motion.button>
//     </div>
//   );
// }

// export default Arrows;
