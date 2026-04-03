// import { useState } from "react";
// import { useFeatureContext } from "../context/FeaturesContext";
// import { useMainContext } from "../context/MainContext";
// import Furnace from "./Furnace";
// import Modal from "./Modal";
// import Armory from "./Armory";
// import Expedition from "./Expedition/Expedition";
// function FeaturesBar() {
//   const { state: stateFeatures } = useFeatureContext();
//   const [isFurnaceOpen, setIsFurnaceOpen] = useState(false);
//   const [isArmoryOpen, setIsArmoryOpen] = useState(false);
//   const [isExpeditionOpen, setIsExpeditionOpen] = useState(false);
//   // console.log(stateFeatures);
//   // console.log(stateFeatures.furnaceUnlocked);
//   return (
//     <div className="flex bg-features py-8 px-12 gap-24 text-2xl">
//       <div>
//         {stateFeatures.furnaceUnlocked && (
//           <button onClick={() => setIsFurnaceOpen((prev) => !prev)}>
//             Furnace
//           </button>
//         )}
//         <Modal isOpen={isFurnaceOpen} setIsOpen={setIsFurnaceOpen}>
//           <Furnace />
//         </Modal>
//       </div>
//       <div>
//         {stateFeatures.armoryUnlocked && (
//           <button onClick={() => setIsArmoryOpen((prev) => !prev)}>
//             Armory
//           </button>
//         )}

//         <Modal isOpen={isArmoryOpen} setIsOpen={setIsArmoryOpen}>
//           <Armory />
//         </Modal>
//       </div>
//       <div>
//         {stateFeatures.expeditionUnlocked && (
//           <button onClick={() => setIsExpeditionOpen((prev) => !prev)}>
//             Expedition
//           </button>
//         )}

//         <Modal isOpen={isExpeditionOpen} setIsOpen={setIsExpeditionOpen}>
//           <Expedition />
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default FeaturesBar;

import { useState } from "react";
import { motion } from "motion/react";
import { useFeatureContext } from "../context/FeaturesContext";
import Furnace from "./Furnace";
import Modal from "./Modal";
import Armory from "./Armory";
import Expedition from "./Expedition/Expedition";

function FeaturesBar() {
  const { state: stateFeatures } = useFeatureContext();
  const [isFurnaceOpen, setIsFurnaceOpen] = useState(false);
  const [isArmoryOpen, setIsArmoryOpen] = useState(false);
  const [isExpeditionOpen, setIsExpeditionOpen] = useState(false);

  // Reusable button style class
  const tabClassName = `
    px-6 py-3 tracking-wider 
    font-bold text-xl 
    border border-game-border rounded-md 
    bg-game-panel text-gray-400 
    transition-colors duration-200
    hover:border-game-ichor/50
  `;

  return (
    <div className="flex items-center bg-game-monolith border-b-2 border-game-border py-6 px-12 gap-10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative z-20">
      {/* Furnace Tab */}
      <div>
        {stateFeatures.furnaceUnlocked && (
          <motion.button
            whileHover={{
              scale: 1.05,
              color: "#B9FF24",
              textShadow: "0px 0px 8px rgba(185,255,36,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFurnaceOpen((prev) => !prev)}
            className={tabClassName}
          >
            Furnace
          </motion.button>
        )}
        <Modal isOpen={isFurnaceOpen} setIsOpen={setIsFurnaceOpen}>
          <Furnace />
        </Modal>
      </div>

      {/* Armory Tab */}
      <div>
        {stateFeatures.armoryUnlocked && (
          <motion.button
            whileHover={{
              scale: 1.05,
              color: "#B9FF24",
              textShadow: "0px 0px 8px rgba(185,255,36,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsArmoryOpen((prev) => !prev)}
            className={tabClassName}
          >
            Armory
          </motion.button>
        )}
        <Modal isOpen={isArmoryOpen} setIsOpen={setIsArmoryOpen}>
          <Armory />
        </Modal>
      </div>

      {/* Expedition Tab */}
      <div>
        {stateFeatures.expeditionUnlocked && (
          <motion.button
            whileHover={{
              scale: 1.05,
              color: "#B9FF24",
              textShadow: "0px 0px 8px rgba(185,255,36,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpeditionOpen((prev) => !prev)}
            className={tabClassName}
          >
            Expedition
          </motion.button>
        )}
        <Modal isOpen={isExpeditionOpen} setIsOpen={setIsExpeditionOpen}>
          <Expedition />
        </Modal>
      </div>
    </div>
  );
}

export default FeaturesBar;
