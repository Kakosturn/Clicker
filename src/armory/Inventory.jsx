import Icon from "../components/Icon";
import { useArmoryContext } from "../context/ArmoryContext";
import { useExpeditionContext } from "../context/ExpeditionContext";

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
    dispatchArmory({ type: "equip", payload: item });
  }

  return (
    <>
      {/* STATS BAR */}
      <div className="flex justify-between items-center bg-game-monolith border border-game-border p-2 rounded-sm">
        <div className="flex flex-col items-center w-1/3 border-r border-game-border">
          <span className="text-sm tracking-wider text-gray-500">HP</span>
          <span className="text-white font-mono text-sm">
            {stateExpedition.player.hp}
          </span>
        </div>
        <div className="flex flex-col items-center w-1/3 border-r border-game-border">
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
      <div className="p-3 bg-game-monolith rounded-sm border border-game-border flex flex-col h-32">
        <div className="flex justify-between items-end mb-3 border-b border-game-border pb-2">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Inventory
          </p>
          <p className="text-xs font-mono text-gray-500">
            {allInventoryItems.length} / {stateArmory.inventory.capacity}
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {allInventoryItems.map((item, i) => (
            <div
              onClick={() => equipItem(item)}
              key={i}
              className="
                w-14 h-14 border border-game-border rounded-sm 
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
