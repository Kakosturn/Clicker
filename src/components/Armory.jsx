import { useArmoryContext } from "../context/ArmoryContext";
import { invCapacity } from "../variables";
import Cost from "./Cost";
import Icon from "./Icon";
import ProgressBarArmory from "./ProgressBarArmory";

function Armory() {
  const { state: stateArmory } = useArmoryContext();
  // craftingWindow: {
  //     availableCrafts: {
  //       weapons: [
  //         {
  //           id: "ironSword",
  //           name: "Iron Sword",
  //           cost: new Cost(1, 0, 0, 0, 10),
  //           damage: 5,
  //         },
  //       ],
  //       armours: [
  //         {
  //           id: "woodenArmor",
  //           name: "Wooden Armor",
  //           cost: new Cost(20),
  //           armor: 5,
  //         },
  //       ],
  //     },
  //   },
  // console.log(stateArmory);
  return (
    <div>
      <h2 className="text-center p-6">Armory</h2>
      <div className="flex">
        <div className="w-1/2 p-6">
          <p className="text-start  font-semibold mb-4">Inventory</p>
          <div className="p-6 flex relative flex-col">
            {/* --- BODY + EQUIPMENT GRID --- */}
            <div className="relative flex justify-center items-center flex-grow">
              {/* Human silhouette (center) */}
              <img
                src="/human-figure.png"
                alt="character"
                className="opacity-70 scale-150"
              />

              {/* HEAD */}
              <div className="absolute -top-16 right-56">
                <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
                  <Icon path="helmet.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1">Head</p>
              </div>

              {/* SHOULDERS */}
              <div className="absolute top-4 left-40">
                <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
                  <Icon path="shoulder.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1">Shoulders</p>
              </div>

              {/* CHEST */}
              <div className="absolute top-12 ">
                <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
                  <Icon path="chest.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1">Chest</p>
              </div>

              {/* GLOVES */}
              <div className="absolute top-40 right-44">
                <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
                  <Icon path="gloves.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1">Gloves</p>
              </div>

              {/* LEGS */}
              <div className="absolute bottom-[4rem] left-48">
                <div className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900">
                  <Icon path="legs.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1">Legs</p>
              </div>

              {/* WEAPON (side slot) */}
              <div className="absolute left-0 top-12">
                <div className="w-16 h-16 border rounded flex items-center justify-center bg-zinc-900">
                  <Icon path="sword.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1">Weapon</p>
              </div>

              {/* WEAPON ENHANCEMENT (small slot under weapon) */}
              <div className="absolute left-0 top-18">
                <div className="w-8 h-8 border rounded flex items-center justify-center bg-zinc-900">
                  <Icon path="sharpening_stone.png" type="plain" />
                </div>
                <p className="text-xs text-center mt-1">Enhance</p>
              </div>
            </div>

            {/* --- BOTTOM SLIDING INVENTORY BAR --- */}
            <div className="mt-24">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[...Array(invCapacity)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 border rounded flex items-center justify-center bg-zinc-900"
                  >
                    <Icon path="empty_slot.png" type="plain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-6">
          <p className="mb-8">Crafting</p>
          <div>
            <p className="text-start mb-8">Available</p>
            <div className="h-48 flex flex-col overflow-y-auto ">
              <div>
                {stateArmory.craftingWindow.availableCrafts.weapons.map(
                  (el, i) => {
                    // const item = stateArmory.craftingWindow.availableCrafts[el][0];
                    // console.log(el);
                    return (
                      <div className="flex flex-col gap-1 mb-4" key={i}>
                        <div className="flex gap-8">
                          <div className="flex">
                            <Icon path={el.icon} type="plain" />
                            <p>{el.name}</p>
                          </div>
                          <span>-</span>
                          <div className="flex gap-2">
                            <div className="flex">
                              <p>{el.damage}</p>
                              <Icon path={"sword.png"} type="plain" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Cost cost={el.cost} iconType={"plain"} />
                          <ProgressBarArmory
                            type={el.id}
                            cost={el.cost}
                            secsToObtain={el.secsToObtain}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
              <div className="flex flex-col gap-4">
                {stateArmory.craftingWindow.availableCrafts.armours.map(
                  (el, i) => {
                    // const item = stateArmory.craftingWindow.availableCrafts[el][0];
                    // console.log(el);
                    return (
                      <div className="flex flex-col gap-1" key={i}>
                        <div className="flex gap-8">
                          <div className="flex">
                            <Icon path={el.icon} type="plain" />
                            <p>{el.name}</p>
                          </div>
                          <span>-</span>
                          <div className="flex gap-2">
                            <div className="flex">
                              <p>{el.armor}</p>
                              <Icon path={"armor.png"} type="plain" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Cost cost={el.cost} iconType={"plain"} />
                          <ProgressBarArmory
                            type={el.id}
                            cost={el.cost}
                            secsToObtain={el.secsToObtain}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
            <div>
              <p className="text-start">Unavailable</p>
              <div className="h-48 overflow-y-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Armory;
