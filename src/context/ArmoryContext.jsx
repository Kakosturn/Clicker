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
  equipped: {},
  amountItemInInventory: 0,
  inventory: {
    capacity: invCapacity,
    weapons: [
      {
        id: "ironSword",
        name: "Iron Sword",
        amount: 0,
        damage: dmgIronSword,
        durability: durIronSword,
      },
    ],
    armours: [
      {
        id: "woodenChestArmor",
        name: "Wooden Chest Armor",
        amount: 0,
        armor: armorWoodenChestArmor,
        durability: durWoodenChestArmor,
      },
      {
        id: "woodenLegArmor",
        name: "Wooden Leg Armor",
        amount: 0,
        armor: armorWoodenLegArmor,
        durability: durWoodenLegArmor,
      },
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
          icon: "iron-sword.png",
          secsToObtain: secsToObtainIronSword,
        },
      ],
      armours: [
        {
          id: "woodenChestArmor",
          name: "Wooden Chest Armor",
          cost: new Cost(20),
          armor: armorWoodenChestArmor,
          icon: "wooden-chest-armor.png",
          secsToObtain: secsToObtainWoodenChestArmor,
        },
        {
          id: "woodenLegArmor",
          name: "Wooden Leg Armor",
          cost: new Cost(20),
          armor: armorWoodenLegArmor,
          icon: "wooden-chest-armor.png",
          secsToObtain: secsToObtainWoodenLegArmor,
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
      const isWeapon = state.inventory.weapons.some((el) => el.id === id);
      const isArmor = state.inventory.armours.some((el) => el.id === id);

      const updatedInventory = {
        ...state.inventory,
        weapons: isWeapon
          ? state.inventory.weapons.map((item) =>
              item.id === id ? { ...item, amount: item.amount + 1 } : item,
            )
          : state.inventory.weapons,

        armours: isArmor
          ? state.inventory.armours.map((item) =>
              item.id === id ? { ...item, amount: item.amount + 1 } : item,
            )
          : state.inventory.armours,
      };

      return {
        ...state,
        inventory: updatedInventory,
        amountItemInInventory: state.amountItemInInventory + 1,
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
