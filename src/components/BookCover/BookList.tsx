import styled, { css } from "styled-components";
import BookCover from "../BookCover/BookCover";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { Colors } from "../../Colors";
import IBookListData from "../../interfaces/IBookListData";
import { useNavigate } from "react-router-dom";
export default function BookList({ data, ...delegated }: IBookListData) {
    const navigate = useNavigate();

    return (
        <BooksWrapper scaleBook={data.scaleBook} verticalScroll={data.verticalScroll} {...delegated}>
            {data.books.map((book: IServiceBook) => (
                <BookCover key={book._id}
                    data={{
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
                    }} />
            ))}
        </BooksWrapper>
    );
}

const BooksWrapper = styled.div`
  grid-template-columns: repeat(auto-fit, 233px);
  display: grid;
  justify-items: start;
  justify-content: center;
  gap: 10px;

  ${({ verticalScroll, scaleBook }: { verticalScroll?: boolean, scaleBook?: boolean }) => css`
      grid-auto-flow: ${verticalScroll ? "column" : ""};
      ${scaleBook ? `
        @media only screen and (max-width: 535px) {
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        }
      `: ""}
  `}
`;