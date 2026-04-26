import { Cost } from "./utils/costClass";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const clicksToObtainWood = 2;
export const clicksToObtainStone = 6;
export const clicksToObtainMeat = 7;
export const clicksToObtainIronOre = 10;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//
// Buildings
//
//
export const requiredShackForCabin = 1;
export const requiredCabinForBungalow = 1;
export const requiredBungalowForHouse = 1;
export const requiredHouseForArsenal = 1;

export const popIncreaseShack = 10;
export const popIncreaseCabin = 20;
export const popIncreaseBungalow = 30;
export const popIncreaseHouse = 40;
export const popIncreaseArsenal = 0;

export const secsToBuildShack = 1;
export const secsToBuildCabin = 1;
export const secsToBuildBungalow = 1;
export const secsToBuildHouse = 1;
export const secsToBuildArsenal = 1;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//
//Armory
//
//
export const invCapacity = 12;
export const secsToObtainIronSword = 2;
export const secsToObtainWoodenChestArmor = 1;
export const secsToObtainWoodenLegArmor = 1;
export const secsToObtainWoodenShoulderArmor = 1;
export const secsToObtainWoodenGlovesArmor = 1;
export const secsToObtainWoodenHeadArmor = 1;

export const dmgIronSword = 5;
export const durIronSword = 10;

export const armorWoodenChestArmor = 5;
export const durWoodenChestArmor = 10;
export const armorWoodenLegArmor = 4;
export const durWoodenLegArmor = 10;
export const armorWoodenHeadArmor = 5;
export const durWoodenHeadArmor = 10;
export const armorWoodenGlovesArmor = 5;
export const durWoodenGlovesArmor = 10;
export const armorWoodenShoulderArmor = 5;
export const durWoodenShoulderArmor = 10;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//Expedition
// export const maxMeatToBring = 20;
export const meatUsedPerMovement = 2;
export const maxHp = 20;
export const gridSize = 31;
export const maximumMeatBrought = 20;

export function createEnemy(type) {
  const configs = {
    smallEnemy: {
      hp: [10, 13, 15, 17],
      armor: [0, 2, 3, 4],
      dmg: [3, 4, 5, 6],
    },
    mediumEnemy: {
      hp: [20, 25, 30],
      armor: [3, 5, 7],
      dmg: [6, 8, 10],
    },
    hardEnemy: {
      hp: [35, 40, 45],
      armor: [5, 7, 9],
      dmg: [11, 12, 13],
    },
  };

  const base = configs[type];

  return {
    type,
    hp: base.hp[getRandomInt(base.hp.length)],
    armor: base.armor[getRandomInt(base.armor.length)],
    dmg: base.dmg[getRandomInt(base.dmg.length)],
  };
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Upgrades

export const requiredWoodForGathering1Upgrade = 100;
export const requiredStoneForGathering1Upgrade = 100;
export const requiredMeatForGathering1Upgrade = 100;

export const secsForLumberMillUpgrade = 10;

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
    tooltip: "Increases wood gathering efficiency for venatrix by ANAN",
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
    tooltip: "Increases stone gathering efficiancy for venatrix by ANANN",
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
    tooltip: "daha fazla topla",
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
    tooltip: "Increased meat capacity for expedition",
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
