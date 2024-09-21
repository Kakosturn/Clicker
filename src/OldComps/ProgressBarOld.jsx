// import { useState, useEffect, memo } from "react";
// import "./../index.css";
// import { useMainContext } from "../context/MainContext";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const MemoedProgressBar = memo(function Progressbar({ btnName, type }) {
//   const [filled, setFilled] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const { dispatch } = useMainContext();
//   //console.log(filled);
//   console.log(type);
//   useEffect(() => {
//     if (filled <= 100 && isRunning) {
//       setTimeout(() => setFilled((prev) => (prev += 100)), 5);
//     }
//   }, [filled, isRunning]);
//   useEffect(() => {
//     async function reset() {
//       if (filled >= 100) {
//         await delay(500);
//         setFilled(0);
//         setIsRunning(false);
//         type === "wood"
//           ? dispatch({ type: "gainedWood" })
//           : type === "stone"
//           ? dispatch({ type: "gainedStone" })
//           : dispatch({ type: "gainedMeat" });
//       }
//     }
//     reset();
//   }, [filled, dispatch, type]);
//   return (
//     <div className="w-48">
//       <div
//         style={{
//           height: "100%",
//           width: `${filled}%`,
//           backgroundColor: "rgb(229 231 235)",
//           transition: "width 0.5s",
//         }}
//       ></div>
//       <button
//         className="text-gray-200 border-2 border-gray-200 w-full translate-y-[-100%]"
//         onClick={() => setIsRunning(true)}
//       >
//         {btnName}
//       </button>
//     </div>
//   );
// });
// export default MemoedProgressBar;
