import Icon from "../Icon";
import Item from "./Item";
import Crafting from "./Crafting";
import Inventory from "./Inventory";
import { useArmoryStore } from "../../stores/useArmoryStore";

function Armory() {
  const equipped = useArmoryStore((state) => state.equipped);
  return (
    // FIX 1: Clamped the height to 85% of the viewport height so it never goes off-screen
    // Added flex flex-col so the internal sections know how to calculate their remaining space
    <div className="w-full h-[85vh] min-h-150 bg-game-panel border border-game-border rounded-xs p-8 flex flex-col gap-6 shadow-2xl text-gray-300">
      <h2 className="text-center text-game-ichor text-3xl font-bold uppercase tracking-widest border-b border-game-border pb-4 shrink-0">
        Armory
      </h2>

      {/* FIX 2: Added flex-1 and min-h-0 here. This forces the columns to stay inside the Armory and not stretch it. */}
      <div className="flex w-7xl gap-2 flex-1 min-h-0">
        {/* ================= LEFT SIDE: LOADOUT ================= */}
        <div className="w-1/2 min-w-0 p-6 bg-game-monolith rounded-xs border border-game-border flex flex-col gap-6 shadow-inner h-full">
          <p className="text-start font-bold tracking-wider text-game-ichor shrink-0">
            Inventory
          </p>

          <div className="p-6 w-full flex flex-col bg-game-panel rounded-xs border border-game-border flex-1 min-h-0 min-w-0">
            {/* THE FIXED STAGE */}
            <div className="relative w-full h-50 shrink-0">
              <img
                src="/humanFigure.png"
                alt="character"
                className="absolute h-52 -right-20 object-contain opacity-30 grayscale mix-blend-screen pointer-events-none p-2"
              />

              {/* WEAPON & ENHANCE */}
              <div className="absolute left-0 top-12 z-10 flex flex-col items-center gap-1">
                <div className="w-16 h-16 border border-game-border rounded-xs flex items-center justify-center bg-game-monolith shadow-[0_0_15px_rgba(185,255,36,0.1)] transition-colors hover:border-game-ichor/50">
                  <Icon
                    path={`${equipped.weapon?.icon}`}
                    type="plain"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-game-ichor">
                  Weapon
                </p>

                <div className="w-8 h-8 mt-2 border border-game-border rounded-xs flex items-center justify-center bg-game-monolith shadow-inner transition-colors hover:border-gray-500">
                  <Icon path="sharpening_stone.png" type="plain" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Enchant
                </p>
              </div>

              {/* ARMOR SLOTS */}
              <Item
                iconPath={equipped.head?.icon}
                slot={"head"}
                positionClass="top-2 right-8"
              />
              <Item
                iconPath={equipped.shoulders?.icon}
                slot={"shoulders"}
                positionClass="top-8 right-20"
              />
              <Item
                iconPath={equipped.chest?.icon}
                slot={"chest"}
                positionClass="top-14 right-14"
              />
              <Item
                iconPath={equipped.gloves?.icon}
                slot={"gloves"}
                positionClass="top-24 right-3"
              />
              <Item
                iconPath={equipped.legs?.icon}
                slot={"legs"}
                positionClass="bottom-10 right-14"
              />
            </div>

            {/* BOTTOM INVENTORY BAR */}
            <Inventory />
          </div>
        </div>

        {/* ================= RIGHT SIDE: CRAFTING ================= */}
        <Crafting />
      </div>
    </div>
  );
}

export default Armory;
