import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import IAuthContext from "../interfaces/IAuthContext";

export function useAuthContext(): IAuthContext {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAutchContext must be used inside an AuthContextProvider");
    }

    return context;
}