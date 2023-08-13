import styled from "styled-components";
import { Colors } from "../../Colors";
import BookSidebar from "../BookSidebar/BookSidebar";
import $ from "jquery";
import Editor from "../Editor/Editor";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import IWriteBookData from "../../interfaces/IWriteBookData";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillBookFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import Modal from "../Modal/Modal";
import SidebarContent from "../BookSidebar/SidebarContent";
import { BurgerMenuModalStyle } from "../../commonStyledStyles/BurgerMenuModalStyle";
import IBurgerContentModalStyle from "../../interfaces/modal/IBurgerContentModalStyle";
import IBaseChapter from "../../interfaces/service/chapter/IBaseChapter";
import IServiceChapter from "../../interfaces/service/chapter/IServiceChapter";
import { ToolbarTextStyle } from "../../enums/ToolbarTextStyle";
import { BULLET_LIST, INDENT, ORDERED_LIST, OUTDENT } from "../../constants/ToolbarConstants";
import { CommonContentModalStyle } from "../../commonStyledStyles/CommonContentModalStyle";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { IDisplayChapter } from "../../interfaces/IDisplayChapter";
import { ChapterState } from "../../enums/ChapterState";
import { ChapterToCreate as chapterToCreate, ChapterToUpdate as chapterToUpdate, ServiceToChapter } from "../../Converters/Chapter/ConvertChapter";
import validator from "validator";
import EditDescriptionModal from "../EditDescription/EditDescription";
import IDisplayBook from "../../interfaces/IDisplayBook";
import { BookToUpdate, ServiceToBook } from "../../Converters/Book/ConvertBook";
import { BookState } from "../../enums/BookState";
import IDeleteConfirmation from "../../interfaces/IDeleteConfirmation";
import BookCover from "../BookCover/BookCover";
import BookWithPercentage from "../BookWithPercentage/BookWithPercentage";
import AnimatedBook from "../AnimatedBook/AnimatedBook";
import ICommonContentModalStyle from "../../interfaces/modal/ICommonContentModalStyle";
import Header from "../Header/Header";
import IOverlayStyleData from "../../interfaces/modal/IOverlayStyleData";
import Loader from "../Loader/Loader";
import { useAuthContext } from "../../hooks/useAuthContext";

function resizeContentTextarea() {
  const contentTextArea = $("#writing-area");
  const settings = $("#book-settings");
  const quilToolbar = $(".ql-toolbar").outerHeight(true);

  if (contentTextArea && quilToolbar && window.innerHeight > 410) {
    const navHeight = $("#nav-bar").outerHeight(true);
    const headerHeight = $("#header-textarea").outerHeight(true);
    const contentOffset = 40;
    const sidebarOffset = 15;
    const contentHeight = window.innerHeight - (navHeight ? navHeight : 0) - (headerHeight ? headerHeight : 0) - contentOffset;
    contentTextArea.css("padding-bottom", `${quilToolbar}px`)
    contentTextArea.outerHeight(contentHeight);
    settings.height(contentHeight + (headerHeight ? headerHeight : 0) + sidebarOffset);
  }
}

export default function WriteBook(data: IWriteBookData) {
  const params = useParams();
  const authContext = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSettingsModalExiting, setIsSettingsModalExiting] = useState(false);
  const [isSettingsModalOpen, setIsSettingModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertExiting, setIsAlertExiting] = useState(false);
  const [isConfirmExiting, setIsConfirmExiting] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(true);
  const [isEditDescriptionOpen, setisEditDescriptionOpen] = useState(false);
  const [isEditDescriptionExiting, setIsEditDescriptionExiting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPreviewExiting, setIsPreviewExiting] = useState(false);
  const [isAnimatedToggle, setAnimatedToggle] = useState(false);
  const [isAnimatedOpen, setAnimatedOpen] = useState(false);
  const [isAnimatedExiting, setAnimatedExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [chapterTitle, setChapterTitle] = useState("");
  const [content, setEditorContent] = useState<string>();
  const [delteConfirmationData, setDeleteConfirmationData] = useState<IDeleteConfirmation>({
    text: "",
    title: "",
    func: () => { },
  });
  const [initialBookDescription, setInitialBookDescription] = useState("");
  const [baseChapters, setChapterTitles] = useState<IBaseChapter[]>([]);

  const [book, setBook] = useState<IDisplayBook>({
    description: "",
    id: "",
    state: BookState.Draft,
    title: ""
  });

  const [currentChapter, setCurrentChapter] = useState<IDisplayChapter>({
    bookId: params.bookId ?? "",
    content: "",
    header: "",
    orderId: -1,
    state: ChapterState.Draft
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.user === undefined) {
      navigate('/');
    }
  }, [authContext.user, navigate]);

  window.addEventListener("resize", () => {
    resizeContentTextarea();
  });

  window.addEventListener("load", () => {
    resizeContentTextarea();
  })


  function onChapterTitleChange(event: string | any): void {
    setCurrentChapter({ ...currentChapter, header: event.target.value });
  }

  function onEditorContentChange(text: string): void {
    if (currentChapter) {
      setCurrentChapter({ ...currentChapter, content: text });
    }
  }

  function onSettingsClick(): void {
    setAreSettingsOpen(true);
    setIsSettingModalOpen(!isSettingsModalOpen);
  }

  function onBookClick(): void {
    setAreSettingsOpen(false);
    setIsSettingModalOpen(!isSettingsModalOpen);
  }

  function onEditDescriptionClick(): void {
    setisEditDescriptionOpen(true);
    setIsSettingModalOpen(false);
  }

  function onExitBookDescription(isExiting: boolean): void {
    setIsEditDescriptionExiting(isExiting);
    setInitialBookDescription(book.description);
  }

  function showDeleteConfirmation(isDeletingChapter: boolean): void {
    const title = `Delete ${isDeletingChapter ? "Chapter" : "Book"}`
    let text = `Are you sure you want to delete "${currentChapter.header}"?`;
    const deleteFunc = isDeletingChapter ? deleteChapter : deleteBook;
    if (!isDeletingChapter) {
      text = `Are you sure you want to delete the current book "${book.title}"?`
    }

    setDeleteConfirmationData({
      text: text,
      title: title,
      func: deleteFunc,
    });
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function deleteBook(): Promise<void> {
    await data.bookService.deleteBook(book.id);
    setIsConfirmOpen(false);
  }

  async function updateBook(): Promise<void> {
    await data.bookService.updateBook(book.id, BookToUpdate(book));
  }

  async function deleteChapter(): Promise<void> {
    if (currentChapter && currentChapter.id) {
      setShowLoader(false);

      const nextChapter = await data.chapterService.deleteChapter({ id: currentChapter.id });

      if (nextChapter && params.bookId) {
        const newChapter = ServiceToChapter(nextChapter);
        setCurrentChapter(newChapter);
        setEditorContent(newChapter.content);
        setSearchParams(`?chapterId=${newChapter.id}`);
        await refreshChapterList();
      } else {
        navigate(`/write/${params.bookId}`);
        window.location.reload();
      }
    }

    setIsConfirmOpen(false);
    setShowLoader(false);
  }

  async function onCreateChapterClick(): Promise<void> {
    if (params.bookId) {
      try {
        setShowLoader(true)
        const chapterId = searchParams.get("chapterId");
        if (chapterId) {
          const chapter = await data.chapterService.updateChapter(chapterToUpdate(currentChapter));
          setChapterTitle(chapter.header);
          setShowLoader(false);
        } else {
          if (validator.isEmpty(currentChapter.content) || validator.isEmpty(currentChapter.header)) {
            setIsAlertOpen(true);
            return;
          }

          const chapter = await data.chapterService.createChapter(chapterToCreate(currentChapter));
          await refreshChapterList();
          setSearchParams(`?chapterId=${chapter._id}`);
          setShowLoader(false);
        }
      } catch (error) {
        setShowLoader(false);
      }

    }
  }

  async function setChapterOrder(id: string, chapterId: string) {
    if (params.bookId) {
      const currentChapterId = searchParams.get("chapterId");
      if (currentChapterId) {
        setShowLoader(true);
        const chapter = await data.chapterService.updateChaptersOrder({ bookId: params.bookId, chapterId: chapterId, orderId: parseInt(id) });
        await refreshChapterList();

        if (currentChapter && chapterId === currentChapterId) {
          setCurrentChapter({ ...currentChapter, orderId: chapter.orderId });
        }

        setShowLoader(false);
      }
    }
  }

  async function refreshChapterList(): Promise<void> {
    if (params.bookId) {
      const chapters: IBaseChapter[] = await data.chapterService.fetchAllChapterTitles(params.bookId);
      setChapterTitles(chapters);
    }
  }

  useEffect(() => {
    resizeContentTextarea();
    const fetchData = async () => {
      try {
        if (params.bookId) {
          setShowLoader(true);

          const book: IServiceBook = await data.bookService.fetchBook(params.bookId);
          await refreshChapterList();

          const chapterId = searchParams.get("chapterId");
          if (chapterId) {
            const chapter: IServiceChapter = await data.chapterService.fetchChapter(chapterId);

            setCurrentChapter(ServiceToChapter(chapter));
            setEditorContent(chapter.content);
          }

          const displayBook = ServiceToBook(book);
          setInitialBookDescription(book.description);
          setBook(displayBook);
          setShowLoader(false);
        }
      } catch (error) {
        navigate("*");
      }
    }

    fetchData().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.bookService, data.chapterService, navigate, params.bookId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.bookId) {
          const chapterId = searchParams.get("chapterId");
          if (chapterId) {
            setShowLoader(true);
            const chapter: IServiceChapter = await data.chapterService.fetchChapter(chapterId);
            const newChapter = ServiceToChapter(chapter);
            setCurrentChapter(newChapter);
            setEditorContent(undefined);
            setEditorContent(chapter.content);
            setShowLoader(false);
          }
        }
      } catch (error) {
        navigate("*");
      }
    }

    fetchData().catch();
  }, [data.chapterService, navigate, params.bookId, searchParams]);

  useEffect(() => {
    resizeContentTextarea();

    const fetchData = async () => {
      try {
        if (params.bookId) {
          const chapters: IBaseChapter[] = (await data.chapterService.fetchAllChapterTitles(params.bookId)).sort(x => x.orderId);
          setChapterTitles(chapters);
        }
      } catch (error) {
        navigate("*");
      }
    }

    fetchData().catch();
  }, [chapterTitle, data.chapterService, navigate, params.bookId]);

  return (
    <Wrapper onLoad={resizeContentTextarea}>
      <Loader data={{ isLoading: showLoader }} />
      <HeaderWrapper id="header-textarea">
        <HeaderOverflowHide>
          <HeaderTextarea onChange={onChapterTitleChange} value={currentChapter?.header} name="header-textarea" placeholder="Enter chapter name here" />
        </HeaderOverflowHide>
        <IconsWrapper>
          <SettingsIcon onClick={onSettingsClick} />
          <BookIcon onClick={onBookClick} />
          <CheckIcon onClick={onCreateChapterClick} />
        </IconsWrapper>
      </HeaderWrapper>
      <ContentTextarea data={{
        onValueChange: onEditorContentChange,
        setData: content,
        modules: {
          toolbar: {
            sizes: [{ size: [] }],
            headerSizes: [{ header: [1, 2, 3] }],
            textStyles: [
              ToolbarTextStyle.BOLD,
              ToolbarTextStyle.ITALIC,
              ToolbarTextStyle.UNDERLINE,
              ToolbarTextStyle.STRIKE
            ],
            liststyles: [ORDERED_LIST, BULLET_LIST],
            indentStyle: [INDENT, OUTDENT],
            align: [{ align: [] }],
            removeStylesButton: ["clean"],
          }
        }
      }} id="writing-area"></ContentTextarea>
      <Settings data={
        {
          title: book.title,
          isFromModal: false,
          areSettingsOpen: areSettingsOpen,
          setAreSettingsOpen: setAreSettingsOpen,
          saveChapter: onCreateChapterClick,
          setOrderId: setChapterOrder,
          updateCurrentChapter: setCurrentChapter,
          deleteConfirmation: showDeleteConfirmation,
          showEditDescription: onEditDescriptionClick,
          updateBook: setBook,
          setPreviewOpen: setIsPreviewOpen,
          saveBook: updateBook,
          baseChapters: baseChapters,
          currentChapter: currentChapter,
          book: book,
        }
      } id="book-settings" />
      <SettingsModal data={{
        isOpen: isSettingsModalOpen,
        isExiting: isSettingsModalExiting,
        ContentElement: BurgerMenuModalStyle,
        contentData: {
          width: "65%",
          isExiting: isSettingsModalExiting,
        },
        setOpen: setIsSettingModalOpen,
        setExiting: setIsSettingsModalExiting,
      }}>
        <SidebarContent data={
          {
            title: book.title,
            isFromModal: true,
            areSettingsOpen: areSettingsOpen,
            setAreSettingsOpen: setAreSettingsOpen,
            saveChapter: onCreateChapterClick,
            setOrderId: setChapterOrder,
            updateCurrentChapter: setCurrentChapter,
            deleteConfirmation: showDeleteConfirmation,
            showEditDescription: onEditDescriptionClick,
            setPreviewOpen: setIsPreviewOpen,
            onChapterClick: () => setIsSettingsModalExiting(true),
            updateBook: setBook,
            saveBook: updateBook,
            baseChapters: baseChapters,
            currentChapter: currentChapter,
            book: book,
          }
        } />
      </SettingsModal>
      <ConfirmationModal data={{
        isOpen: isConfirmOpen,
        isExiting: isConfirmExiting,
        ContentElement: CommonContentModalStyle,
        contentData: {
          width: "400px",
        },
        setOpen: setIsConfirmOpen,
        setExiting: setIsConfirmExiting,
      }}
        confirmationData={{
          text: delteConfirmationData.text,
          modalTitle: delteConfirmationData.title,
          funcToCall: delteConfirmationData.func,
        }}>
      </ConfirmationModal>
      <ConfirmationModal data={{
        isOpen: isAlertOpen,
        isExiting: isAlertExiting,
        ContentElement: CommonContentModalStyle,
        contentData: {
          width: "400px",
        },
        setOpen: setIsAlertOpen,
        setExiting: setIsAlertExiting,
      }}
        confirmationData={{
          text: `Header and content fields are required.`,
          modalTitle: `Alert`,
          isAlert: true
        }}>
      </ConfirmationModal>
      <EditDescriptionModal data={{
        isOpen: isEditDescriptionOpen,
        isExiting: isEditDescriptionExiting,
        ContentElement: CommonContentModalStyle,
        contentData: {
          width: "400px",
        },
        setOpen: setisEditDescriptionOpen,
        setExiting: onExitBookDescription,
      }}
        descriptionData={{
          modalTitle: `Edit description`,
          initialDescription: initialBookDescription,
          onDescriptionChange: (text: string) => { setBook({ ...book, description: text }) },
          funcToCall: () => {
            data.bookService.updateBook(book.id, {
              description: book.description,
            })
          },
        }}>
      </EditDescriptionModal>
      <PreviewModal data={{
        isOpen: isPreviewOpen,
        isExiting: isPreviewExiting,
        ContentElement: CommonContentModalStyle,
        contentData: {
          width: "400px",
          maxScreenHeight: 615,
          overflow: "hidden",
          backgroundColor: Colors.FOREGROUND
        },
        setOpen: setIsPreviewOpen,
        setExiting: setIsPreviewExiting,
      }}>
        <Header data={{
          title: "Preview",
          crossFunc: () => { setIsPreviewExiting(true) }
        }} />
        <PreviewWrapper>
          <Text>This is how the book will apear when searched or in the main page</Text>
          <BookCover key={book.id}
            data={{
              isMyBook: false,
              addToFavourites: () => { },
              isFavourited: false,
              title: book.title,
              cover: book.frontConver,
              onBookClick: () => { setAnimatedOpen(!isAnimatedOpen) },
              onReadClick: () => { }
            }} />
          <Text>This is how the book will apear when people are reading it</Text>
          <BookWithPercentage
            onClick={() => { }}
            backCover={book.backCover}
            frontCover={book.frontConver}
            width={130}
            height={8}
            percentage={20} />
        </PreviewWrapper>
      </PreviewModal>
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
        backCover={book.backCover}
        frontCover={book.frontConver} />
    </Wrapper >
  );
}

const Text = styled.p`
  margin-bottom: 10px;

  &:not(:first-of-type){
    margin-top: 10px;
  }
`

const PreviewWrapper = styled.div`
  /* margin: 16px 0px 0px 16px; */
  padding: 16px;
  overflow: auto;
`

const PreviewModal = styled(Modal<ICommonContentModalStyle, IOverlayStyleData>)`
`

const SettingsModal = styled(Modal<IBurgerContentModalStyle, IOverlayStyleData>)`
`

const IconsWrapper = styled.div`
  display: none;
  margin-top: 14px;
  margin-left : 8px;
  margin-right : 8px;
  justify-content: left;
  gap: 12px;

  @media only screen and (max-width: 690px) {
    display: flex;
  }
  
  @media only screen and (max-height: 500px) {
    display: flex;
  }
`

const SettingsIcon = styled(IoSettingsSharp)`
  cursor: pointer;
  font-size: 200%;
`

const BookIcon = styled(BsFillBookFill)`
  cursor: pointer;
  font-size: 200%;
`

const CheckIcon = styled(AiFillCheckCircle)`
  cursor: pointer;
  font-size: 200%;
  margin-left: auto;
  color: ${Colors.ACCENT};
`

const HeaderWrapper = styled.div`
  overflow: hidden;
`;

const HeaderOverflowHide = styled.div`
  border-radius: 20px;
  overflow: hidden;
`;

const HeaderTextarea = styled.textarea`
  background-color: ${Colors.FOREGROUND};
  text-align: center;
  width: 100%;
  height: 78px;
  max-height: 78px;
  resize: none;
  grid-area: a;
  font-size: ${32 / 16}rem;
  border-radius: 20px;
  border-color: ${Colors.BORDER};
`;

const ContentTextarea = styled(Editor)`
  grid-area: c;

  @media only screen and (max-height: 410px) {
    overflow-anchor: none;
    height: 250px;
    margin-bottom: 18px;
  }
`;

const Settings = styled(BookSidebar)`
  grid-area: b;

  @media only screen and (max-width: 690px) {
    display: none;
  }

  @media only screen and (max-height: 500px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr 234px;
  grid-template-rows: 78px 1fr;
  grid-template-areas:
  "a b"
  "c b";

  @media only screen and (max-width: 690px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-height: 500px) {
    display: flex;
    flex-direction: column;
  }
`;