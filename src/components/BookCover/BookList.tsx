import styled, { css } from "styled-components";
import BookCover from "../BookCover/BookCover";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { Colors } from "../../Colors";
import IBookListData from "../../interfaces/IBookListData";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRatingService } from "../../hooks/useRatingServiceContext";
import { useEffect, useState } from "react";
import { IRatingObjResponse } from "../../interfaces/service/rating/IRatingObjResponse";
import { IAverageRatingResponse } from "../../interfaces/service/rating/IAverageRatingResponse";
export default function BookList({ data, ...delegated }: IBookListData) {
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const ratingContext = useRatingService();
    const [currentUserRatedBooks, setCurrentUserRatedBooks] = useState<IRatingObjResponse[]>([]);
    const [averageRatings, setAverageRatings] = useState<IAverageRatingResponse[]>([]);

    useEffect(() => {
        getCurrentUserRatedBooks();
        getAverageRatedBooks();
    }, [authContext.user, data.books, ratingContext])
    
    async function getCurrentUserRatedBooks(): Promise<void> {
        if (authContext.user) {
            const ratings = await ratingContext.getAllUserRatings(authContext.user.id);
            setCurrentUserRatedBooks(ratings);
        }
    }
    async function getAverageRatedBooks(): Promise<void> {
        const ratings = await ratingContext.getAverageRatingForMultipleBooks(data.books.map(x => x._id));
        setAverageRatings(ratings);
    }

    async function onStarClick(bookId: string, rating: number): Promise<void> {
        if (authContext.user) {
            const currentRating = await ratingContext.getUserRatingOfBook(authContext.user.id, bookId);
            if (currentRating) {
                if (rating !== currentRating.rating) {
                    await ratingContext.updateRating(currentRating._id, {
                        rating: rating
                    });
                } else {
                    await ratingContext.deleteRating(currentRating._id);
                }
            } else {
                await ratingContext.createRating(bookId, {
                    rating: rating
                });
            }
            getCurrentUserRatedBooks();
            getAverageRatedBooks();
        }
    }

    return (
        <BooksWrapper mediaMaxWidth={data.mediaMaxWidth}
            scaleBook={data.scaleBook}
            verticalScroll={data.verticalScroll}
            align={data.align}
            {...delegated}>
            {data.books.map((book: IServiceBook) => (
                <BookCover key={book._id}
                    data={{
                        averageRating: averageRatings.find(x => x.bookId === book._id)?.averageRating || 0,
                        numberOfRatings: averageRatings.find(x => x.bookId === book._id)?.numberOfRatings || 0,
                        alreadyRated: currentUserRatedBooks.findIndex(x => x.bookId === book._id) > -1,
                        currentUserRating: currentUserRatedBooks.find(x => x.bookId === book._id)?.rating,
                        isMyBook: authContext.user?.id === book.authorId,
                        onStarClick: (rating: number) => {
                            onStarClick(book._id, rating);
                        },
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