import { useState } from "react";
import { useFeatureContext } from "../context/FeaturesContext";
import { useMainContext } from "../context/MainContext";
import Furnace from "./Furnace";
import Modal from "./Modal";
import Armory from "./Armory";
function FeaturesBar() {
  const { state: stateFeatures } = useFeatureContext();
  const [isFurnaceOpen, setIsFurnaceOpen] = useState(false);
  const [isArmoryOpen, setIsArmoryOpen] = useState(false);
  console.log(stateFeatures);
  console.log(stateFeatures.furnaceUnlocked);
  return (
    <div className="flex bg-features py-8 px-12 gap-24">
      <div>
        {stateFeatures.furnaceUnlocked && (
          <button onClick={() => setIsFurnaceOpen((prev) => !prev)}>
            Furnace
          </button>
        )}
        <Modal isOpen={isFurnaceOpen} setIsOpen={setIsFurnaceOpen}>
          <Furnace />
        </Modal>
      </div>
      <div>
        {stateFeatures.armoryUnlocked && (
          <button onClick={() => setIsArmoryOpen((prev) => !prev)}>
            Armory
          </button>
        )}

        <Modal isOpen={isArmoryOpen} setIsOpen={setIsArmoryOpen}>
          <Armory />
        </Modal>
      </div>
    </div>
  );
}

export default FeaturesBar;
