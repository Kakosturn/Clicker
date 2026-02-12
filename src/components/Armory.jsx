import { useArmoryContext } from "../context/ArmoryContext";
import { invCapacity } from "../variables";
import Cost from "./Cost";
import Icon from "./Icon";
import ProgressBarArmory from "./ProgressBarArmory";

function Armory() {
  const { state: stateArmory, dispatch: dispatchArmory } = useArmoryContext();
  const allInventoryItems = [
    ...stateArmory.inventory.weapons,
    ...stateArmory.inventory.armours,
  ];
  console.log(stateArmory);
  const totalArmor =
    (stateArmory.equipped.head?.armor || 0) +
    (stateArmory.equipped.shoulders?.armor || 0) +
    (stateArmory.equipped.chest?.armor || 0) +
    (stateArmory.equipped.gloves?.armor || 0) +
    (stateArmory.equipped.legs?.armor || 0);
  const totalDamage =
    (stateArmory.equipped.weapon?.damage || 0) +
    (stateArmory.equipped.enhancement?.multiplier || 0);
  function equipItem(item) {
    dispatchArmory({ type: "equip", payload: item });
  }
  return (
    <div
      className="
      w-full
      h-full
      bg-gradient-to-br from-orange-950 to-[#0f0703]
      border border-orange-900
      rounded-2xl
      p-6
      flex flex-col gap-6
      shadow-[0_0_40px_rgba(255,120,40,0.25)]
      
    "
    >
      <h2 className="text-center text-orange-300 text-4xl font-semibold">
        Armory
      </h2>

      <div className="flex gap-6">
        {/* ================= LEFT SIDE ================= */}
        <div
          className="
          w-1/2 p-6
          bg-orange-900/20
          rounded-xl
          border border-orange-800
          flex flex-col gap-4
        "
        >
          <p className="text-start font-semibold mb-4 text-orange-300">
            Inventory
          </p>

          <div
            className="
            p-6 flex relative flex-col
            bg-gradient-to-b from-[#1a0f09] to-[#0b0503]
            rounded-xl
            border border-orange-800
          "
          >
            {/* BODY + EQUIPMENT GRID */}
            <div className="relative h-64 flex justify-center items-center flex-grow mb-8">
              <img
                src="/humanFigure.png"
                alt="character"
                className="opacity-60 scale-95 -top-8 left-40 absolute"
              />

              {/* Every slot keeps YOUR position, only colors changed */}

              {/* HEAD */}
              <div className="absolute -top-4 right-12">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.head?.icon} type="plain" />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Head
                </p>
              </div>

              {/* SHOULDERS */}
              <div className="absolute top-10 right-40">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon
                    path={stateArmory.equipped.shoulders?.icon}
                    type="plain"
                  />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Shoulders
                </p>
              </div>

              {/* CHEST */}
              <div className="absolute top-16 right-14">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.chest?.icon} type="plain" />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Chest
                </p>
              </div>

              {/* GLOVES */}
              <div className="absolute top-36 right-40">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.gloves?.icon} type="plain" />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Gloves
                </p>
              </div>

              {/* LEGS */}
              <div className="absolute bottom-4 right-12">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.legs?.icon} type="plain" />
                </div>
                <p className="text-lg text-center mt-1 text-orange-300">Legs</p>
              </div>

              {/* WEAPON */}
              <div className="absolute left-0 top-12">
                <div
                  className="
                  w-16 h-16 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon
                    path={`${stateArmory.equipped.weapon?.icon}`}
                    type="plain"
                  />
                </div>
                <p className="text-xs text-center mt-1 text-orange-300">
                  Weapon
                </p>

                {/* ENHANCEMENT */}
                <div
                  className="
                  mt-2 w-8 h-8 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path="sharpening_stone.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1 text-orange-300">
                  Enhance
                </p>
              </div>
            </div>

            {/* BOTTOM INVENTORY BAR */}
            <div className="text-2xl text-orange-300">
              <p>Armor : {totalArmor ? totalArmor : 0}</p>
              <p>Damage : {totalDamage}</p>
            </div>
            <div
              className="
               p-3
              bg-[#160f0a]
              rounded-xl
              border border-orange-800
            "
            >
              <p className="text-lg text-orange-300">
                Capacity : {stateArmory.inventory.capacity}
              </p>

              <div className="flex gap-3 pb-2 overflow-auto mt-2">
                {allInventoryItems.map((item, i) => (
                  <div
                    onClick={() => equipItem(item)}
                    key={i}
                    className="
                    w-16 h-16 border border-orange-600 rounded
                    flex items-center justify-center
                    shrink-0 cursor-pointer
                    bg-gradient-to-b from-[#22170e] to-[#160f0a]
                    shadow-inner
                  "
                  >
                    <Icon path={`${item.id}.png`} type="plain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: CRAFTING ================= */}
        <div
          className="
          w-1/2 p-6
          bg-orange-900/20
          rounded-xl
          border border-orange-800
          flex flex-col gap-4
        "
        >
          <p className="mb-8 text-orange-300 font-semibold">Crafting</p>

          <p className="text-start mb-4 text-orange-300">Available</p>

          <div
            className="
            h-96 flex flex-col overflow-y-auto gap-4
            bg-gradient-to-b from-[#1a0f09] to-[#0b0503]
            rounded-xl
            border border-orange-800
            p-4
          "
          >
            {/* WEAPONS */}
            {stateArmory.craftingWindow.availableCrafts.weapons.map((el, i) => (
              <div
                key={i}
                className="
                flex flex-col gap-2 
                bg-[#160f0a]
                rounded-lg
                p-3
                border border-orange-800
              "
              >
                <div className="flex gap-8 items-center">
                  <div className="flex items-center gap-2 text-orange-200">
                    <Icon path={el.icon} type="plain" />
                    <p>{el.name}</p>
                  </div>

                  <span className="text-orange-300">-</span>

                  <div className="flex gap-2 items-center text-orange-200">
                    <p>{el.damage}</p>
                    <Icon path={"damage.png"} type="plain" />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Cost cost={el.cost} iconType={"plain"} />
                  <ProgressBarArmory
                    type={el.id}
                    cost={el.cost}
                    secsToObtain={el.secsToObtain}
                  />
                </div>
              </div>
            ))}

            {/* ARMOURS */}
            {stateArmory.craftingWindow.availableCrafts.armours.map((el, i) => (
              <div
                key={i}
                className="
                flex flex-col gap-2
                bg-[#160f0a]
                rounded-lg
                p-3
                border border-orange-800
              "
              >
                <div className="flex gap-8 items-center">
                  <div className="flex items-center gap-2 text-orange-200">
                    <Icon path={el.icon} type="plain" />
                    <p>{el.name}</p>
                  </div>

                  <span className="text-orange-300">-</span>

                  <div className="flex gap-2 items-center text-orange-200">
                    <p>{el.armor}</p>
                    <Icon path={"armor.png"} type="plain" />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Cost cost={el.cost} iconType={"plain"} />
                  <ProgressBarArmory
                    type={el.id}
                    cost={el.cost}
                    secsToObtain={el.secsToObtain}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Armory;

// return (
//   <div>
//     <h2 className="text-center p-6">Armory</h2>
//     <div className="flex">
//       <div className="w-1/2 p-6">
//         <p className="text-start  font-semibold mb-4">Inventory</p>
//         <div className="p-6 flex relative flex-col">
//           {/* --- BODY + EQUIPMENT GRID --- */}
//           <div className="relative flex justify-center items-center flex-grow">
//             {/* Human silhouette (center) */}
//             <img
//               src="/human-figure.png"
//               alt="character"
//               className="opacity-70 scale-125"
//             />

//             {/* HEAD */}
//             <div className="absolute -top-16 right-56">
//               <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
//                 <Icon path="helmet.png" type="plain" />
//               </div>
//               <p className="text-xs text-center mt-1">Head</p>
//             </div>

//             {/* SHOULDERS */}
//             <div className="absolute top-4 left-40">
//               <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
//                 <Icon path="shoulder.png" type="plain" />
//               </div>
//               <p className="text-xs text-center mt-1">Shoulders</p>
//             </div>

//             {/* CHEST */}
//             <div className="absolute top-12 ">
//               <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
//                 <Icon path="chest.png" type="plain" />
//               </div>
//               <p className="text-xs text-center mt-1">Chest</p>
//             </div>

//             {/* GLOVES */}
//             <div className="absolute top-40 right-44">
//               <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
//                 <Icon path="gloves.png" type="plain" />
//               </div>
//               <p className="text-xs text-center mt-1">Gloves</p>
//             </div>

//             {/* LEGS */}
//             <div className="absolute bottom-[4rem] left-48">
//               <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
//                 <Icon path="legs.png" type="plain" />
//               </div>
//               <p className="text-xs text-center mt-1">Legs</p>
//             </div>

//             {/* WEAPON (side slot) */}
//             <div className="absolute left-0 top-12">
//               <div className="w-16 h-16 border rounded flex items-center justify-center bg-zinc-900">
//                 <Icon path="sword.png" type="plain" />
//               </div>
//               <p className="text-xs text-center mt-1">Weapon</p>
//             </div>

//             {/* WEAPON ENHANCEMENT (small slot under weapon) */}
//             <div className="absolute left-0 top-18">
//               <div className="w-8 h-8 border rounded flex items-center justify-center bg-zinc-900">
//                 <Icon path="sharpening_stone.png" type="plain" />
//               </div>
//               <p className="text-xs text-center mt-1">Enhance</p>
//             </div>
//           </div>

//           {/* --- BOTTOM SLIDING INVENTORY BAR --- */}
//           <div className="mt-16">
//             <p className="text-lg">
//               Capacity : {stateArmory.inventory.capacity}
//             </p>
//             <div className="flex gap-3 pb-2 overflow-auto">
//               {allInventoryItems.map((item, i) => (
//                 <div
//                   key={i}
//                   className="w-16 h-16 border border-gray-500 rounded flex items-center justify-center shrink-0 cursor-pointer"
//                 >
//                   <Icon path={`${item.id}.png`} type="plain" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/2 p-6">
//         <p className="mb-8">Crafting</p>
//         <div>
//           <p className="text-start mb-8">Available</p>
//           <div className="h-96 flex flex-col overflow-y-auto ">
//             <div>
//               {stateArmory.craftingWindow.availableCrafts.weapons.map(
//                 (el, i) => {
//                   // const item = stateArmory.craftingWindow.availableCrafts[el][0];
//                   // console.log(el);
//                   return (
//                     <div className="flex flex-col gap-1 mb-4" key={i}>
//                       <div className="flex gap-8">
//                         <div className="flex">
//                           <Icon path={el.icon} type="plain" />
//                           <p>{el.name}</p>
//                         </div>
//                         <span>-</span>
//                         <div className="flex gap-2">
//                           <div className="flex">
//                             <p>{el.damage}</p>
//                             <Icon path={"damage.png"} type="plain" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex gap-4">
//                         <Cost cost={el.cost} iconType={"plain"} />
//                         <ProgressBarArmory
//                           type={el.id}
//                           cost={el.cost}
//                           secsToObtain={el.secsToObtain}
//                         />
//                       </div>
//                     </div>
//                   );
//                 },
//               )}
//             </div>
//             <div className="flex flex-col gap-4">
//               {stateArmory.craftingWindow.availableCrafts.armours.map(
//                 (el, i) => {
//                   // const item = stateArmory.craftingWindow.availableCrafts[el][0];
//                   // console.log(el);
//                   return (
//                     <div className="flex flex-col gap-1" key={i}>
//                       <div className="flex gap-8">
//                         <div className="flex">
//                           <Icon path={el.icon} type="plain" />
//                           <p>{el.name}</p>
//                         </div>
//                         <span>-</span>
//                         <div className="flex gap-2">
//                           <div className="flex">
//                             <p>{el.armor}</p>
//                             <Icon path={"armor.png"} type="plain" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex gap-4">
//                         <Cost cost={el.cost} iconType={"plain"} />
//                         <ProgressBarArmory
//                           type={el.id}
//                           cost={el.cost}
//                           secsToObtain={el.secsToObtain}
//                         />
//                       </div>
//                     </div>
//                   );
//                 },
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// return (
//     <div className="p-6 bg-zinc-900 text-zinc-100 rounded-lg min-h-[680px]">
//       <h2 className="text-center text-xl font-semibold tracking-wide mb-6">
//         Armory
//       </h2>

//       <div className="flex gap-6">
//         {/* ===================== LEFT SIDE: INVENTORY + BODY ===================== */}
//         <div className="w-1/2 bg-zinc-800 rounded-lg p-4 flex flex-col gap-4">
//           <p className="text-sm uppercase tracking-wider text-zinc-300">
//             Inventory & Equipment
//           </p>

//           {/* BODY + EQUIPMENT GRID */}
//           <div className="relative flex justify-center items-center flex-grow bg-zinc-900/60 rounded-lg p-4">
//             <img
//               src="/human-figure.png"
//               alt="character"
//               className="opacity-70 scale-125"
//             />

//             {/* HEAD */}
//             <div className="absolute -top-12 right-52 flex flex-col items-center">
//               <div className="w-12 h-12 border border-zinc-600 rounded bg-zinc-900 flex items-center justify-center">
//                 <Icon path="helmet.png" type="plain" />
//               </div>
//               <p className="text-xs mt-1 text-zinc-300">Head</p>
//             </div>

//             {/* SHOULDERS */}
//             <div className="absolute top-8 left-32 flex flex-col items-center">
//               <div className="w-12 h-12 border border-zinc-600 rounded bg-zinc-900 flex items-center justify-center">
//                 <Icon path="shoulder.png" type="plain" />
//               </div>
//               <p className="text-xs mt-1 text-zinc-300">Shoulders</p>
//             </div>

//             {/* CHEST */}
//             <div className="absolute top-14 flex flex-col items-center">
//               <div className="w-12 h-12 border border-zinc-600 rounded bg-zinc-900 flex items-center justify-center">
//                 <Icon path="chest.png" type="plain" />
//               </div>
//               <p className="text-xs mt-1 text-zinc-300">Chest</p>
//             </div>

//             {/* GLOVES */}
//             <div className="absolute top-40 right-40 flex flex-col items-center">
//               <div className="w-12 h-12 border border-zinc-600 rounded bg-zinc-900 flex items-center justify-center">
//                 <Icon path="gloves.png" type="plain" />
//               </div>
//               <p className="text-xs mt-1 text-zinc-300">Gloves</p>
//             </div>

//             {/* LEGS */}
//             <div className="absolute bottom-12 left-44 flex flex-col items-center">
//               <div className="w-12 h-12 border border-zinc-600 rounded bg-zinc-900 flex items-center justify-center">
//                 <Icon path="legs.png" type="plain" />
//               </div>
//               <p className="text-xs mt-1 text-zinc-300">Legs</p>
//             </div>

//             {/* WEAPON */}
//             <div className="absolute left-4 top-12 flex flex-col items-center">
//               <div className="w-16 h-16 border border-zinc-600 rounded bg-zinc-900 flex items-center justify-center">
//                 <Icon path="sword.png" type="plain" />
//               </div>
//               <p className="text-xs mt-1 text-zinc-300">Weapon</p>

//               {/* ENHANCEMENT */}
//               <div className="mt-2 w-10 h-10 border border-zinc-600 rounded bg-zinc-900 flex items-center justify-center">
//                 <Icon path="sharpening_stone.png" type="plain" />
//               </div>
//               <p className="text-xs text-zinc-300">Enhance</p>
//             </div>
//           </div>

//           {/* BOTTOM INVENTORY BAR */}
//           <div className="bg-zinc-900/60 rounded-lg p-3">
//             <p className="text-sm mb-2">
//               Capacity: {stateArmory.inventory.capacity}
//             </p>

//             <div className="flex gap-3 pb-1 overflow-auto">
//               {allInventoryItems.map((item, i) => (
//                 <div
//                   key={i}
//                   className="w-16 h-16 border border-zinc-600 rounded
//                            flex items-center justify-center
//                            shrink-0 bg-zinc-800 cursor-pointer"
//                 >
//                   <Icon path={`${item.id}.png`} type="plain" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ===================== RIGHT SIDE: CRAFTING ===================== */}
//         <div className="w-1/2 bg-zinc-800 rounded-lg p-4 flex flex-col gap-4">
//           <p className="text-sm uppercase tracking-wider text-zinc-300">
//             Crafting
//           </p>

//           <div className="flex-1 overflow-y-auto space-y-6 pr-2">
//             {/* WEAPONS */}
//             <div>
//               <p className="mb-3 text-zinc-300">Weapons</p>

//               {stateArmory.craftingWindow.availableCrafts.weapons.map(
//                 (el, i) => (
//                   <div
//                     key={i}
//                     className="bg-zinc-700 rounded-lg p-3 mb-4 space-y-2"
//                   >
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-3">
//                         <Icon path={el.icon} type="plain" />
//                         <p className="font-medium">{el.name}</p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <p>{el.damage}</p>
//                         <Icon path="damage.png" type="plain" />
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <Cost cost={el.cost} iconType="plain" />
//                       <ProgressBarArmory
//                         type={el.id}
//                         cost={el.cost}
//                         secsToObtain={el.secsToObtain}
//                       />
//                     </div>
//                   </div>
//                 ),
//               )}
//             </div>

//             {/* ARMOURS */}
//             <div>
//               <p className="mb-3 text-zinc-300">Armours</p>

//               {stateArmory.craftingWindow.availableCrafts.armours.map(
//                 (el, i) => (
//                   <div
//                     key={i}
//                     className="bg-zinc-700 rounded-lg p-3 mb-4 space-y-2"
//                   >
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-3">
//                         <Icon path={el.icon} type="plain" />
//                         <p className="font-medium">{el.name}</p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <p>{el.armor}</p>
//                         <Icon path="armor.png" type="plain" />
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <Cost cost={el.cost} iconType="plain" />
//                       <ProgressBarArmory
//                         type={el.id}
//                         cost={el.cost}
//                         secsToObtain={el.secsToObtain}
//                       />
//                     </div>
//                   </div>
//                 ),
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
