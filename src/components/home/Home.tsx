import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import AnimatedBook from "../AnimatedBook/AnimatedBook";
import BookList from "../BookCover/BookList";
import BookWithPercentage from "../BookWithPercentage/BookWithPercentage";
import StyledWrapper from "../StyledWrapper/StyledWrapper";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import IBookService from "../../interfaces/service/book/IBookService";
import IDisplayBook from "../../interfaces/IDisplayBook";
import { ServiceToBook } from "../../Converters/Book/ConvertBook";
import { useAuthContext } from "../../hooks/useAuthContext";
import IUserService from "../../interfaces/service/user/IUserService";
import IStartedBookProgressResponse from "../../interfaces/service/user/IStartedBookProgressResponse";
import { useNavigate } from "react-router-dom";

export default function Home(data: { bookService: IBookService, userService: IUserService }) {
  const bookService = data.bookService;
  const userService = data.userService;

  const authContext = useAuthContext();
  const navigate = useNavigate();
  const [favouriteBookIds, setfavouriteBookIds] = useState<string[]>([]);
  const [books, setBooks] = useState([] as IServiceBook[]);
  const [isBookPreveiewShown, setBookPreviewShown] = useState(false);
  const [isBookPreveiewExiting, setIsBookPreveiewExiting] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IDisplayBook>();
  const [startedBooks, setStartedBooks] = useState<IStartedBookProgressResponse[]>();

  useEffect(() => {
    async function loadStartedBooks() {
      if (authContext.user) {
        const books = (await userService.startedBooksProgress(authContext.user.id));
        const filteredBooks: IStartedBookProgressResponse[] = [];
        for (const book of books) {
          if (book.currentChapterOrderId >= book.allChaptersCount && book.chapterPercentage > 0.99) {
            continue;
          }
          filteredBooks.push(book)
        }

        setStartedBooks(filteredBooks);
      }
    }

    bookService.searchBooks({ skip: 0, take: 10 }).then((data: IServiceBook[]) => {
      setBooks(data);
    });

    loadStartedBooks();
  }, [authContext.user, bookService, userService])

  useEffect(() => {
    getFavouriteBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext])

  async function onBookClick(id: string): Promise<void> {
    const book = await data.bookService.fetchBook(id);
    setSelectedBook(ServiceToBook(book));
    setBookPreviewShown(!isBookPreveiewShown);
  }

  function setPreviewShown(isBookPreveiewShown: boolean): void {
    if (!isBookPreveiewShown) {
      setToggle(false);
    }
    setBookPreviewShown(isBookPreveiewShown);
  }

  async function getFavouriteBooks(): Promise<void> {
    if (authContext.user?.id) {
      const ids = await data.bookService.getFavouriteBooksIds(authContext.user.id);
      setfavouriteBookIds(ids.favouriteBookIds);
    }
  }

  async function addToFavourites(bookId: string): Promise<void> {
    await data.bookService.addToFavourites({
      bookId: bookId,
      userId: authContext.user?.id || "",
    });

    await getFavouriteBooks();
  }

  return (
    <>
      {(startedBooks && startedBooks.length > 0 && authContext.user) &&
        <Wrapper>
          <Header>Continue Reading</Header>
          <GridWrapper length={startedBooks?.length || 0}>
            {startedBooks && startedBooks.map((book: IStartedBookProgressResponse) => (
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
          </GridWrapper>
        </Wrapper>
      }
      <Wrapper>
        <BiggerHeader>Freshly Written</BiggerHeader>
        <GridWrapper length={5}>
          <BookList data={{
            addToFavourites: (bookId: string) => {
              addToFavourites(bookId);
            },
            favouriteBooksIds: favouriteBookIds,
            books: books,
            verticalScroll: true,
            onClick: onBookClick,
          }} />
        </GridWrapper>
      </Wrapper>
      <AnimatedBook modalData={{
        isOpen: isBookPreveiewShown,
        setOpen: setPreviewShown,
        width: "",
        children: null,
      }} setToggle={setToggle}
        toggle={toggle}
        backCover={selectedBook?.backCover}
        isExiting={isBookPreveiewExiting}
        setIsExiting={setIsBookPreveiewExiting}
        frontCover={selectedBook?.frontConver}></AnimatedBook>
    </>
  );
}

const GridWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  column-gap: 24px;
  justify-content: left;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${({ length }: { length: number }) =>
    css`repeat(${length}, fit-content)`
  };
  overflow: auto;
`

const Wrapper = styled(StyledWrapper)`
  align-self: left;
  margin: 9px 22px;
  padding-bottom: 4px;
  overflow: hidden;
`

const Header = styled.h3`
  max-width: fit-content;
  font-weight: 400;
  padding: 10px 20px;
  font-size: ${24 / 16}rem;
`

const BiggerHeader = styled.h2`
  max-width: fit-content;
  font-weight: 400;
  padding: 10px 20px;
  font-size: ${48 / 16}rem;
`
