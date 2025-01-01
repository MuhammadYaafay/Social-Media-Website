import { createContext, useReducer, useEffect } from "react"; // Added useEffect for managing localStorage updates
import AuthReducer from "./AuthReducer";

// Retrieve user from localStorage if it exists, otherwise default to null
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Changed: Load user data from localStorage
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Save user data to localStorage whenever state.user changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); // Changed: Update localStorage with new user data
  }, [state.user]); // Dependency: Run whenever user changes

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
