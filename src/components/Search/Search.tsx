import styled from "styled-components";
import ISearchData from "../../interfaces/ISearchData";
import { FormEvent, useEffect, useState } from "react";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { Colors } from "../../Colors";
import BookList from "../BookCover/BookList";
import { useSearchParams } from "react-router-dom";
import AnimatedBook from "../AnimatedBook/AnimatedBook";
import IDisplayBook from "../../interfaces/IDisplayBook";
import { ServiceToBook } from "../../Converters/Book/ConvertBook";
import CustomInput from "../Input/Input";
import { generateId } from "../../helpers/helpFunctions";
import Button from "../Button/Button";
import $ from "jquery";
import { useAuthContext } from "../../hooks/useAuthContext";
let takeBooksAmount = 0;
const authorInputId = generateId(7);
const bookInputId = generateId(7);
const wrapperId = generateId(7);
const bookListId = generateId(7);
const mobileResWidth = 535;
export default function Search(data: ISearchData) {
  const authContext = useAuthContext();
  const [currBooks, setBooks] = useState<IServiceBook[]>([]);
  const [currPage, setCurrPage] = useState(1);
  // const [pagesCount, setPagesCount] = useState(0);
  const [allBooksCount, setAllBooksCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [isAnimatedToggle, setAnimatedToggle] = useState(false);
  const [isAnimatedOpen, setAnimatedOpen] = useState(false);
  const [isAnimatedExiting, setAnimatedExiting] = useState(false);
  const [author, setAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [favouriteBookIds, setfavouriteBookIds] = useState<string[]>([]);
  const [skipBooks, setSkipBooks] = useState(0);
  const [selectedBook, setSelectedBook] = useState<IDisplayBook>();

  useEffect(() => {
    getBooks(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFavouriteBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext]);

  async function getPageCount(): Promise<void> {
    const generalSearch = (author !== "" || bookTitle !== "") ? false : true;
    const result = await data.bookService.getSearchBooksCount({
      searchString: generalSearch ? searchParams.get("searchString") || undefined : undefined,
      authorName: author || undefined,
      title: bookTitle || undefined,
    });
    // setPagesCount(Math.ceil(result.booksCount / pageSize));
    setAllBooksCount(result.booksCount)
  }

  async function load(replaceCurrentBooks: boolean = false): Promise<void> {
    await getPageCount();
    await getBooks(replaceCurrentBooks);
  }

  async function addToFavourites(bookId: string): Promise<void> {
    await data.bookService.addToFavourites({
      bookId: bookId,
      userId: authContext.user?.id || "",
    });

    await getFavouriteBooks();
  }

  async function getFavouriteBooks(): Promise<void> {
    if (authContext.user?.id) {
      const ids = await data.bookService.getFavouriteBooks(authContext.user.id);
      setfavouriteBookIds(ids.favouriteBookIds);
    }
  }

  async function getBooks(replaceCurrentBooks: boolean): Promise<void> {
    calculateBooksPerPage();
    const generalSearch = (author !== "" || bookTitle !== "") ? false : true;
    const books = await data.bookService.searchBooks({
      searchString: generalSearch ? searchParams.get("searchString") || "" : undefined,
      authorName: author || undefined,
      title: bookTitle || undefined,
      skip: replaceCurrentBooks ? 0 : skipBooks,
      take: takeBooksAmount
    });

    setSkipBooks(skipBooks + takeBooksAmount);

    if (replaceCurrentBooks) {
      setBooks(books);
      return;
    }

    setBooks([...currBooks, ...books]);
  }

  async function onBookClick(id: string): Promise<void> {
    const book = await data.bookService.fetchBook(id);
    setSelectedBook(ServiceToBook(book));
    setAnimatedOpen(true);
    setAnimatedToggle(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    load(true);
  }

  function calculateBooksPerPage(): void {
    // const bookList = $(`#${bookListId}`);
    const defaultBookWidth = window.innerWidth > mobileResWidth ? 243 : 120;
    const defaultBookHeight = window.innerWidth > mobileResWidth ? 350 : 180;
    // const bookListItemWidth = (bookList.children().first().outerWidth() || defaultBookWidth) + parseFloat($(`#${bookListId}`).css("gap"));
    // const bookListItemHeight = (bookList.children().first().outerHeight() || defaultBookHeight);

    const navHeight = $("#nav-bar").outerHeight(true);
    const headerHeight = $("#header-textarea").outerHeight(true);

    const contentHeight = window.innerHeight - (navHeight ? navHeight : 0) - (headerHeight ? headerHeight : 0);
    const contentWidth = window.innerWidth - 44;

    const booksPerRow = Math.floor(contentWidth / defaultBookWidth);
    const bookColumn = Math.floor(contentHeight / defaultBookHeight) || 1;

    takeBooksAmount = bookColumn * booksPerRow;
  }

  return (
    <Wrapper id={wrapperId}>
      <ExtendedSearchWrapper onSubmit={onSubmit}>
        <Label htmlFor={authorInputId}>Author</Label>
        <Input placeholder="J.K. Rowling" id={authorInputId} onValueChange={(text: string) => { setAuthor(text) }} />
        <Label htmlFor={bookInputId}>Book Title</Label>
        <Input placeholder="Harry Potter" id={bookInputId} onValueChange={(text: string) => { setBookTitle(text) }} />
        <SubmitButton data={{
          color: Colors.ACCENT,
          height: 33,
          width: 100,
          radius: 20,
          textSize: 22,
          onClick: () => { }
        }}>
          Search
        </SubmitButton>
      </ExtendedSearchWrapper>
      {/* <BooksWrapper> */}
      {/* </BooksWrapper> */}
      <Books
        id={bookListId}
        data={{
          addToFavourites: (bookId: string) => {
            addToFavourites(bookId);
          },
          books: currBooks,
          favouriteBooksIds: favouriteBookIds,
          onClick: onBookClick,
          scaleBook: true,
        }} />
      <CountWrapper>
        {/* {Array.from({ length: pagesCount }, (_, index) => index + 1).map((number: number) => (
          <PageNumber key={number} onClick={() => setCurrPage(number)}>{number}</PageNumber>
        ))} */}
        {allBooksCount > currBooks.length && <LoadMore onClick={() => setCurrPage(currPage + 1)}>Load More</LoadMore>}
        {allBooksCount === 0 && <span>No books found</span>}
        <AnimatedBook
          modalData={{
            isOpen: isAnimatedOpen,
            setOpen: setAnimatedOpen,
            width: "",
            children: null
          }}
          isExiting={isAnimatedExiting}
          setIsExiting={setAnimatedExiting}
          toggle={isAnimatedToggle}
          setToggle={setAnimatedToggle}
          backCover={selectedBook?.backCover}
          frontCover={selectedBook?.frontConver} />
      </CountWrapper>
    </Wrapper>
  );
}

const Books = styled(BookList)`
  margin-bottom: 10px;
`

const SubmitButton = styled(Button)`
  padding: 0;
`

const Input = styled(CustomInput)`
  @media only screen and (max-width: 770px) {
    width: 100%;
  }
`;

const ExtendedSearchWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;

  @media only screen and (max-width: 770px) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  font-size: ${18 / 16}rem;
`

// const PageNumber = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 30px;
//   height: 30px;
//   background-color: ${Colors.ACCENT};
//   text-align: center;
//   font-size: ${18 / 16}rem;
//   border-radius: 8px;
//   cursor: pointer;
// `;

const LoadMore = styled.span`
  background-color: ${Colors.ACCENT};
  padding: 10px 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
`

const Wrapper = styled.div`
  margin-left: 22px;
  margin-right: 22px;
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`
