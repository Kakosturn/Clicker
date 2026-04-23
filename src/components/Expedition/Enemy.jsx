import { motion } from "motion/react";
import Battle from "./Battle";
import { useExpeditionStore } from "../../stores/useExpeditionStore";
function Enemy() {
  // const playerPos = useExpeditionStore((state) => state.playerPos);
  // const grid = useExpeditionStore((state) => state.grid);
  const currentEnemy = useExpeditionStore((state) => state.currentEnemy);
  // const currentTile =
  //   grid[playerPos.row]?.[
  //     playerPos.col
  //   ];
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
          hpEnemy={currentEnemy?.hp}
          dmgEnemy={currentEnemy?.dmg}
          armorEnemy={currentEnemy?.armor}
        />
      </div>
    </motion.div>
  );
}

export default Enemy;
