import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BookWithPercentage from "./BookWithPercentage";
import IStartedBookProgressResponse from "../../interfaces/service/user/IStartedBookProgressResponse";
export default function BookWithPercentageList({ data, ...delegated }: { data: { books: IStartedBookProgressResponse[], noBooksMessage?: string } }) {
    const navigate = useNavigate();
    return (
        <BooksWrapper
            {...delegated}>
            {data.books.map((book: IStartedBookProgressResponse) => (
                <BookWithPercentage
                    onClick={() => {
                        navigate(`/read/${book.bookId}?chapterId=${book.currentChapterId}`)
                    }}
                    backCover={book.backCoverImage}
                    frontCover={book.coverImage}
                    width={130}
                    height={8}
                    percentage={Math.round(((book.currentChapterOrderId - (1 - book.chapterPercentage)) / book.allChaptersCount) * 100)}
                    key={book.currentChapterId} />
            ))}
            {data.books.length <= 0 && <Message>{data.noBooksMessage ?? "No books found"}</Message>}
        </BooksWrapper>
    );
}

const BooksWrapper = styled.div`
  grid-template-columns: repeat(auto-fit, 233px);
  display: grid;
  justify-items: center;
  justify-content: center;
  gap: 10px;
`;

const Message = styled.span`
    display: flex;
    justify-content: center;
    width: 100%;
`

// interface IBookWrapper {
//     verticalScroll?: boolean,
//     scaleBook?: boolean,
//     mediaMaxWidth?: number,
//     align?: string
// }