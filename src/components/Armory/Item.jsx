import Icon from "../Icon";
import { useArmoryContext } from "../../context/ArmoryContext";

function Item({ slot, iconPath, positionClass }) {
  const { state: stateArmory, dispatch: dispatchArmory } = useArmoryContext();
  const equippedItem = stateArmory.equipped[slot] || null;
  return (
    <div
      className={`absolute z-10 flex flex-col items-center gap-1 ${positionClass}`}
    >
      <div
        onClick={() => {
          console.log(equippedItem);
          dispatchArmory({ type: "unequip", payload: equippedItem });
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
