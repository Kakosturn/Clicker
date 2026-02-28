import { useArmoryContext } from "../context/ArmoryContext";
import { invCapacity } from "../variables";
import Cost from "./Cost";
import Icon from "./Icon";
import ProgressBarArmory from "./ProgressBarArmory";

function Armory() {
  const { state: stateArmory, dispatch: dispatchArmory } = useArmoryContext();
  const allInventoryItems = [
    ...stateArmory.inventory.weapons,
    ...stateArmory.inventory.armours,
  ];
  // console.log(stateArmory);
  const totalArmor =
    (stateArmory.equipped.head?.armor || 0) +
    (stateArmory.equipped.shoulders?.armor || 0) +
    (stateArmory.equipped.chest?.armor || 0) +
    (stateArmory.equipped.gloves?.armor || 0) +
    (stateArmory.equipped.legs?.armor || 0);
  const totalDamage =
    (stateArmory.equipped.weapon?.damage || 0) +
    (stateArmory.equipped.enhancement?.multiplier || 0);
  function equipItem(item) {
    dispatchArmory({ type: "equip", payload: item });
  }
  return (
    <div
      className="
      w-full
      h-full
      bg-gradient-to-br from-orange-950 to-[#0f0703]
      border border-orange-900
      rounded-2xl
      p-6
      flex flex-col gap-6
      shadow-[0_0_40px_rgba(255,120,40,0.25)]
      
    "
    >
      <h2 className="text-center text-orange-300 text-4xl font-semibold">
        Armory
      </h2>

      <div className="flex gap-6">
        {/* ================= LEFT SIDE ================= */}
        <div
          className="
          w-1/2 p-6
          bg-orange-900/20
          rounded-xl
          border border-orange-800
          flex flex-col gap-4
        "
        >
          <p className="text-start font-semibold mb-4 text-orange-300">
            Inventory
          </p>

          <div
            className="
            p-6 flex relative flex-col
            bg-gradient-to-b from-[#1a0f09] to-[#0b0503]
            rounded-xl
            border border-orange-800
          "
          >
            {/* BODY + EQUIPMENT GRID */}
            <div className="relative h-64 flex justify-center items-center flex-grow mb-8">
              <img
                src="/humanFigure.png"
                alt="character"
                className="opacity-60 scale-95 -top-8 left-40 absolute"
              />

              {/* Every slot keeps YOUR position, only colors changed */}

              {/* HEAD */}
              <div className="absolute -top-4 right-12">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.head?.icon} type="plain" />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Head
                </p>
              </div>

              {/* SHOULDERS */}
              <div className="absolute top-10 right-40">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon
                    path={stateArmory.equipped.shoulders?.icon}
                    type="plain"
                  />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Shoulders
                </p>
              </div>

              {/* CHEST */}
              <div className="absolute top-16 right-14">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.chest?.icon} type="plain" />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Chest
                </p>
              </div>

              {/* GLOVES */}
              <div className="absolute top-36 right-40">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.gloves?.icon} type="plain" />
                </div>
                <p className="text-base text-center mt-1 text-orange-300">
                  Gloves
                </p>
              </div>

              {/* LEGS */}
              <div className="absolute bottom-4 right-12">
                <div
                  className="
                  w-12 h-12 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path={stateArmory.equipped.legs?.icon} type="plain" />
                </div>
                <p className="text-lg text-center mt-1 text-orange-300">Legs</p>
              </div>

              {/* WEAPON */}
              <div className="absolute left-0 top-12">
                <div
                  className="
                  w-16 h-16 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon
                    path={`${stateArmory.equipped.weapon?.icon}`}
                    type="plain"
                  />
                </div>
                <p className="text-xs text-center mt-1 text-orange-300">
                  Weapon
                </p>

                {/* ENHANCEMENT */}
                <div
                  className="
                  mt-2 w-8 h-8 border border-orange-600 rounded
                  flex items-center justify-center
                  bg-gradient-to-b from-[#22170e] to-[#160f0a]
                  shadow-inner
                "
                >
                  <Icon path="sharpening_stone.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1 text-orange-300">
                  Enhance
                </p>
              </div>
            </div>

            {/* BOTTOM INVENTORY BAR */}
            <div className="text-2xl text-orange-300">
              <p>HP : {stateArmory.hp}</p>
              <p>Armor : {totalArmor ? totalArmor : 0}</p>
              <p>Damage : {totalDamage}</p>
            </div>
            <div
              className="
               p-3
              bg-[#160f0a]
              rounded-xl
              border border-orange-800
            "
            >
              <p className="text-lg text-orange-300">
                Capacity : {stateArmory.inventory.capacity}
              </p>

              <div className="flex gap-3 pb-2 overflow-auto mt-2">
                {allInventoryItems.map((item, i) => (
                  <div
                    onClick={() => equipItem(item)}
                    key={i}
                    className="
                    w-16 h-16 border border-orange-600 rounded
                    flex items-center justify-center
                    shrink-0 cursor-pointer
                    bg-gradient-to-b from-[#22170e] to-[#160f0a]
                    shadow-inner
                  "
                  >
                    <Icon path={`${item.id}.png`} type="plain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: CRAFTING ================= */}
        <div
          className="
          w-1/2 p-6
          bg-orange-900/20
          rounded-xl
          border border-orange-800
          flex flex-col gap-4
        "
        >
          <p className="mb-8 text-orange-300 font-semibold">Crafting</p>

          <p className="text-start mb-4 text-orange-300">Available</p>

          <div
            className="
            h-96 flex flex-col overflow-y-auto gap-4
            bg-gradient-to-b from-[#1a0f09] to-[#0b0503]
            rounded-xl
            border border-orange-800
            p-4
          "
          >
            {/* WEAPONS */}
            {stateArmory.craftingWindow.availableCrafts.weapons.map((el, i) => (
              <div
                key={i}
                className="
                flex flex-col gap-2 
                bg-[#160f0a]
                rounded-lg
                p-3
                border border-orange-800
              "
              >
                <div className="flex gap-8 items-center">
                  <div className="flex items-center gap-2 text-orange-200">
                    <Icon path={el.icon} type="plain" />
                    <p>{el.name}</p>
                  </div>

                  <span className="text-orange-300">-</span>

                  <div className="flex gap-2 items-center text-orange-200">
                    <p>{el.damage}</p>
                    <Icon path={"damage.png"} type="plain" />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Cost cost={el.cost} iconType={"plain"} />
                  <ProgressBarArmory
                    type={el.id}
                    cost={el.cost}
                    secsToObtain={el.secsToObtain}
                  />
                </div>
              </div>
            ))}

            {/* ARMOURS */}
            {stateArmory.craftingWindow.availableCrafts.armours.map((el, i) => (
              <div
                key={i}
                className="
                flex flex-col gap-2
                bg-[#160f0a]
                rounded-lg
                p-3
                border border-orange-800
              "
              >
                <div className="flex gap-8 items-center">
                  <div className="flex items-center gap-2 text-orange-200">
                    <Icon path={el.icon} type="plain" />
                    <p>{el.name}</p>
                  </div>

                  <span className="text-orange-300">-</span>

                  <div className="flex gap-2 items-center text-orange-200">
                    <p>{el.armor}</p>
                    <Icon path={"armor.png"} type="plain" />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Cost cost={el.cost} iconType={"plain"} />
                  <ProgressBarArmory
                    type={el.id}
                    cost={el.cost}
                    secsToObtain={el.secsToObtain}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Armory;
