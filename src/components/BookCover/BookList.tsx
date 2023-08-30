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
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { CommonContentModalStyle } from "../../commonStyledStyles/CommonContentModalStyle";
import { useBookService } from "../../hooks/useBookServiceContext";
import NoteCreationModal from "../NoteCreationModal/NoteCreationModal";
import { NoteModalMode } from "../../enums/NoteModalMode";
import { NoBackgroundContentModalStyle } from "../../commonStyledStyles/NoBackgroundContentModalStyle";
import IDescriptionBook from "../../interfaces/IDescriptionBook";
export default function BookList({ data, ...delegated }: IBookListData) {
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const ratingContext = useRatingService();
    const bookContext = useBookService();
    const [currentUserRatedBooks, setCurrentUserRatedBooks] = useState<IRatingObjResponse[]>([]);
    const [averageRatings, setAverageRatings] = useState<IAverageRatingResponse[]>([]);
    const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false);
    const [isConfirmModalExiting, setIsConfirmModalExiting] = useState(false);
    const [descriptiomnModalOpen, setDescriptionModalOpen] = useState(false);
    const [descriptiomnModalExiting, setDescriptionModalExiting] = useState(false);
    const [deleteBookTitle, setDeleteBookTitle] = useState("");
    const [deleteBookId, setdeleteBookId] = useState("");
    const [currentBook, setCurrentBook] = useState<IDescriptionBook>({
        description: "",
        title: "",
        displayName: "",
        userId: "",
    });

    useEffect(() => {
        getCurrentUserRatedBooks();
        getAverageRatedBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authContext.user, data.books, ratingContext])

    async function getCurrentUserRatedBooks(): Promise<void> {
        if (authContext.user) {
            const ratings = await ratingContext.getAllUserRatings(authContext.user.id);
            setCurrentUserRatedBooks(ratings);
        }
    }
    async function getAverageRatedBooks(): Promise<void> {
        const bookIds = data.books.map(x => x._id);
        const ratings = await ratingContext.getAverageRatingForMultipleBooks(bookIds);
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
                        bookId: book._id,
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
                            setisConfirmModalOpen(true);
                            setDeleteBookTitle(book.title);
                            setdeleteBookId(book._id);
                        },
                        onBookClick: () => {
                            setCurrentBook({
                                description: book.description,
                                displayName: book.author,
                                title: book.title,
                                userId: book.authorId,
                            });
                            setDescriptionModalOpen(true);
                            if (data.onClick) {
                                // data.onClick(book._id);
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
                        starsInteractive: data.starsInteractive,
                    }} />
            ))}
            <NoteCreationModal data={{
                isOpen: descriptiomnModalOpen,
                isExiting: descriptiomnModalExiting,
                ContentElement: NoBackgroundContentModalStyle,
                contentData: {
                    width: "400px",
                    isExiting: descriptiomnModalExiting
                },
                setOpen: setDescriptionModalOpen,
                setExiting: setDescriptionModalExiting,
            }}
                noteData={{
                    modalTitle: "Description",
                    initialDescription: currentBook.description || "No description has been written for this book",
                    noteTitle: currentBook.title,
                    currentContent: currentBook.description || "No description for this book",
                    mode: NoteModalMode.Reading,
                    displayName: currentBook.displayName,
                    userId: currentBook.userId,
                    onNoteTitleChange: (text: string) => {
                        // setNoteModalData({ ...noteModalData, header: text });
                    },
                    onDescriptionChange: (text: string) => {
                        // setNoteModalData({ ...noteModalData, currentContent: text });
                    },
                    onSaveClick: () => { },
                }}>
            </NoteCreationModal>
            <ConfirmationModal data={{
                isOpen: isConfirmModalOpen,
                isExiting: isConfirmModalExiting,
                ContentElement: CommonContentModalStyle,
                contentData: {
                    width: "400px",
                },
                setOpen: setisConfirmModalOpen,
                setExiting: setIsConfirmModalExiting,
            }}
                confirmationData={{
                    text: `Are you sure you want to delete "${deleteBookTitle}"?`,
                    modalTitle: "Delete Book",
                    funcToCall: () => {
                        setIsConfirmModalExiting(true);
                        bookContext.deleteBook(deleteBookId);
                        data.books = data.books.filter(x => x._id !== deleteBookId);
                        if (data.onDeleteClick) {
                            data.onDeleteClick(deleteBookId);
                        }
                    },
                }}>
            </ConfirmationModal>
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