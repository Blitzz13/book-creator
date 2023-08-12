export default interface IStartedBookProgressResponse {
  bookId: string;
  allChaptersCount: number;
  currentChapterOrderId: number;
  currentChapterId: string;
  chapterPercentage: number;
  coverImage?: string;
  backCoverImage?: string;
}
