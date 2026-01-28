export function beginningCheck(status) {
  if (
    status === "beginning/0" ||
    status === "firstBungalow/1" ||
    status === "firstCabin/1" ||
    status === "firstHouse" ||
    status === "firstIronBar"
  )
    return true;
}

export function selectNewsFeed(obj, stat) {
  //console.log(obj);
  //console.log(stat);
  return obj[stat];
}

export function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function buildingType(type) {
  if (type === "shack") return { type: "buildShack" };
  if (type === "bungalow") return { type: "buildBungalow" };
  if (type === "cabin") return { type: "buildCabin" };
  else return { type: "" };
}

export function buildingCost(type, state) {
  if (type === "shack") return { type: "lostWood", payload: state.costShack };
  if (type === "bungalow")
    return {
      type: "lostWood&Stone",
      payload: { wood: state.costBungalowWood, stone: state.costBungalowStone },
    };
  if (type === "cabin") return { type: "lostWood", payload: state.costCabin };
  else return { type: "" };
}

export function progressButtonTransitionBuilding(progress) {
  if (progress !== 0 && progress !== 100) {
    return "Building";
  }
  if (progress === 100) {
    return "Success";
  }
  return "Build";
}
export function progressButtonTransitionMaterial(progress) {
  if (progress !== 0 && progress !== 100) {
    return "Collecting";
  }
  if (progress === 100) {
    return "Success";
  }
  return "Collect";
}
export function progressButtonUpgrade(progress) {
  if (progress !== 0 && progress !== 100) {
    return "Upgrading";
  }
  if (progress === 100) {
    return "Success";
  }
  return "Upgrade";
}

export function validation(state, action) {
  const totalVenatrix =
    state.venatrix +
    state.venatrixAtMeat +
    state.venatrixAtStone +
    state.venatrixAtWood;

  if (action.payload > totalVenatrix) return { ...state };
}
