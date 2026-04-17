import { createContext, useContext, useReducer } from "react";
import { Cost } from "../utils/costClass";
import {
  secsToObtainWoodenChestArmor,
  secsToObtainIronSword,
  secsToObtainWoodenLegArmor,
  invCapacity,
  dmgIronSword,
  armorWoodenChestArmor,
  armorWoodenLegArmor,
  durWoodenChestArmor,
  durWoodenLegArmor,
  durIronSword,
  armorWoodenHeadArmor,
  secsToObtainWoodenHeadArmor,
  durWoodenHeadArmor,
  armorWoodenShoulderArmor,
  secsToObtainWoodenShoulderArmor,
  durWoodenShoulderArmor,
  armorWoodenGlovesArmor,
  secsToObtainWoodenGlovesArmor,
  durWoodenGlovesArmor,
} from "../variables";
const ArmoryContext = createContext();

const initialState = {
  equipped: {
    head: null,
    shoulders: null,
    chest: null,
    gloves: null,
    legs: null,
    weapon: null,
    enhancement: null,
  },

  amountItemInInventory: 0,
  inventory: {
    capacity: invCapacity,
    weapons: [
      // {
      //   id: "ironSword",
      //   name: "Iron Sword",
      //   amount: 0,
      //   damage: dmgIronSword,
      //   durability: durIronSword,
      // },
    ],
    armours: [
      // {
      //   id: "woodenChestArmor",
      //   name: "Wooden Chest Armor",
      //   amount: 0,
      //   armor: armorWoodenChestArmor,
      //   durability: durWoodenChestArmor,
      // },
      // {
      //   id: "woodenLegArmor",
      //   name: "Wooden Leg Armor",
      //   amount: 0,
      //   armor: armorWoodenLegArmor,
      //   durability: durWoodenLegArmor,
      // },
    ],
  },
  craftingWindow: {
    availableCrafts: {
      weapons: [
        {
          id: "ironSword",
          name: "Iron Sword",
          cost: new Cost(1, 0, 0, 0, 10),
          damage: dmgIronSword,
          icon: "ironSword.png",
          secsToObtain: secsToObtainIronSword,
          slot: "weapon",
          durability: durIronSword,
        },
        {
          id: "goldSword",
          name: "Gold Sword",
          cost: new Cost(1, 0, 0, 0, 10),
          damage: 77,
          icon: "goldSword.png",
          secsToObtain: secsToObtainIronSword,
          slot: "weapon",
          durability: durIronSword,
        },
      ],
      armours: [
        {
          id: "woodenChestArmor",
          name: "Wooden Chest Armor",
          cost: new Cost(20),
          armor: armorWoodenChestArmor,
          icon: "woodenChestArmor.png",
          secsToObtain: secsToObtainWoodenChestArmor,
          slot: "chest",
          durability: durWoodenChestArmor,
        },
        {
          id: "ironChestArmor",
          name: "Iron Chest Armor",
          cost: new Cost(20),
          armor: 13,
          icon: "ironChestArmor.png",
          secsToObtain: secsToObtainWoodenChestArmor,
          slot: "chest",
          durability: durWoodenChestArmor,
        },
        {
          id: "woodenLegArmor",
          name: "Wooden Leg Armor",
          cost: new Cost(20),
          armor: armorWoodenLegArmor,
          icon: "woodenLegArmor.png",
          secsToObtain: secsToObtainWoodenLegArmor,
          slot: "legs",
          durability: durWoodenLegArmor,
        },
        {
          id: "woodenHeadArmor",
          name: "Wooden Head Armor",
          cost: new Cost(30),
          armor: armorWoodenHeadArmor,
          icon: "woodenHeadArmor.png",
          secsToObtain: secsToObtainWoodenHeadArmor,
          slot: "head",
          durability: durWoodenHeadArmor,
        },
        {
          id: "woodenShoulderArmor",
          name: "Wooden Shoulder Armor",
          cost: new Cost(30),
          armor: armorWoodenShoulderArmor,
          icon: "woodenShoulderArmor.png",
          secsToObtain: secsToObtainWoodenShoulderArmor,
          slot: "shoulders",
          durability: durWoodenShoulderArmor,
        },
        {
          id: "woodenGlovesArmor",
          name: "Wooden Gloves Armor",
          cost: new Cost(30),
          armor: armorWoodenGlovesArmor,
          icon: "woodenGlovesArmor.png",
          secsToObtain: secsToObtainWoodenGlovesArmor,
          slot: "gloves",
          durability: durWoodenGlovesArmor,
        },
      ],
    },
  },
  unAvailableCrafts: {
    weapons: [],
    armours: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "craft": {
      const id = action.payload;
      const craftedItem =
        state.craftingWindow.availableCrafts.weapons.find(
          (el) => el.id === id,
        ) ||
        state.craftingWindow.availableCrafts.armours.find((el) => el.id === id);
      // console.log(craftedItem);
      if (!craftedItem) return state;
      const isWeapon = state.craftingWindow.availableCrafts.weapons.some(
        (el) => el.id === id,
      );
      const isArmor = state.craftingWindow.availableCrafts.armours.some(
        (el) => el.id === id,
      );

      const updatedInventory = {
        ...state.inventory,
        weapons: isWeapon
          ? [...state.inventory.weapons, craftedItem]
          : state.inventory.weapons,
        armours: isArmor
          ? [...state.inventory.armours, craftedItem]
          : state.inventory.armours,
      };

      return {
        ...state,
        inventory: updatedInventory,
        amountItemInInventory: state.amountItemInInventory + 1,
      };
    }
    // case "equip": {
    //   const item = action.payload;
    //   const itemIndexInArr =
    //     state.inventory.armours.findIndex((el) => el.id === item.id) ||
    //     state.inventory.weapons.findIndex((el) => el.id === item.id);
    //   console.log(state.inventory.armours.findIndex((el) => el.id === item.id));
    //   console.log(state.inventory.weapons.findIndex((el) => el.id === item.id));
    //   console.log(itemIndexInArr);
    //   console.log(state.inventory);
    //   return {
    //     ...state,
    //     equipped: { ...state.equipped, [item.slot]: item },
    //     inventory: {
    //       ...state.inventory,
    //       weapons: state.inventory.weapons.filter(
    //         (el, i) => i !== itemIndexInArr,
    //       ),
    //       armours: state.inventory.armours.filter(
    //         (el, i) => i !== itemIndexInArr,
    //       ),
    //     },
    //   };
    // }
    case "equip": {
      const item = action.payload;

      // 1. Find the indexes independently (no || operators)
      const armorIndex = state.inventory.armours.findIndex(
        (el) => el.id === item.id,
      );
      const weaponIndex = state.inventory.weapons.findIndex(
        (el) => el.id === item.id,
      );

      // 2. Safely remove the item ONLY from the array where it was actually found
      let newArmours =
        armorIndex !== -1
          ? state.inventory.armours.filter((_, i) => i !== armorIndex)
          : [...state.inventory.armours]; // Just copy it if not found here

      let newWeapons =
        weaponIndex !== -1
          ? state.inventory.weapons.filter((_, i) => i !== weaponIndex)
          : [...state.inventory.weapons]; // Just copy it if not found here

      // 3. GEAR SWAP LOGIC: Strictly pure, no .push() allowed!
      const previouslyEquipped = state.equipped[item.slot];

      if (previouslyEquipped) {
        if (previouslyEquipped.slot === "weapon") {
          // Create a NEW array containing the filtered weapons + the old weapon
          newWeapons = [...newWeapons, previouslyEquipped];
        } else {
          // Create a NEW array containing the filtered armor + the old armor
          newArmours = [...newArmours, previouslyEquipped];
        }
      }

      // 4. Return the new state
      return {
        ...state,
        equipped: { ...state.equipped, [item.slot]: item },
        inventory: {
          ...state.inventory,
          weapons: newWeapons,
          armours: newArmours,
        },
      };
    }
    case "unequip": {
      const item = action.payload;
      const isWeapon = item.slot === "weapon";
      return {
        ...state,
        inventory: {
          ...state.inventory,
          weapons: [...state.inventory.weapons, ...(isWeapon ? [item] : [])],
          armours: [...state.inventory.armours, ...(!isWeapon ? [item] : [])],
        },
        equipped: { ...state.equipped, [item.slot]: null },
      };
    }
    default: {
      return state;
    }
  }
}

function ArmoryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArmoryContext.Provider value={{ state, dispatch }}>
      {children}
    </ArmoryContext.Provider>
  );
}

function useArmoryContext() {
  const armoryContext = useContext(ArmoryContext);

  if (armoryContext === undefined)
    return new Error("context was used outside of its scope");
  return armoryContext;
}

export { ArmoryProvider, useArmoryContext };
