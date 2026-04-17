export class Cost {
  _fields = ["wood", "stone", "meat", "ironOre", "ironBar"];
  constructor(wood = 0, stone = 0, meat = 0, ironOre = 0, ironBar = 0) {
    this.wood = wood;
    this.stone = stone;
    this.ironOre = ironOre;
    this.meat = meat;
    this.ironBar = ironBar;
  }
  scale(multiplier = {}) {
    const next = new Cost();
    this._fields.forEach((field) => {
      const factor = multiplier[field] ?? 1;
      next[field] = Math.floor(this[field] * factor);
    });
    return next;
  }
  gte(other) {
    //console.log(this, other);
    return this._fields.every((field) => this[field] >= other[field]);
  }
  lte(other) {
    return this._fields.every((field) => this[field] <= other[field]);
  }
}
