import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import AnimatedBook from "../AnimatedBook/AnimatedBook";
import BookCover from "../BookCover/BookCover";
import BookWithPercentage from "../BookWithPercentage/BookWithPercentage";
import StyledWrapper from "../StyledWrapper/StyledWrapper";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import IBookService from "../../interfaces/service/book/IBookService";

export default function Home(data: { bookService: IBookService }) {
  const bookService = data.bookService;

  let content = [];

  const [books, setBooks] = React.useState([] as IServiceBook[]);
  const [isBookPreveiewShown, setBookPreviewShown] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);

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

  function onBookClick(): void {
    setBookPreviewShown(!isBookPreveiewShown);
    //This is done in order to stop user from scrolling the background
    document.body.style.overflow = isBookPreveiewShown ? "" : "hidden";
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
            <BookCover key={book._id} data={{ title: book.title, cover: book.coverImage, onBookClick: onBookClick }}></BookCover>
          ))}
        </GridWrapper>
      </Wrapper>
      {isBookPreveiewShown ? <Overlay onClick={onBookClick}></Overlay> : null}
      <BookOverviewWrapper isShown={isBookPreveiewShown} toggle={toggle}>
        {isBookPreveiewShown ? <AnimatedBook setToggle={setToggle} backCover="https://pictures.abebooks.com/isbn/9780345427656-us.jpg" frontCover="https://pictures.abebooks.com/isbn/9780345427656-us.jpg"></AnimatedBook> : null}
      </BookOverviewWrapper>
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

const BookOverviewWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  ${({ toggle, isShown }: { toggle: boolean, isShown: boolean }) =>
    css`
      width: ${isShown ? "20vw" : "0"};
      height: ${isShown ? "55vh" : "0"};
      animation: ${toggle ? MoveMiddle : MoveBack} 0.3s linear forwards
    `};
`

const Overlay = styled.div`
  overflow:hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  background-color: black;
  opacity: 0.4;
  /* width: 100vw;
  height: 100vh; */
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
const MoveMiddle = keyframes`
 from{
    transform: translate(-50%, -50%);
 }
 to
  {
    transform:  translate(0%, -50%);
  }
`;

const MoveBack = keyframes`
  from {
    transform: translate(0%, -50%);
  }
  to {
    transform: translate(-50%, -50%);
  }
`;