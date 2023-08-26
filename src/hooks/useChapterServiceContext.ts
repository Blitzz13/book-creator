import { useContext } from "react";
import { ChapterServiceContext } from "../context/ChapterServiceContext";

export const useChapterService = () => {
    const context = useContext(ChapterServiceContext);
    if (!context) {
      throw new Error('useChapterService must be used within a useChapterServiceContextProvider');
    }
    return context.chapterService;
  };