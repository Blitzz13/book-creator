import { createContext } from 'react';
import { IChapterServiceContext } from '../interfaces/IChapterServiceContext';
import ChapterService from '../services/ChapterService';

export const ChapterServiceContext = createContext<IChapterServiceContext | null>(null);

export function ChapterServiceContextProvider({ children }: any): JSX.Element {
  const chapterService = new ChapterService();

  return (
    <ChapterServiceContext.Provider value={{ chapterService }}>
      {children}
    </ChapterServiceContext.Provider>
  );
};