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
