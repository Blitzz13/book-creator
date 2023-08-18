import { useContext } from "react";
import { UserServiceContext } from "../context/UserServiceContext";

export const useUserService = () => {
    const context = useContext(UserServiceContext);
    if (!context) {
      throw new Error('useUserService must be used within a UserServiceContextProvider');
    }
    return context.userService;
  };