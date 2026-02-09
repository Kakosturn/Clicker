import { createContext, useContext, useReducer } from "react";
import { Cost } from "./MainContext";
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
          id: "woodenLegArmor",
          name: "Wooden Leg Armor",
          cost: new Cost(20),
          armor: armorWoodenLegArmor,
          icon: "woodenChestArmor.png",
          secsToObtain: secsToObtainWoodenLegArmor,
          slot: "legs",
          durability: durWoodenLegArmor,
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
      console.log(craftedItem);
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
    case "equip": {
      const item = action.payload;
      console.log(item);
      // const correctSlot = Object.keys(state.equipped).find(
      //   (el) => el === item.slot,
      // );
      // const isWeapon = state.craftingWindow.availableCrafts.weapons.some(
      //   (el) => el.id === item.id,
      // );
      // const isArmor = state.craftingWindow.availableCrafts.armours.some(
      //   (el) => el.id === item.id,
      // );
      // console.log(correctSlot, isWeapon, isArmor);
      // const inventoryUpdated = {
      //   ...state.inventory,
      //   weapons: isWeapon
      //     ? state.inventory.weapons.filter((el) => el.id !== item.id)
      //     : state.inventory.weapons,
      //   armours: isArmor
      //     ? state.inventory.armours.filter((el) => el.id !== item.id)
      //     : state.inventory.armours,
      // };
      return {
        ...state,
        equipped: { ...state.equipped, [item.slot]: item },
        inventory: {
          ...state.inventory,
          weapons: state.inventory.weapons.filter((el) => el.id !== item.id),
          armours: state.inventory.armours.filter((el) => el.id !== item.id),
        },
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
