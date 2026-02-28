import { useState } from "react";
import EnemyCooldownBar from "./EnemyCooldownBar";
import PlayerCooldownBar from "./PlayerCooldownBar";
import { useExpeditionContext } from "../../context/ExpeditionContext";
import Icon from "../Icon";

function Battle({ hpEnemy, dmgEnemy, armorEnemy }) {
  const { state: stateExpedition, dispatch: dispatchExpedition } =
    useExpeditionContext();

  const currentTile =
    stateExpedition.grid[stateExpedition.playerPos.row]?.[
      stateExpedition.playerPos.col
    ];
  const battleIsActive = stateExpedition.battle.isActive;
  // console.log(stateExpedition.smallEnemyHp);
  if (stateExpedition.battle.result === "win") {
    return (
      <div>
        <p>Victory</p>
        <button
          onClick={() =>
            dispatchExpedition({
              type: "finalizeEncounter",
              payload: { row: currentTile.row, col: currentTile.col },
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
              <p>{stateExpedition.currentEnemy?.dmg}</p>
            </div>
            <div className="flex gap-1">
              <Icon path={"armor.png"} type="plain" />
              <p>{stateExpedition.currentEnemy?.armor}</p>
            </div>
            <div className="flex gap-1">
              <Icon path={"hp.png"} type="plain" />
              <p>{stateExpedition.currentEnemy?.hp}</p>
            </div>
            <button
              onClick={() => {
                dispatchExpedition({ type: "battleStart" });
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
                hp={stateExpedition.player.hp}
                dmg={stateExpedition.player.dmg}
                armor={stateExpedition.player.armor}
                onAttack={() =>
                  dispatchExpedition({
                    type: "attack",
                    payload: { dmg: stateExpedition.player.dmg },
                  })
                }
              />
            </div>
            <div className="w-1/4">
              <p>Small Enemy</p>
              <EnemyCooldownBar
                hpEnemy={hpEnemy}
                armorEnemy={armorEnemy}
                onComplete={() =>
                  dispatchExpedition({
                    type: "npcAttack",
                    payload: { dmg: dmgEnemy },
                  })
                }
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
