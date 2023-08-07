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
export default function Home(data: { bookService: IBookService }) {
  const bookService = data.bookService;

  let content = [];

  const authContext = useAuthContext();
  const [favouriteBookIds, setfavouriteBookIds] = useState<string[]>([]);
  const [books, setBooks] = useState([] as IServiceBook[]);
  const [isBookPreveiewShown, setBookPreviewShown] = useState(false);
  const [isBookPreveiewExiting, setIsBookPreveiewExiting] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IDisplayBook>();

  for (let i = 0; i < 2; i++) {
    content.push(<BookWithPercentage backCover="https://pictures.abebooks.com/isbn/9780345427656-us.jpg"
      frontCover="https://pictures.abebooks.com/isbn/9780345427656-us.jpg"
      width={130}
      height={8}
      percentage={20}
      key={i}></BookWithPercentage>);
  }

  useEffect(() => {
    bookService.fetchBooks().then((data: IServiceBook[]) => {
      setBooks(data);
    });
  }, [bookService])

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
      <Wrapper>
        <Header>Continue Reading</Header>
        <GridWrapper length={2}>
          {content}
        </GridWrapper>
      </Wrapper>
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
            onClick: onBookClick
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
