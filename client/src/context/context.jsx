import React, { createContext, useReducer, useContext } from "react";

// Initial state for the authentication context
const initialState = {
  user: { login: null },
  admin: { login: null },
  refresh: false,
};

// Action types
const SET_USER = "SET_USER";
const SET_ADMIN = "SET_ADMIN";
const SET_REFRESH = "SET_REFRESH";

// Reducer function to handle state changes
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ADMIN:
      return { ...state, admin: action.payload };
    case SET_REFRESH:
      return { ...state, refresh: !state.refresh };
    default:
      return state;
  }
};

const authContext = createContext();

// Provider component
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Action creators to dispatch actions to the reducer
  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };
  const setAdmin = (admin) => {
    dispatch({ type: SET_ADMIN, payload: admin });
  };
  const setRefresh = () => {
    dispatch({ type: SET_REFRESH });
  };

  return (
    <authContext.Provider
      value={{
        user: state.user,
        setUser,
        admin: state.admin,
        setAdmin,
        refresh: state.refresh,
        setRefresh,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// Custom hook to use the context
const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { ContextProvider, useAuth };
