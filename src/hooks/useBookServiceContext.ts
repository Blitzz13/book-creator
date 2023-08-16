import { useContext } from "react";
import { BookServiceContext } from "../context/BookServiceContext";

export const useBookService = () => {
    const context = useContext(BookServiceContext);
    if (!context) {
      throw new Error('useBookService must be used within a useBookServiceContextProvider');
    }
    return context.bookService;
  };