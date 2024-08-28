// import { useState, useEffect, memo } from "react";
// import "./../index.css";
// import { useBuildingContext } from "../context/BuildingContext";
// import { buildingCost, buildingType } from "../utils/helper";
// import { useMainContext } from "../context/MainContext";
// import toast from "react-hot-toast";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const MemoedProgressBarBuilding = memo(function ProgressBarBuilding({
//   btnName,
//   type,
//   cost,
//   material,
// }) {
//   const [filled, setFilled] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const { state: stateBuilding, dispatch: dispatchBuilding } =
//     useBuildingContext();
//   const { state: stateMain, dispatch: dispatchMain } = useMainContext();
//   //console.log(stateBuilding);
//   //console.log(filled);
//   ////////
//   console.log(type);
//   useEffect(() => {
//     if (
//       filled < 100 &&
//       isRunning &&
//       stateBuilding[cost] <= stateMain[material]
//     ) {
//       setTimeout(() => setFilled((prev) => (prev += 0.1)), 5);
//     }
//   }, [filled, isRunning, cost, material, stateBuilding, stateMain]);
//   ////////
//   ////////
//   useEffect(() => {
//     async function reset() {
//       if (filled === 100) {
//         await delay(500);
//         setFilled(0);
//         setIsRunning(false);
//         console.log(buildingType(type));
//         console.log(buildingCost(type, stateBuilding[cost]));
//         console.log("efektin ici");
//         dispatchBuilding(buildingType(type));

//         dispatchMain(buildingCost(type, stateBuilding[cost]));
//       }
//     }
//     reset();
//   }, [filled, dispatchBuilding, type, dispatchMain, cost, stateBuilding]);
//   ///////////
//   ///////////

//   useEffect(() => {
//     if (stateBuilding.shack === 1) {
//       dispatchMain({ type: "firstBuilding" });
//     }
//     if (type === "shack") {
//       console.log("deneme");
//       dispatchMain({
//         type: "populationIncrease",
//       });
//     }
//   }, [dispatchMain, stateBuilding.shack, type]);

//   return (
//     <div className="w-48">
//       <div
//         style={{
//           height: "100%",
//           width: `${filled}%`,
//           backgroundColor: `rgb(229 231 235)`,
//           transition: "all 0.5s",
//         }}
//       ></div>
//       <button
//         className="text-gray-200 border-2 border-gray-200 w-full translate-y-[-100%]"
//         onClick={() => {
//           if (stateBuilding[cost] <= stateMain[material]) setIsRunning(true);
//         }}
//       >
//         {btnName}
//       </button>
//     </div>
//   );
// });

// export default MemoedProgressBarBuilding;
