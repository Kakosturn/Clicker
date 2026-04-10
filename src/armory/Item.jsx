import Icon from "../components/Icon";

function Item({ slot, iconPath, positionClass }) {
  return (
    <div
      className={`absolute z-10 flex flex-col items-center gap-1 ${positionClass}`}
    >
      <div
        className="
          w-12 h-12 border border-game-border rounded-sm
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
