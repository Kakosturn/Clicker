import { createContext, useContext, useReducer } from "react";

const FeatureContext = createContext();

const initialState = {
  furnaceUnlocked: false,
  furnaceOpen: false,
  furnaceInput: {
    ironOre: 0,
    goldOre: 0,
    isRunning: false,
  },
  furnaceLimit: 30,
  smeltResourceInSeconds: {
    iron: 5,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "furnaceUnlocked":
      return { ...state, furnaceUnlocked: true };
    case "default":
      return { ...state };
    case "addToFurnace": {
      const { resource, amount } = action.payload;

      //   for (const x of Object.keys(state.furnaceInput)) {
      //     console.log(x);
      //     state.furnaceInput[x]
      //   }
      return {
        ...state,
        furnaceInput: {
          ...state.furnaceInput,
          [resource]: state.furnaceInput[resource] + amount,
        },
      };
    }
    case "emptyFurnace": {
      return {
        ...state,
        furnaceInput: {
          ironOre: 0,
          goldOre: 0,
          isRunning: false,
        },
      };
    }
  }
}

function FeatureProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FeatureContext.Provider value={{ state, dispatch }}>
      {children}
    </FeatureContext.Provider>
  );
}

function useFeatureContext() {
  const featureContext = useContext(FeatureContext);

  if (featureContext === undefined)
    return new Error("context was used outside of its scope");
  return featureContext;
}

export { FeatureProvider, useFeatureContext };
