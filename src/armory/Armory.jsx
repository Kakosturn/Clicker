import { useArmoryContext } from "../context/ArmoryContext";
import Icon from "../components/Icon";
import Item from "./Item";
import Crafting from "./Crafting";
import Inventory from "./Inventory";

function Armory() {
  const { state: stateArmory } = useArmoryContext();

  return (
    // FIX 1: Clamped the height to 85% of the viewport height so it never goes off-screen
    // Added flex flex-col so the internal sections know how to calculate their remaining space
    <div className="w-full h-[85vh] min-h-[600px] bg-game-panel border border-game-border rounded-sm p-8 flex flex-col gap-6 shadow-2xl text-gray-300">
      <h2 className="text-center text-game-ichor text-3xl font-bold uppercase tracking-widest border-b border-game-border pb-4 shrink-0">
        Armory
      </h2>

      {/* FIX 2: Added flex-1 and min-h-0 here. This forces the columns to stay inside the Armory and not stretch it. */}
      <div className="flex gap-8 flex-1 min-h-0">
        {/* ================= LEFT SIDE: LOADOUT ================= */}
        <div className="w-1/2 p-6 bg-game-monolith rounded-sm border border-game-border flex flex-col gap-6 shadow-inner h-full">
          <p className="text-start font-bold tracking-wider text-game-ichor shrink-0">
            Inventory
          </p>

          <div className="p-6 flex flex-col bg-game-panel rounded-sm border border-game-border flex-1 min-h-0">
            {/* THE FIXED STAGE */}
            <div className="relative w-[340px] h-[200px] mx-auto shrink-0">
              <img
                src="/humanFigure.png"
                alt="character"
                className="absolute inset-0 w-full h-full object-contain opacity-30 grayscale mix-blend-screen pointer-events-none p-2"
              />

              {/* WEAPON & ENHANCE */}
              <div className="absolute left-0 top-12 z-10 flex flex-col items-center gap-1">
                <div className="w-16 h-16 border border-game-border rounded-sm flex items-center justify-center bg-game-monolith shadow-[0_0_15px_rgba(185,255,36,0.1)] transition-colors hover:border-game-ichor/50">
                  <Icon
                    path={`${stateArmory.equipped.weapon?.icon}`}
                    type="plain"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-game-ichor">
                  Weapon
                </p>

                <div className="w-8 h-8 mt-2 border border-game-border rounded-sm flex items-center justify-center bg-game-monolith shadow-inner transition-colors hover:border-gray-500">
                  <Icon path="sharpening_stone.png" type="plain" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Enhance
                </p>
              </div>

              {/* ARMOR SLOTS */}
              <Item
                iconPath={stateArmory.equipped.head?.icon}
                slot={"Head"}
                positionClass="top-0 right-24"
              />
              <Item
                iconPath={stateArmory.equipped.shoulders?.icon}
                slot={"Shoulders"}
                positionClass="top-12 right-0"
              />
              <Item
                iconPath={stateArmory.equipped.chest?.icon}
                slot={"Chest"}
                positionClass="top-20 right-24"
              />
              <Item
                iconPath={stateArmory.equipped.gloves?.icon}
                slot={"Gloves"}
                positionClass="top-36 right-0"
              />
              <Item
                iconPath={stateArmory.equipped.legs?.icon}
                slot={"Legs"}
                positionClass="bottom-0 right-24"
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
