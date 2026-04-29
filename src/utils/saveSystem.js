import { useMainStore } from "../stores/useMainStore";
import { useBuildingStore } from "../stores/useBuildingStore";
import { useArmoryStore } from "../stores/useArmoryStore";
import { useExpeditionStore } from "../stores/useExpeditionStore";
import { usePopulationStore } from "../stores/usePopulationStore";
import { useUpgradeStore } from "../stores/useUpgradeStore";
import { Cost } from "./costClass";
import { useFeaturesStore } from "../stores/useFeaturesStore";

const saveKey = "venatrix_save_slot_1";

export const saveGame = () => {
  // 1. Gather the snapshot
  const saveData = {
    stateArmory: useArmoryStore.getState(),
    stateBuildings: useBuildingStore.getState(),
    stateExpedition: useExpeditionStore.getState(),
    stateFeatures: useFeaturesStore.getState(),
    stateMain: useMainStore.getState(),
    statePop: usePopulationStore.getState(),
    stateUpgrades: useUpgradeStore.getState(),

    // CRITICAL: Save the exact time they closed the game!
    lastSavedAt: Date.now(),
  };

  // 2. Convert to string and save to the browser
  localStorage.setItem(saveKey, JSON.stringify(saveData));
  console.log("Game auto-saved!");
};

export const loadGame = () => {
  const saveString = localStorage.getItem(saveKey);
  if (!saveString) return false;

  try {
    const savedData = JSON.parse(saveString);

    // 1. Get a FRESH copy of the buildings (with all the functions intact)
    const freshBuildings = useBuildingStore.getState().buildings;

    // 2. REHYDRATE: Loop through the fresh buildings and overwrite only the numbers!
    const rehydratedBuildings = freshBuildings.map((freshBuilding) => {
      // Find the matching saved data
      const savedBuilding = savedData.stateBuildings.buildings.find(
        (b) => b.id === freshBuilding.id,
      );
      const restoredCost = new Cost(
        savedBuilding.cost.wood,
        savedBuilding.cost.stone,
        savedBuilding.cost.meat,
        savedBuilding.cost.ironOre,
        savedBuilding.cost.ironBar,
      );
      // If we found it, merge the saved numbers (like builtAmount) into the fresh object
      if (savedBuilding) {
        return {
          ...freshBuilding, // Keeps the functions!
          ...savedBuilding, // Overwrites builtAmount, etc.
          cost: restoredCost,
        };
      }
      return freshBuilding;
    });

    // 3. Now put the fixed array into your saved data object before updating the store
    savedData.stateBuildings.buildings = rehydratedBuildings;

    // 4. Update the stores normally
    useMainStore.setState(savedData.stateMain);
    useBuildingStore.setState(savedData.stateBuildings);
    useFeaturesStore.setState(savedData.stateFeatures);
    usePopulationStore.setState(savedData.statePop);
    useExpeditionStore.setState(savedData.stateExpedition);
    useUpgradeStore.setState(savedData.stateUpgrades);
    useArmoryStore.setState(savedData.stateArmory);
    // ... update other stores

    return savedData.lastSavedAt;
  } catch (error) {
    console.error("Save file is corrupted!", error);
    return false;
  }
};
