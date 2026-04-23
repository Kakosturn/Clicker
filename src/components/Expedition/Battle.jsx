import { useState } from "react";
import EnemyCooldownBar from "./EnemyCooldownBar";
import PlayerCooldownBar from "./PlayerCooldownBar";
import Icon from "../Icon";
import { useExpeditionStore } from "../../stores/useExpeditionStore";
import { use } from "react";

function Battle({ hpEnemy, dmgEnemy, armorEnemy }) {
  const battleIsActive = useExpeditionStore((state) => state.battle.isActive);
  const playerPos = useExpeditionStore((state) => state.playerPos);
  const grid = useExpeditionStore((state) => state.grid);
  const battleResult = useExpeditionStore((state) => state.battle.result);
  const finalizeEncounter = useExpeditionStore(
    (state) => state.finalizeEncounter,
  );
  const player = useExpeditionStore((state) => state.player);
  const currentEnemy = useExpeditionStore((state) => state.currentEnemy);
  const battleStart = useExpeditionStore((state) => state.battleStart);
  const attack = useExpeditionStore((state) => state.attack);
  const npcAttack = useExpeditionStore((state) => state.npcAttack);
  const currentTile = grid[playerPos.row]?.[playerPos.col];

  // console.log(stateExpedition.smallEnemyHp);
  if (battleResult === "win") {
    return (
      <div>
        <p>Victory</p>
        <button
          onClick={() =>
            finalizeEncounter({
              row: currentTile.row,
              col: currentTile.col,
            })
          }
        >
          Continue
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-4xl font-extrabold text-orange-400 text-center tracking-wider drop-shadow-lg">
          Encounter
        </p>

        {!battleIsActive && (
          <div>
            <p>Enemy</p>
            <div className="flex gap-1">
              <Icon path={"damage.png"} type="plain" />
              <p>{currentEnemy?.dmg}</p>
            </div>
            <div className="flex gap-1">
              <Icon path={"armor.png"} type="plain" />
              <p>{currentEnemy?.armor}</p>
            </div>
            <div className="flex gap-1">
              <Icon path={"hp.png"} type="plain" />
              <p>{currentEnemy?.hp}</p>
            </div>
            <button
              onClick={() => {
                battleStart();
              }}
            >
              Fight
            </button>
          </div>
        )}
        {battleIsActive && (
          <div className="flex">
            <div className="w-1/4">
              <p>You</p>
              <PlayerCooldownBar
                hp={player.hp}
                dmg={player.dmg}
                armor={player.armor}
                onAttack={() => attack({ dmg: player.dmg })}
              />
            </div>
            <div className="w-1/4">
              <p>Small Enemy</p>
              <EnemyCooldownBar
                hpEnemy={hpEnemy}
                armorEnemy={armorEnemy}
                onComplete={() => npcAttack({ dmg: dmgEnemy })}
                dmgEnemy={dmgEnemy}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Battle;
