import { createContext } from 'react';
import RatingService from '../services/RatingService';
import { IRatingServiceContext } from '../interfaces/IRatingServiceContext';

export const RatingServiceContext = createContext<IRatingServiceContext | null>(null);

export function RatingServiceContextProvider({ children }: any): JSX.Element {
  const ratingService = new RatingService(); // Create an instance of RatingService

  return (
    <RatingServiceContext.Provider value={{ ratingService }}>
      {children}
    </RatingServiceContext.Provider>
  );
};