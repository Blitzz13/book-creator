import { createContext, useReducer } from "react";
import IUserAction from "../interfaces/IUserAction";
import IAuthContext from "../interfaces/IAuthContext";

export const AuthContext = createContext<IAuthContext | null>(null);

export function authReducer (state: any, action: IUserAction) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }: any): JSX.Element {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log(`Auth context state`, state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider >
  );
};
