import { createContext } from 'react';
import UserService from '../services/UserService';
import { IUserServiceContext } from '../interfaces/IUserServiceContext';

export const UserServiceContext = createContext<IUserServiceContext | null>(null);

export function UserServiceContextProvider({ children }: any): JSX.Element {
  const userService = new UserService(); // Create an instance of RatingService

  return (
    <UserServiceContext.Provider value={{ userService }}>
      {children}
    </UserServiceContext.Provider>
  );
};