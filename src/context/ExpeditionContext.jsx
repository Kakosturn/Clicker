import { createContext, useContext, useReducer } from "react";
import { gridSize, maximumMeatBrought } from "../variables";

const ExpeditionContext = createContext();

const initialState = {
  playerPos: {
    row: Math.floor(gridSize / 2),
    col: Math.floor(gridSize / 2),
  },
  maxMeatBrought: maximumMeatBrought,
  gridSize: gridSize,
  isExpeditionRunning: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "runStart":
      return { ...state, isExpeditionRunning: true };
    case "runEnd":
      return { ...state, isExpeditionRunning: false };
    case "setPlayerPos":
      return {
        ...state,
        playerPos: { col: action.payload.col, row: action.payload.row },
      };
    default:
      return { ...state };
  }
}

function ExpeditionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ExpeditionContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpeditionContext.Provider>
  );
}

function useExpeditionContext() {
  const expeditionContext = useContext(ExpeditionContext);

  if (expeditionContext === undefined)
    return new Error("context was used outside of its scope");
  return expeditionContext;
}

export { ExpeditionProvider, useExpeditionContext };
