import { createContext, useContext, useReducer } from "react";

const initialState = {
  venatrix: 0,
  venatrixInjured: 0,
  venatrixAtWood: 0,
  venatrixAtStone: 0,
  venatrixAtMeat: 0,
  idle: 5,
  injured: 0,

  assigned: {
    wood: 0,
    stone: 0,
    meat: 0,
  },
};
const PopulationContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "venatrixIncrease1": {
      return { ...state, venatrix: state.venatrix + 1 };
    }
    case "venatrixIncrease2": {
      return { ...state, venatrix: state.venatrix + 2 };
    }
    case "venatrixIncrease4": {
      return { ...state, venatrix: state.venatrix + 4 };
    }
    case "addVenatrix": {
      return { ...state, idle: state.idle + action.payload };
    }
    case "assign": {
      const resource = action.payload;
      if (state.idle === 0) return { ...state };
      return {
        ...state,
        idle: state.idle - 1,
        assigned: {
          ...state.assigned,
          [resource]: state.assigned[resource] + 1,
        },
      };
    }

    case "unassign": {
      const resource = action.payload;
      if (state.assigned[resource] === 0) return { ...state };
      return {
        ...state,
        idle: state.idle + 1,
        assigned: {
          ...state.assigned,
          [resource]: state.assigned[resource] - 1,
        },
      };
    }
    case "setAssigned": {
      const { resource, amount } = action.payload;
      return {
        ...state,
        idle: state.idle - (amount - state.assigned[resource]),
        assigned: {
          ...state.assigned,
          [resource]: amount,
        },
      };
    }

    //! yeni resource geldiğinde buranın anası sikilicek.
    case "venatrixInjured": {
      if (state.venatrix > 0) {
        return {
          ...state,
          venatrix: state.venatrix - 1,
          venatrixInjured: state.venatrixInjured + 1,
        };
      }
      if (state.venatrix === 0 && state.venatrixAtMeat) {
        return {
          ...state,
          venatrixInjured: state.venatrixInjured + 1,
          venatrixAtMeat: state.venatrixAtMeat - 1,
        };
      }
      if (state.venatrix === 0 && state.venatrixAtStone) {
        return {
          ...state,
          venatrixInjured: state.venatrixInjured + 1,
          venatrixAtStone: state.venatrixAtStone - 1,
        };
      }
      if (state.venatrix === 0 && state.venatrixAtWood) {
        return {
          ...state,
          venatrixInjured: state.venatrixInjured + 1,
          venatrixAtWood: state.venatrixAtWood - 1,
        };
      }
      return { ...state };
    }
    case "venatrixRecovered": {
      return {
        ...state,
        venatrix: state.venatrix + 1,
        venatrixInjured: state.venatrixInjured - 1,
      };
    }
    case "setVenatrix": {
      return { ...state, venatrix: action.payload };
    }
    case "venatrixAtWood": {
      return {
        ...state,
        venatrix: state.venatrix - 1,
        venatrixAtWood: state.venatrixAtWood + 1,
      };
    }
    case "setVenatrixAtWood": {
      if (action.payload - state.venatrixAtWood <= state.venatrix) {
        return {
          ...state,
          venatrixAtWood: action.payload,
          venatrix: state.venatrix - (action.payload - state.venatrixAtWood),
        };
      }
      return {
        ...state,
        venatrix: state.venatrix - action.payload,
        venatrixAtWood: action.payload,
      };
    }
    case "venatrixAtStone": {
      return {
        ...state,
        venatrix: state.venatrix - 1,
        venatrixAtStone: state.venatrixAtStone + 1,
      };
    }
    case "setVenatrixAtStone": {
      if (action.payload - state.venatrixAtStone <= state.venatrix) {
        return {
          ...state,
          venatrixAtStone: action.payload,
          venatrix: state.venatrix - (action.payload - state.venatrixAtStone),
        };
      }

      return {
        ...state,
        venatrix: state.venatrix - action.payload,
        venatrixAtStone: action.payload,
      };
    }
    case "venatrixAtMeat": {
      return {
        ...state,
        venatrix: state.venatrix - 1,
        venatrixAtMeat: state.venatrixAtMeat + 1,
      };
    }
    case "setVenatrixAtMeat": {
      if (action.payload - state.venatrixAtMeat <= state.venatrix) {
        return {
          ...state,
          venatrixAtMeat: action.payload,
          venatrix: state.venatrix - (action.payload - state.venatrixAtMeat),
        };
      }

      return {
        ...state,

        venatrixAtMeat: action.payload,
      };
    }

    case "venatrixReturnFromWood": {
      return {
        ...state,
        venatrix: state.venatrix + 1,
        venatrixAtWood: state.venatrixAtWood - 1,
      };
    }

    case "venatrixReturnFromStone": {
      return {
        ...state,
        venatrix: state.venatrix + 1,
        venatrixAtStone: state.venatrixAtStone - 1,
      };
    }
    case "venatrixReturnFromMeat": {
      return {
        ...state,
        venatrix: state.venatrix + 1,
        venatrixAtMeat: state.venatrixAtMeat - 1,
      };
    }
  }
}

function PopulationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PopulationContext.Provider value={{ state, dispatch }}>
      {children}
    </PopulationContext.Provider>
  );
}

function usePopulationContext() {
  const context = useContext(PopulationContext);
  //console.log(context);
  if (context === undefined)
    throw new Error(
      "PopulationContext was used outside of the MainContext Provider"
    );
  return context;
}

export { PopulationProvider, usePopulationContext };
