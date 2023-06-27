import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import AnimatedBook from "../AnimatedBook/AnimatedBook";
import BookCover from "../BookCover/BookCover";
import BookWithPercentage from "../BookWithPercentage/BookWithPercentage";
import StyledWrapper from "../StyledWrapper/StyledWrapper";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import IBookService from "../../interfaces/service/book/IBookService";
import IDisplayBook from "../../interfaces/IDisplayBook";
import { ServiceToBook } from "../../Converters/Book/ConvertBook";
export default function Home(data: { bookService: IBookService }) {
  const bookService = data.bookService;

  let content = [];

  const [books, setBooks] = React.useState([] as IServiceBook[]);
  const [isBookPreveiewShown, setBookPreviewShown] = React.useState(false);
  const [isBookPreveiewExiting, setIsBookPreveiewExiting] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<IDisplayBook>();

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
          {books && books.map((book: IServiceBook) => (
            <BookCover key={book._id} data={{ title: book.title, cover: book.coverImage, onBookClick: () => { onBookClick(book._id) } }}></BookCover>
          ))}
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
