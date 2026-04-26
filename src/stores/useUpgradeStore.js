import { upgradeList } from "../variables";
import { create } from "zustand";
import { useMainStore } from "./useMainStore";
import { useBuildingStore } from "./useBuildingStore";
import { useArmoryStore } from "./useArmoryStore";
import { useExpeditionStore } from "./useExpeditionStore";
import { usePopulationStore } from "./usePopulationStore";
import { useFeaturesStore } from "./useFeaturesStore";
const initialState = {
  multiplierSelf: {
    wood: 1,
    stone: 1,
    meat: 1,
    ironOre: 1,
    // gatheringUpgradeCounter: 0,
  },
  // upgradeList: upgradeList,
  upgradesCompleted: [],
  upgradesVisible: [],
  upgradesUnlocked: [],
  multiplierVenatrix: {
    wood: 1,
    stone: 1,
    meat: 1,
    ironOre: 1,
  },
};

export const useUpgradeStore = create((set) => ({
  ...initialState,
  upgradeEvaluation: () =>
    set((state) => {
      //  const { upgradesCompleted } = get();

      // Grab the live snapshots
      const gameState = {
        stateMain: useMainStore.getState(),
        stateBuildings: useBuildingStore.getState(),
        stateArmory: useArmoryStore.getState(),
        stateExpedition: useExpeditionStore.getState(),
        statePop: usePopulationStore.getState(),
        stateFeatures: useFeaturesStore.getState(),
      };
      const currentlyUnlocked = upgradeList.filter(
        (upgrade) =>
          !state.upgradesCompleted.includes(upgrade.id) &&
          upgrade.unlocked(gameState),
      );
      // console.log(currentlyUnlocked);
      const currentlyVisible = upgradeList.filter(
        (upgrade) =>
          !state.upgradesCompleted.includes(upgrade.id) &&
          !upgrade.unlocked(gameState) &&
          upgrade.visible(gameState),
      );
      // console.log(currentlyVisible);
      return {
        upgradesVisible: currentlyVisible,
        upgradesUnlocked: currentlyUnlocked,
      };
    }),

  upgrade: (payload) =>
    set((state) => {
      const upgrade = payload;

      if (payload.effect.target === "expedition") {
        // Send it straight to the Expedition Store!
        useExpeditionStore.getState().applyMaxMeatUpgrade(payload.effect);
      } else if (
        payload.effect.target === "self" ||
        payload.effect.target === "venatrix"
      ) {
        // console.log(upgrade);
        // 1. Determine which multiplier object to target dynamically
        // If target is "self", targetKey becomes "multiplierSelf"
        const targetKey =
          upgrade.effect.target === "self"
            ? "multiplierSelf"
            : "multiplierVenatrix";
        const currentMultipliers = state[targetKey];
        const newMultipliers = { ...currentMultipliers };
        // 2. Grab a copy of the current multipliers so we can mutate it locally

        // 3. Loop through the upgrade's multipliers and apply the math
        // Example: entries = [ ["wood", 1.2], ["stone", 1.2], ["meat", 1.2] ]
        for (const [resource, factor] of Object.entries(
          upgrade.effect.multiplier,
        )) {
          // Safety check: only multiply if the resource exists in our state
          if (newMultipliers[resource] !== undefined) {
            // newMultipliers["wood"] = 1 * 1.2
            newMultipliers[resource] = newMultipliers[resource] * factor;
          }
        }
        // 4. Return the beautifully updated state!
        return {
          // Dynamically overwrite either multiplierSelf or multiplierVenatrix
          [targetKey]: newMultipliers,

          // Add the upgrade ID to our completed list
          upgradesCompleted: [...state.upgradesCompleted, upgrade.id],
          upgradesUnlocked: state.upgradesUnlocked.filter(
            (u) => u.id !== upgrade.id,
          ),
          upgradesVisible: state.upgradesVisible.filter(
            (u) => u.id !== upgrade.id,
          ),
        };
      }
      return {
        upgradesCompleted: [...state.upgradesCompleted, upgrade.id],
        upgradesUnlocked: state.upgradesUnlocked.filter(
          (u) => u.id !== upgrade.id,
        ),
        upgradesVisible: state.upgradesVisible.filter(
          (u) => u.id !== upgrade.id,
        ),
      };
    }),
}));
