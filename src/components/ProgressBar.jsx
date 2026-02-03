// import { useState, useEffect } from "react";
// import "./../index.css";
// import { useMainContext } from "../context/MainContext";
// import { progressButtonTransitionMaterial } from "../utils/helper";
// import { useUpgradeContext } from "../context/UpgradeContext";

import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";

// function ProgressBar({ type, clicksToObtain, payload, resource }) {
//   const [progress, setProgress] = useState(0);

//   const { state: stateMain, dispatch: dispatchMain } = useMainContext();
//   const { state: stateUpgrade } = useUpgradeContext();

//   useEffect(() => {
//     if (progress >= 100) {
//       console.log(type, payload);
//       setTimeout(() => {
//         dispatchMain({
//           type: type,
//           payload: { resource: resource, amount: payload },
//         });
//         setProgress(0);
//       }, 100);
//     }
//   }, [dispatchMain, progress, type, payload, resource]);

//   // return (
//   //   <div className="relative w-48 h-10 rounded-xl border-2 border-gray-200 overflow-hidden bg-[#303030] hover:bg-[#4d4d4d]">
//   //     {/* Fill bar */}
//   //     <div
//   //       className={`
//   //         absolute left-0 top-0 h-full
//   //         transition-[width] duration-300 ease-out
//   //         ${
//   //           progress >= 100
//   //             ? "bg-gradient-to-r from-green-400 to-green-600 shadow-[0_0_12px_rgba(0,255,0,0.7)]"
//   //             : "bg-gradient-to-r from-orange-400 to-yellow-500"
//   //         }
//   //       `}
//   //       style={{ width: `${progress}%` }}
//   //     />

//   //     {/* Label / Button overlay */}
//   //     <button
//   //       className="relative z-10 w-full h-full text-gray-200 font-semibold"
//   //       disabled={progress >= 100}
//   //       onClick={() => {
//   //         if (progress < 100) {
//   //           setProgress((prev) => prev + 100 / clicksToObtain);
//   //         }
//   //       }}
//   //     >
//   //       {progressButtonTransitionMaterial(progress)}
//   //     </button>
//   //   </div>
//   // );
//   return (
//     <div className="relative w-48 h-10 rounded-xl border-2 border-gray-200 overflow-hidden bg-[#303030] hover:bg-[#4d4d4d]">
//       {/* Animated fill */}
//       <div
//         className={`
//           absolute left-0 top-0 h-full
//           bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300
//           shadow-[0_0_12px_rgba(120,255,120,0.7)]
//           transition-[width] duration-200 ease-out
//         `}
//         style={{
//           width: `${progress}%`,
//         }}
//       />

//       {/* Shine only while filling */}
//       {progress > 0 && progress < 100 && (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="shine" />
//         </div>
//       )}

//       {/* Button */}
//       <button
//         className="relative z-10 w-full h-full font-semibold text-gray-200"
//         disabled={progress >= 100}
//         onClick={() => {
//           if (progress < 100) {
//             setProgress((prev) => prev + 100 / clicksToObtain);
//           }
//         }}
//       >
//         {progress >= 100 ? "Success" : "Collect"}
//       </button>
//     </div>
//   );
// }

// export default ProgressBar;

function ProgressBar({ type, clicksToObtain, payload, resource }) {
  const [progress, setProgress] = useState(0);

  const { dispatch: dispatchMain } = useMainContext();

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        dispatchMain({
          type: type,
          payload: { resource: resource, amount: payload },
        });
        setProgress(0);
      }, 100);
    }
  }, [dispatchMain, progress, type, payload, resource]);

  return (
    <div
      className="
        relative w-full h-10
        rounded-xl
        overflow-hidden
        bg-zinc-800
        border border-zinc-700
        shadow-inner
        hover:bg-zinc-600
      "
    >
      {/* Fill */}
      <div
        className="
          absolute left-0 top-0 h-full
          bg-gradient-to-r
          from-emerald-500 via-green-400 to-lime-300
          shadow-[0_0_12px_rgba(120,255,120,0.6)]
          transition-[width] duration-200 ease-out
        "
        style={{ width: `${progress}%` }}
      />

      {/* Shine */}
      {progress > 0 && progress < 100 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="shine" />
        </div>
      )}

      {/* Button */}
      <button
        className="
          relative z-10 w-full h-full
          font-semibold tracking-wide
          text-zinc-100
          disabled:text-zinc-400
        "
        disabled={progress >= 100}
        onClick={() => {
          if (progress < 100) {
            setProgress((prev) => prev + 100 / clicksToObtain);
          }
        }}
      >
        {progress >= 100 ? "Success" : "Collect"}
      </button>
    </div>
  );
}

export default ProgressBar;
