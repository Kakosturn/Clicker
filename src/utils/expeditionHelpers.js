export const gridSize = 31;
export function keyboardMovements(e, setPlayerPos) {
  e.preventDefault();
  if (e.key === "ArrowRight") {
    setPlayerPos((prev) => {
      return { ...prev, col: prev.col + 1 };
    });
  }
  if (e.key === "ArrowLeft") {
    setPlayerPos((prev) => {
      return { ...prev, col: prev.col - 1 };
    });
  }
  if (e.key === "ArrowDown") {
    setPlayerPos((prev) => {
      return { ...prev, row: prev.row + 1 };
    });
  }
  if (e.key === "ArrowUp") {
    setPlayerPos((prev) => {
      return { ...prev, row: prev.row - 1 };
    });
  }
}

const eventCaps = {
  firstZone: {
    smallEnemy: 3,
    refillStation: 2,
    empty: Infinity,
  },
  secondZone: {
    smallEnemy: 4,
    refillStation: 2,
    treasure: 3,
    empty: Infinity,
  },
  thirdZone: {
    treasure: 4,
    mediumEnemy: 2,
    empty: Infinity,
    refillStation: 1,
  },
  fourthZone: {
    empty: Infinity,
  },
  fifthZone: {
    boss: 1,
    newElement: 1,
    empty: Infinity,
    refillStation: 1,
  },
};
const eventChances = {
  smallEnemy: {
    firstZone: 0.3,
    secondZone: 0.4,
    thirdZone: 0.2,
    fourthZone: 0.1,
    fifthZone: 0,
  },
  treasure: {
    firstZone: 0.1,
    secondZone: 0.1,
    thirdZone: 0.2,
    fourthZone: 0.3,
    fifthZone: 0.3,
  },
  mediumEnemy: {
    firstZone: 0,
    secondZone: 0.1,
    thirdZone: 0.3,
    fourthZone: 0.5,
    fifthZone: 0.1,
  },
  boss: {
    firstZone: 0,
    secondZone: 0,
    thirdZone: 0,
    fourthZone: 0,
    fifthZone: 1,
  },
  newElement: {
    firstZone: 0,
    secondZone: 0,
    thirdZone: 0,
    fourthZone: 0,
    fifthZone: 1,
  },
  refillStation: {
    firstZone: 0.2,
    secondZone: 0.2,
    thirdZone: 0.2,
    fourthZone: 0.2,
    fifthZone: 0.2,
  },
};
const zoneDensity = {
  firstZone: 0.2,
  secondZone: 0.2,
  thirdZone: 0.2,
  fourthZone: 0.2,
  fifthZone: 0.2,
};

export function createGrid({ size = 31 } = {}) {
  const center = Math.floor(size / 2);
  const maxRing = center;

  // 1️⃣ CREATE GRID (zones only)
  const grid = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      const distance = Math.max(Math.abs(row - center), Math.abs(col - center));

      let zoneDifficulty;

      if (distance >= maxRing - 2) zoneDifficulty = "fifthZone";
      else if (distance >= maxRing - 4) zoneDifficulty = "fourthZone";
      else if (distance >= maxRing / 2) zoneDifficulty = "thirdZone";
      else if (distance >= maxRing / 4) zoneDifficulty = "secondZone";
      else zoneDifficulty = "firstZone";

      return {
        row,
        col,
        ring: distance,
        zoneDifficulty,
        type: null,
        icon: null,
        visible: false,
        explored: false,
      };
    }),
  );

  // 2️⃣ GROUP TILES BY ZONE  ← HERE IS YOUR LOOP
  const tilesByZone = {
    firstZone: [],
    secondZone: [],
    thirdZone: [],
    fourthZone: [],
    fifthZone: [],
  };

  for (const row of grid) {
    for (const tile of row) {
      tilesByZone[tile.zoneDifficulty].push(tile);
    }
  }
  // console.log(grid);
  // 3️⃣ ALLOCATE EVENTS PER ZONE
  for (const zoneName in tilesByZone) {
    // console.log(zoneName);
    allocateZoneEvents(zoneName, tilesByZone[zoneName]);
  }

  return grid;
}

function allocateZoneEvents(zoneName, tiles) {
  const density = zoneDensity[zoneName];
  const caps = eventCaps[zoneName];
  const counter = {}; // tracks how many of each event we placed
  if (zoneName === "fifthZone") {
    // Guarantee boss
    if (caps.boss === 1) {
      const bossTile = randomTile(tiles);
      bossTile.type = "boss";
      bossTile.icon = icon("boss");

      counter.boss = 1;

      tiles = tiles.filter((t) => t !== bossTile);
    }

    // Guarantee newElement
    if (caps.newElement === 1) {
      const elementTile = randomTile(tiles);
      elementTile.type = "newElement";
      elementTile.icon = icon("newElement");

      counter.newElement = 1;

      tiles = tiles.filter((t) => t !== elementTile);
    }
  }

  const totalTiles = tiles.length;
  const eventTileCount = Math.floor(totalTiles * density);
  // We will modify tiles directly (they are references to grid)
  shuffle(tiles);

  const eventTiles = tiles.slice(0, eventTileCount);
  const emptyTiles = tiles.slice(eventTileCount);
  for (const tile of eventTiles) {
    const eventType = pickEvent(zoneName, caps, counter);
    tile.type = eventType;
    tile.icon = icon(eventType);
  }
  for (const tile of emptyTiles) {
    tile.type = "empty";
    tile.icon = null;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function pickEvent(zoneName, caps, counter) {
  const possible = [];

  for (const event in caps) {
    if (event === "empty") continue;

    const max = caps[event];
    const used = counter[event] || 0;

    if (used < max) {
      const weight = eventChances[event]?.[zoneName] || 0;

      if (weight > 0) {
        possible.push({ event, weight });
      }
    }
  }

  if (possible.length === 0) {
    return "empty";
  }

  const totalWeight = possible.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const item of possible) {
    roll -= item.weight;
    if (roll <= 0) {
      counter[item.event] = (counter[item.event] || 0) + 1;
      return item.event;
    }
  }

  return "empty";
}
function randomTile(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function icon(type) {
  if (type === "empty") return null;
  if (type === "smallEnemy") return "⚔";
  if (type === "refillStation") return "🐃";
  if (type === "boss") return "💋";
  if (type === "mediumEnemy") return "🗡";
  if (type === "treasure") return "💰";
  if (type === "newElement") return "❤";
}
