import { motion } from "motion/react";
import Battle from "./Battle";
import { useExpeditionContext } from "../../context/ExpeditionContext";
function Enemy() {
  const { state: stateExpedition } = useExpeditionContext();
  const currentTile =
    stateExpedition.grid[stateExpedition.playerPos.row]?.[
      stateExpedition.playerPos.col
    ];
  // console.log(currentTile);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div>
        <Battle
          hpEnemy={stateExpedition.currentEnemy?.hp}
          dmgEnemy={stateExpedition.currentEnemy?.dmg}
          armorEnemy={stateExpedition.currentEnemy?.armor}
        />
      </div>
    </motion.div>
  );
}

export default Enemy;
