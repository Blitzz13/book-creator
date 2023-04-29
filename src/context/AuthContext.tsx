import { createContext, useEffect, useReducer } from "react";
import IUserAction from "../interfaces/IUserAction";
import IAuthContext from "../interfaces/IAuthContext";
import { UserAction } from "../enums/UserAction";

export const AuthContext = createContext<IAuthContext | null>(null);

export function authReducer(state: any, action: IUserAction) {
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

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);

      dispatch({ type: UserAction.Login, payload: user })
    }
  }, []);

  console.log(`Auth context state`, state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider >
  );
};
