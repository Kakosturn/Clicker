import {
  requiredMeatForGathering1Upgrade,
  requiredStoneForGathering1Upgrade,
  requiredWoodForGathering1Upgrade,
} from "../variables";
import { Cost } from "./costClass";

export const upgradeList = [
  {
    name: "Lumber Mill",
    id: "lumberMill",
    unlocked: (gameState) =>
      gameState.stateBuildings.buildings.find((el) => el.id === "shack")
        .builtAmount >= 10,
    visible: (gameState) =>
      gameState.stateBuildings.buildings.find((el) => el.id === "shack")
        .builtAmount >= 5,

    cost: new Cost(100),
    unlockedTooltip: "Increases wood gathering efficiency for venatrix by ANAN",
    visibleTooltip: "Wish you had a chainsaw",
    path: "upgradeLumberMill.png",
    secsToAcquire: 1,
    type: "upgradeLumberMill",
    effect: { target: "venatrix", multiplier: { wood: 1.2 } },
  },
  //
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //
  {
    name: "Quarry",
    id: "quarry",
    unlocked: (gameState) =>
      gameState.stateBuildings.buildings.find((el) => el.id === "bungalow")
        .builtAmount >= 10,
    visible: (gameState) =>
      gameState.stateBuildings.buildings.find((el) => el.id === "bungalow")
        .builtAmount >= 5,

    cost: new Cost(0, 100),
    unlockedTooltip:
      "Increases stone gathering efficiancy for venatrix by ANANN",
    visibleTooltip: "You got stone dust all over you",
    path: "upgradeQuarry.png",
    secsToAcquire: 1,
    type: "upgradeQuarry",
    effect: { target: "venatrix", multiplier: { stone: 1.2 } },
  },
  //
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //
  {
    name: "Gathering - 1",
    id: "gathering1",
    unlocked: (gameState) => {
      if (
        gameState.stateMain.resources.wood.total >
          requiredWoodForGathering1Upgrade &&
        gameState.stateMain.resources.meat.total >
          requiredMeatForGathering1Upgrade &&
        gameState.stateMain.resources.stone.total >
          requiredStoneForGathering1Upgrade
      ) {
        return true;
      } else return false;
    },
    visible: (gameState) => {
      if (
        gameState.stateMain.resources.wood.total >
          Math.round(requiredWoodForGathering1Upgrade / 2) &&
        gameState.stateMain.resources.meat.total >
          Math.round(requiredMeatForGathering1Upgrade / 2) &&
        gameState.stateMain.resources.stone.total >
          Math.round(requiredStoneForGathering1Upgrade / 2)
      ) {
        return true;
      } else return false;
    },
    cost: new Cost(100),
    unlockedTooltip: "daha fazla topla",
    visibleTooltip: "You are getting better at this",
    path: "upgradeGathering1.png",
    secsToAcquire: 1,
    type: "upgradeGathering1",
    effect: {
      target: "self",
      multiplier: { wood: 1.2, stone: 1.2, meat: 1.2 },
    },
  },
  {
    name: "Expedition Meat Capacity - 1",
    id: "meatCapacityExpedition",
    unlocked: (gameState) => gameState.stateExpedition.playerMoveCount > 5,
    visible: (gameState) => gameState.stateFeatures.expeditionUnlocked,
    cost: new Cost(0, 0, 100),
    unlockedTooltip: "Increased meat capacity for expedition",
    visibleTooltip: "Wish you could explore more",
    path: "upgradeMeatExpedition1.png",
    secsToAcquire: 1,
    type: "upgradeMeatExpedition1",
    effect: {
      target: "expedition",
      stat: "maxMeatBrought",
      value: 10,
    },
  },
  //
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //
];
