import { useState } from "react";
import { useMainContext } from "../context/MainContext";
import { useFeatureContext } from "../context/FeaturesContext";
import { Cost } from "../context/MainContext";
import { errorToast } from "./Toast";
function Furnace() {
  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: stateFeatures, dispatch: dispatchFeatures } =
    useFeatureContext();
  const [isSmelting, setIsSmelting] = useState(false);
  const currentIronOre = stateMain.resources.ironOre.amount;
  const ironOreInFurnace = stateFeatures.furnaceInput.ironOre;
  const furnaceLimit = stateFeatures.furnaceLimit;
  const oreInFurnace = Object.keys(stateFeatures.furnaceInput).find(
    (el) => stateFeatures.furnaceInput[el] > 0,
  );
  // console.log(oreInFurnace);
  const secsToSmelt =
    stateFeatures.smeltResourceInSeconds[oreInFurnace] *
    stateFeatures.furnaceInput[oreInFurnace] *
    1000;
  // console.log(stateFeatures);
  const amount = oreInFurnace ? stateFeatures.furnaceInput[oreInFurnace] : 0;
  const costOfSmelt =
    amount * stateFeatures.smeltCostFor[oreInFurnace]
      ? amount * stateFeatures.smeltCostFor[oreInFurnace]
      : 0;

  return (
    <div
      className="
    w-full
    bg-gradient-to-br from-orange-950 to-[#0f0703]
    border border-orange-900
    rounded-2xl
    p-6
    flex gap-6
    shadow-[0_0_40px_rgba(255,120,40,0.25)]
  "
    >
      {/* LEFT SIDE — RESOURCES */}
      <div
        className="
      flex-1
      bg-orange-900/20
      rounded-xl
      p-4
      flex flex-col gap-4
    "
      >
        <h3 className="text-orange-300 font-bold tracking-wide">Resources</h3>

        {/* RESOURCE ROW */}
        <div
          className="
        flex items-center justify-between
        bg-orange-950/60
        border border-orange-800
        rounded-lg
        p-3
      "
        >
          <div className="flex gap-6 items-center justify-center">
            <p className="text-orange-200 font-semibold">Iron Ore</p>
            <p className="text-base text-orange-400">
              {stateMain.resources.ironOre.amount} available
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded bg-orange-700 hover:bg-orange-500 text-white font-semibold transition"
              onClick={() => {
                if (currentIronOre === 0) return;
                if (amount < furnaceLimit) {
                  dispatchFeatures({
                    type: "addToFurnace",
                    payload: { resource: "ironOre", amount: 1 },
                  });
                  dispatchMain({
                    type: "loseResource",
                    payload: { cost: new Cost(0, 0, 0, 1) },
                  });
                } else errorToast("Furnace is full");
              }}
            >
              +1
            </button>

            <button
              className="px-2 py-1 rounded bg-orange-800 hover:bg-orange-600 text-white font-semibold transition"
              onClick={() => {
                if (amount < furnaceLimit) {
                  dispatchFeatures({
                    type: "addToFurnace",
                    payload: {
                      resource: "ironOre",
                      amount: furnaceLimit - amount,
                    },
                  });
                  dispatchMain({
                    type: "loseResource",
                    payload: {
                      cost: new Cost(0, 0, 0, furnaceLimit - amount),
                    },
                  });
                }
              }}
            >
              All
            </button>

            <input
              type="number"
              max={currentIronOre}
              className="
              w-14 px-2 py-1
              rounded-md
              bg-orange-800 text-orange-100
              border border-orange-700
              focus:outline-none focus:ring-2 focus:ring-orange-500
            "
            />
          </div>
        </div>

        {/* future resources drop in here */}
      </div>

      {/* RIGHT SIDE — FURNACE */}
      <div
        className="
      w-72
      bg-gradient-to-b from-[#1a0f09] to-[#0b0503]
      rounded-xl
      border border-orange-800
      p-4
      flex flex-col items-center gap-4
    "
      >
        {/* Furnace image */}
        <div
          className="
        w-36 h-36
        rounded-xl
        bg-gradient-to-b from-gray-800 to-gray-900
        border-2 border-orange-700
        flex items-center justify-center
        shadow-inner
      "
        >
          <img src="furnace.png" alt="" className="w-24 h-24" />
        </div>
        {/* Capacity */}
        <p className="justify-self-center text-base">
          Capacity : {stateFeatures.furnaceLimit}
        </p>
        {/* Input info */}
        <div className="text-center">
          <p className="text-orange-300 font-semibold text-lg">Furnace Input</p>
          <p className="text-orange-400">{ironOreInFurnace} Iron Ore</p>
        </div>

        {/* Empty button */}
        <button
          className="
          px-4 py-2 rounded-lg
          bg-orange-900 hover:bg-orange-800
          text-white transition text-base
          
        "
          onClick={() => {
            for (const resource of Object.keys(stateFeatures.furnaceInput)) {
              if (stateFeatures.furnaceInput[resource] > 0) {
                dispatchMain({
                  type: "gainResource",
                  payload: {
                    resource: resource,
                    amount: stateFeatures.furnaceInput[resource],
                  },
                });
              }
            }
            dispatchFeatures({ type: "emptyFurnace" });
          }}
        >
          Empty Furnace
        </button>

        {/* Progress + Smelt */}
        <div className="w-full flex flex-col gap-2">
          <div
            className="
          relative w-full h-10
          rounded-xl
          border-2 border-orange-600
          overflow-hidden
          bg-[#2b1a12]
        "
          >
            <div
              className="
              absolute left-0 top-0 h-full
              bg-gradient-to-r from-red-700 via-orange-600 to-yellow-400
              shadow-[0_0_12px_rgba(255,120,60,0.8)]
            "
              style={{
                width: isSmelting ? "100%" : "0%",
                transition: isSmelting
                  ? `width ${secsToSmelt / 1000}s linear`
                  : "none",
              }}
            />

            {isSmelting && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="building-shine" />
              </div>
            )}

            <button
              className={`
              relative z-10 w-full h-full font-bold tracking-wide
              ${isSmelting ? "text-yellow-100" : "text-orange-200"}
            `}
              disabled={isSmelting}
              onClick={() => {
                if (!oreInFurnace) {
                  errorToast("Smelter is empty");
                  return;
                }

                if (stateMain.resources.wood.amount >= costOfSmelt) {
                  setIsSmelting(true);
                  setTimeout(() => {
                    if (stateMain.resources.ironBar.total === 0) {
                      dispatchMain({ type: "firstIronBar" });
                    }

                    dispatchFeatures({ type: "smelt" });
                    dispatchMain({
                      type: "gainResource",
                      payload: {
                        resource: `${oreInFurnace.replace("Ore", "Bar")}`,
                        amount: amount,
                      },
                    });
                    dispatchMain({
                      type: "loseResource",
                      payload: { cost: new Cost(costOfSmelt) },
                    });
                    setIsSmelting(false);
                  }, secsToSmelt);
                } else errorToast("Not enough wood");
              }}
            >
              {isSmelting ? `Smelting ${amount} ${oreInFurnace}...` : "Smelt"}
            </button>
          </div>
          <p className="text-orange-400 text-2xl place-self-center">
            Cost : {costOfSmelt} Wood
          </p>
        </div>
      </div>
    </div>
  );
}

export default Furnace;

///! eski return jsx i , logic olarak kullandığınla bi farkı yok sadece chatgpt ye style lattırdığımı kullanıyorum.

// return (
//   <div className="bg-orange-950 flex justify-between">
//     <div className="flex justify-center items-center gap-8">
//       <p>Iron Ore : {stateMain.resources.ironOre.amount}</p>
//       <div className="flex text-xl gap-6">
//         <button
//           onClick={() => {
//             if (currentIronOre === 0) return;
//             dispatchFeatures({
//               type: "addToFurnace",
//               payload: { resource: "ironOre", amount: 1 },
//             });
//             dispatchMain({
//               type: "loseResource",
//               payload: { cost: new Cost(0, 0, 0, 1) },
//             });
//           }}
//         >
//           Add
//         </button>
//         <button
//           className="bg-blue-900"
//           onClick={() => {
//             dispatchFeatures({
//               type: "addToFurnace",
//               payload: {
//                 resource: "ironOre",
//                 amount:
//                   currentIronOre > furnaceLimit
//                     ? furnaceLimit
//                     : currentIronOre,
//               },
//             });
//             dispatchMain({
//               type: "loseResource",
//               payload: {
//                 cost: new Cost(
//                   0,
//                   0,
//                   0,
//                   currentIronOre > furnaceLimit
//                     ? furnaceLimit
//                     : currentIronOre,
//                 ),
//               },
//             });
//           }}
//         >
//           Add All
//         </button>
//         Add{" "}
//         <input
//           type="number"
//           max={currentIronOre}
//           className="bg-orange-800 w-12 rounded-md"
//         />
//       </div>
//     </div>
//     {/* EMPTY BTN */}
//     {/* EMPTY BTN  */}
//     {/* EMPTY BTN */}
//     {/* EMPTY BTN */}
//     <div className="bg-teal-600">
//       <img src="furnace.png" alt="" />
//       <p>Input: {ironOreInFurnace}</p>
//       <button
//         className="bg-red-900 px-4 py-2"
//         onClick={() => {
//           for (const resource of Object.keys(stateFeatures.furnaceInput)) {
//             if (stateFeatures.furnaceInput[resource] > 0) {
//               dispatchMain({
//                 type: "gainResource",
//                 payload: {
//                   resource: resource,
//                   amount: stateFeatures.furnaceInput[resource],
//                 },
//               });
//             }
//           }
//           dispatchFeatures({ type: "emptyFurnace" });
//         }}
//       >
//         Empty
//       </button>
//       <div className="relative w-48 h-10 rounded-xl border-2 border-gray-200 overflow-hidden bg-[#303030]">
//         {/* progress fill */}
//         <div
//           className="
//         absolute left-0 top-0 h-full
//         bg-gradient-to-r from-red-700 via-orange-600 to-yellow-400
//         shadow-[0_0_12px_rgba(255,120,60,0.8)]
//       "
//           style={{
//             width: isSmelting ? "100%" : "0%",
//             transition: isSmelting
//               ? `width ${secsToSmelt / 1000}s linear`
//               : "none",
//           }}
//         />

//         {/* optional glow */}
//         {isSmelting && (
//           <div className="absolute inset-0 pointer-events-none">
//             <div className="building-shine" />
//           </div>
//         )}

//         {/* SMELT BTN  */}
//         {/* SMELT BTN */}
//         {/* SMELT BTN */}
//         {/* SMELT BTN */}

//         <button
//           className={`
//         relative z-10 w-full h-full font-semibold
//         ${isSmelting ? "text-yellow-100" : "text-gray-200"}
//       `}
//           disabled={isSmelting}
//           onClick={() => {
//             if (!oreInFurnace) {
//               errorToast("Smelter is empty");
//               return;
//             }

//             setIsSmelting(true);

//             setTimeout(() => {
//               if (stateMain.resources.ironBar.total === 0) {
//                 dispatchMain({ type: "firstIronBar" });
//               }
//               dispatchFeatures({ type: "smelt" });
//               dispatchMain({
//                 type: "gainResource",
//                 payload: {
//                   resource: `${oreInFurnace.replace("Ore", "Bar")}`,
//                   amount: amount,
//                 },
//               });
//               setIsSmelting(false);
//             }, secsToSmelt);
//           }}
//         >
//           {isSmelting ? `Smelting ${amount} ${oreInFurnace}...` : "Smelt"}
//         </button>
//       </div>
//     </div>
//   </div>
// );
