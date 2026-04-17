import Icon from "../Icon";
import { errorToast } from "../Toast";
import { useArmoryContext } from "../../context/ArmoryContext";
import { useExpeditionContext } from "../../context/ExpeditionContext";

function Inventory() {
  const { state: stateArmory, dispatch: dispatchArmory } = useArmoryContext();
  const { state: stateExpedition } = useExpeditionContext();
  const allInventoryItems = [
    ...stateArmory.inventory.weapons,
    ...stateArmory.inventory.armours,
  ];

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
    console.log(item.slot);
    console.log(stateArmory.equipped);
    console.log(stateArmory.equipped[item.slot]);
    // if (stateArmory.equipped[item.slot]) {
    //   console.log(`item equipped in ${item.slot} slot`);
    //   errorToast("Item equipped in that slot");
    //   return;
    // }
    dispatchArmory({ type: "equip", payload: item });
  }

  return (
    <>
      {/* STATS BAR */}
      <div className="flex justify-between items-center bg-game-monolith border border-game-border p-2 rounded-xs">
        <div className="flex flex-col items-center w-1/3">
          <span className="text-sm tracking-wider text-gray-500">HP</span>
          <span className="text-white font-mono text-sm">
            {stateExpedition.player.hp}
          </span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <span className="text-sm tracking-wider text-gray-500">Armor</span>
          <span className="text-white font-mono text-sm">
            {totalArmor ? totalArmor : 0}
          </span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <span className="text-sm tracking-wider text-game-ichor">Damage</span>
          <span className="text-game-ichor font-bold font-mono text-sm">
            {totalDamage}
          </span>
        </div>
      </div>

      {/* STORAGE CACHE */}
      <div className="p-3 w-full bg-game-monolith rounded-xs border border-game-border flex flex-col h-32">
        <div className="flex justify-between items-end mb-3 border-b border-game-border pb-2">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Inventory
          </p>
          <p className="text-xs font-mono text-gray-500">
            {allInventoryItems.length} / {stateArmory.inventory.capacity}
          </p>
        </div>

        <div className="flex gap-3 h-14 overflow-y-hidden overflow-x-auto pb-2 scrollbar-thin scrollbar-track-amber-950 scrollbar-thumb-amber-300">
          {allInventoryItems.map((item, i) => (
            <div
              onClick={() => equipItem(item)}
              key={i}
              className="
                w-12 h-12 border border-game-border rounded-xs 
                flex items-center justify-center shrink-0 cursor-pointer 
                bg-game-panel shadow-inner transition-colors 
                hover:scale-105 hover:border-game-ichor
              "
            >
              <Icon path={`${item.id}.png`} type="plain" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Inventory;
