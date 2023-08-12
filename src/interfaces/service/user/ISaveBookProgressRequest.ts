export default interface ISaveBookProgressRequest {
  restoreRefference: string;
  currentChapterId: string;
  bookId: string;
  userId: string;
  chapterPercentage: number;
}
