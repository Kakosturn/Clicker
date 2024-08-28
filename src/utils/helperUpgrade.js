export function isUpgradeBuilt(condition, isVisible) {
  //console.log(condition, isVisible);
  if (condition && isVisible) {
    return true;
  } else return false;
}

export function upgradeCost(type, state) {
  if (type === "upgradeLumberMill")
    return { type: "lostWood", payload: state.lumberMillCost };
  if (type === "upgradeQuarry")
    return { type: "lostStone", payload: state.quarryCost };
  else return { type: "" };
}
