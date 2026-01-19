import { useState } from "react";
import { useFeatureContext } from "../context/FeaturesContext";
import { useMainContext } from "../context/MainContext";
import Furnace from "./Furnace";
import Modal from "./Modal";
function FeaturesBar() {
  const { state: stateFeatures } = useFeatureContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-6">
      {stateFeatures.furnaceUnlocked && (
        <button onClick={() => setIsOpen((prev) => !prev)}>Furnace</button>
      )}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Furnace />
      </Modal>
    </div>
  );
}

export default FeaturesBar;
