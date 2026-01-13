// import { useState, useEffect } from "react";
// import "./../index.css";
// import { useMainContext } from "../context/MainContext";
// import { progressButtonTransitionMaterial } from "../utils/helper";
// import { useUpgradeContext } from "../context/UpgradeContext";

// function ProgressBar({ type, secsToObtain, payload }) {
//   //type example -- gainedWoodX
//   const secondsToAcquire = secsToObtain;
//   const [timeLeft, setTimeLeft] = useState(secondsToAcquire);
//   const [isRunning, setIsRunning] = useState(false);

//   const { state: stateMain, dispatch: dispatchMain } = useMainContext();
//   const { state: stateUpgrade } = useUpgradeContext();

//   useEffect(() => {
//     if (!isRunning) return;
//     const intervalId = setInterval(() => {
//       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
//     }, 1000);

//     if (timeLeft <= 0) {
//       setIsRunning(false);
//       // console.log(type, payload);
//       setTimeout(() => {
//         setTimeLeft(secondsToAcquire);

//         dispatchMain({ type: type, payload: payload });
//         dispatchMain({ type: "resourceBarStops" });
//       }, 1000);
//     }
//     return () => clearInterval(intervalId);
//   }, [dispatchMain, isRunning, secondsToAcquire, timeLeft, type, payload]);
//   //console.log(timeLeft, secondsToAcquire);
//   const progress = (1 - timeLeft / secondsToAcquire) * 100;
//   //console.log(progress);
//   return (
//     <div className="border-2 border-gray-200 w-48 flex rounded-xl bg-[#303030] hover:bg-[#4d4d4d]">
//       <div
//         className={`${progress === 100 ? "transitioned" : "default"}`}
//         style={{
//           width: `${progress}%`,
//           height: "100%",
//           //backgroundColor: "rgb(229 231 235)",
//           transition: "all 0.5s",
//           zIndex: 999,
//           borderRadius: "12px",
//         }}
//       >
//         <button
//           className="text-gray-200 w-48"
//           disabled={stateMain.isRunning}
//           onClick={() => {
//             setIsRunning(true);
//             dispatchMain({ type: "resourceBarRuns" });
//           }}
//         >
//           {progressButtonTransitionMaterial(progress)}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProgressBar;

import { useState, useEffect } from "react";
import "./../index.css";
import { useMainContext } from "../context/MainContext";
import { progressButtonTransitionMaterial } from "../utils/helper";
import { useUpgradeContext } from "../context/UpgradeContext";

function ProgressBar({ type, clicksToObtain, payload, resource }) {
  //type example -- gainedWoodX

  const [progress, setProgress] = useState(0);

  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();
  //console.log(progress);
  useEffect(() => {
    // if (!isRunning) return;

    if (progress >= 100) {
      console.log(type, payload);
      setTimeout(() => {
        dispatchMain({
          type: type,
          payload: { resource: resource, amount: payload },
        });
        setProgress(0);
      }, 300);
    }
  }, [dispatchMain, progress, type, payload, resource]);
  //console.log(timeLeft, secondsToAcquire);

  //console.log(progress);
  return (
    <div className="border-2 border-gray-200 w-48 flex rounded-xl bg-[#303030] hover:bg-[#4d4d4d]">
      <div
        className={`${progress === 100 ? "transitioned" : "default"}`}
        style={{
          width: `${progress}%`,
          height: "100%",
          //backgroundColor: "rgb(229 231 235)",
          transition: "all 0.5s",
          zIndex: 999,
          borderRadius: "12px",
        }}
      >
        <button
          className="text-gray-200 w-48"
          disabled={progress >= 100}
          onClick={() => {
            if (progress <= 100)
              setProgress((prev) => prev + 100 / clicksToObtain);
          }}
        >
          {progressButtonTransitionMaterial(progress)}
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
