import styled, { css } from "styled-components";
import BookCover from "../BookCover/BookCover";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { Colors } from "../../Colors";
import IBookListData from "../../interfaces/IBookListData";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function BookList({ data, ...delegated }: IBookListData) {
    const navigate = useNavigate();
    const auth = useAuthContext();
    return (
        <BooksWrapper mediaMaxWidth={data.mediaMaxWidth}
            scaleBook={data.scaleBook}
            verticalScroll={data.verticalScroll}
            align={data.align}
            {...delegated}>
            {data.books.map((book: IServiceBook) => (
                <BookCover key={book._id}
                    data={{
                        isMyBook: auth.user?.id === book.authorId,
                        onEditClick: () => {
                            navigate(`/write/${book._id}`)
                        },
                        onDeleteClick: () => {
                            if (data.onDeleteClick) {
                                data.onDeleteClick(book._id);
                            }
                        },
                        onBookClick: () => {
                            if (data.onClick) {
                                data.onClick(book._id);
                            }
                        },
                        onReadClick: () => {
                            if (data.onReadClick) {
                                data.onReadClick();
                            }

                            navigate(`/read/${book._id}`)
                        },
                        addToFavourites: () => {
                            data.addToFavourites(book._id);
                        },
                        isFavourited: data.favouriteBooksIds.includes(book._id),
                        title: book.title,
                        cover: book.coverImage,
                        backgroundColor: Colors.FOREGROUND,
                        scaleBook: data.scaleBook,
                        mediaMaxWidth: data.mediaMaxWidth,
                    }} />
            ))}
            {data.books.length <= 0 && <Message>{data.noBooksMessage ?? "No books found"}</Message>}
        </BooksWrapper>
    );
}

const BooksWrapper = styled.div`
  grid-template-columns: repeat(auto-fit, 233px);
  display: grid;
  justify-items: start;
  gap: 10px;

  ${(data: IBookWrapper) => css`
      grid-auto-flow: ${data.verticalScroll ? "column" : ""};
      ${data.scaleBook ? `
        @media only screen and (max-width: ${data.mediaMaxWidth ?? 535}px) {
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        }
      `: ""}
      justify-content: ${data.align ?? "center"};
  `}
`;

const Message = styled.span`
    display: flex;
    justify-content: center;
    width: 100%;
`

interface IBookWrapper {
    verticalScroll?: boolean,
    scaleBook?: boolean,
    mediaMaxWidth?: number,
    align?: string
}