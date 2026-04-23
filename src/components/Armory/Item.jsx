import { useArmoryStore } from "../../stores/useArmoryStore";
import Icon from "../Icon";

function Item({ slot, iconPath, positionClass }) {
  const equippedItem = useArmoryStore((state) => state.equipped[slot]);
  const unequip = useArmoryStore((state) => state.unequip);
  return (
    <div
      className={`absolute z-10 flex flex-col items-center gap-1 ${positionClass}`}
    >
      <div
        onClick={() => {
          console.log(equippedItem);
          unequip(equippedItem);
        }}
        className="
          w-8 h-8 border border-game-border rounded-xs
          flex items-center justify-center
          bg-game-monolith shadow-inner
          transition-colors hover:border-gray-500
        "
      >
        <Icon path={iconPath} type="plain" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
        {slot}
      </p>
    </div>
  );
}

export default Item;
