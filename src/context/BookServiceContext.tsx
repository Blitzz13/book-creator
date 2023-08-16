import { createContext } from 'react';
import { IBookServiceContext } from '../interfaces/IBookServiceContext';
import BookService from '../services/BookService';

export const BookServiceContext = createContext<IBookServiceContext | null>(null);

export function BookServiceContextProvider({ children }: any): JSX.Element {
  const bookService = new BookService(); // Create an instance of RatingService

  return (
    <BookServiceContext.Provider value={{ bookService }}>
      {children}
    </BookServiceContext.Provider>
  );
};