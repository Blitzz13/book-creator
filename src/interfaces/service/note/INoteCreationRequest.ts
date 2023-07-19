export default interface INoteCreationRequest { 
    header: string;
    content: string;
    bookId: string;
    chapterId: string;
    authorId: string;
    orderId: number;
}