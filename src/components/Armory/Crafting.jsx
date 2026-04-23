import { useArmoryStore } from "../../stores/useArmoryStore";
import Cost from "../Cost";
import Icon from "../Icon";
import ProgressBarArmory from "../ProgressBarArmory";

function Crafting() {
  const craftingWindow = useArmoryStore((state) => state.craftingWindow); 
  return (
    // FIX 3: Added h-full and flex-col so it matches the left side perfectly
    <div className="w-1/2 p-6 bg-game-monolith rounded-xs border border-game-border flex flex-col gap-6 shadow-inner h-full">
      <p className="font-bold tracking-wider text-game-ichor shrink-0">
        Crafting
      </p>

      {/* FIX 4: Added min-h-0 here. This forces the scrollbar to appear instead of stretching infinitely downward! */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto gap-4 bg-game-panel rounded-xs border border-game-border p-4 custom-scrollbar">
        {/* WEAPONS */}
        {craftingWindow.availableCrafts.weapons.map((el, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 bg-game-monolith rounded-xs p-2 border border-game-border shadow-md transition-colors hover:border-gray-600 shrink-0"
          >
            <div className="flex justify-between items-center border-b border-game-border pb-2">
              <div className="flex items-center gap-3 text-white font-bold tracking-wide">
                <Icon path={el.icon} type="plain" width="w-6" />
                <p className="uppercase text-sm">{el.name}</p>
              </div>

              <div className="flex gap-2 items-center px-2 py-1 rounded-xs">
                <p className="text-game-ichor font-mono font-bold text-lg">
                  {el.damage}
                </p>
                <Icon path={"damage.png"} type="plain" className={"w-6"} />
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <Cost cost={el.cost} iconType={"plain"} />
              </div>
              <div className="w-32">
                <ProgressBarArmory
                  type={el.id}
                  cost={el.cost}
                  secsToObtain={el.secsToObtain}
                />
              </div>
            </div>
          </div>
        ))}

        {/* ARMOURS */}
        {craftingWindow.availableCrafts.armours.map((el, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 bg-game-monolith rounded-xs p-2 border border-game-border shadow-md transition-colors hover:border-gray-600 shrink-0"
          >
            <div className="flex justify-between items-center border-b border-game-border pb-2">
              <div className="flex items-center gap-3 text-white font-bold tracking-wide">
                <Icon path={el.icon} type="plain" width="w-6" />
                <p className="uppercase text-sm">{el.name}</p>
              </div>

              <div className="flex gap-2 items-center px-2 py-1 rounded-xs">
                <p className="text-game-ichor font-mono font-bold text-lg">
                  {el.armor}
                </p>
                <Icon path={"armor.png"} type="plain" className="w-6" />
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <Cost cost={el.cost} iconType={"plain"} />
              </div>
              <div className="w-32">
                <ProgressBarArmory
                  type={el.id}
                  cost={el.cost}
                  secsToObtain={el.secsToObtain}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crafting;
