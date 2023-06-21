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
import { ChapterToCreate as chapterToCreate, ChapterToUpdate as chapterToUpdate, ServiceToChapter } from "../../Converters/ConvertChapter";
import validator from "validator";

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
  const [searchParams, setSearchParams] = useSearchParams()
  const [isExiting, setIsExiting] = useState(false);
  const [isSettingsModalOpen, setIsSettingModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertExiting, setIsAlertExiting] = useState(false);
  const [isConfirmExiting, setIsConfirmExiting] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(true);
  const [chapterTitle, setChapterTitle] = useState("");
  const [content, setEditorContent] = useState("");
  const [baseChapters, setChapterTitles] = useState<IBaseChapter[]>([]);
  const [currentChapter, setCurrentChapter] = useState<IDisplayChapter>({
    bookId: params.bookId ?? "",
    content: "",
    header: "",
    orderId: -1,
    state: ChapterState.Draft
  });
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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

  function showDeleteChapterPrompt(): void {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function deleteChapter(): Promise<void> {
    if (currentChapter && currentChapter.id) {
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
  }

  async function onCreateChapterClick(): Promise<void> {
    if (params.bookId) {
      const chapterId = searchParams.get("chapterId");
      if (chapterId) {
        const chapter = await data.chapterService.updateChapter(chapterToUpdate(currentChapter));
        setChapterTitle(chapter.header);
      } else {
        if (validator.isEmpty(currentChapter.content) || validator.isEmpty(currentChapter.header)) {
          setIsAlertOpen(true);
          return;
        }

        const chapter = await data.chapterService.createChapter(chapterToCreate(currentChapter));
        await refreshChapterList();
        setSearchParams(`?chapterId=${chapter._id}`);
      }
    }
  }

  async function setChapterOrder(id: string, chapterId: string) {
    if (params.bookId) {
      const currentChapterId = searchParams.get("chapterId");
      if (currentChapterId) {
        const chapter = await data.chapterService.updateChaptersOrder({ bookId: params.bookId, chapterId: chapterId, orderId: parseInt(id) });
        await refreshChapterList();

        if (currentChapter && chapterId === currentChapterId) {
          setCurrentChapter({ ...currentChapter, orderId: chapter.orderId });
        }
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
          const book: IServiceBook = await data.bookService.fetchBook(params.bookId);
          await refreshChapterList();

          const chapterId = searchParams.get("chapterId");
          if (chapterId) {
            const chapter: IServiceChapter = await data.chapterService.fetchChapter(chapterId);

            setCurrentChapter(ServiceToChapter(chapter));
            setEditorContent(chapter.content);
          }

          setTitle(book.title);
        }
      } catch (error) {
        navigate("*");
      }
    }

    fetchData().catch();
  }, [data.bookService, data.chapterService, navigate, params.bookId]);

  useEffect(() => {
    ;
    const fetchData = async () => {
      try {
        if (params.bookId) {
          const chapterId = searchParams.get("chapterId");
          if (chapterId) {
            const chapter: IServiceChapter = await data.chapterService.fetchChapter(chapterId);
            const newChapter = ServiceToChapter(chapter);
            setCurrentChapter(newChapter);
            // setUpdatedChapterTitle(chapter.header);
            setEditorContent(chapter.content);
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
        onValueChange: onEditorContentChange, setData: content, modules: {
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
          title: title,
          isFromModal: false,
          areSettingsOpen: areSettingsOpen,
          setAreSettingsOpen: setAreSettingsOpen,
          saveChapter: onCreateChapterClick,
          setOrderId: setChapterOrder,
          updateCurrentChapter: setCurrentChapter,
          deleteChapter: showDeleteChapterPrompt,
          baseChapters: baseChapters,
          currentChapter: currentChapter,
        }
      } id="book-settings" />
      <SettingsModal data={{
        isOpen: isSettingsModalOpen,
        isExiting: isExiting,
        ContentElement: BurgerMenuModalStyle,
        contentData: {
          width: "65%",
          isExiting: isExiting,
        },
        setOpen: setIsSettingModalOpen,
        setExiting: setIsExiting,
      }}>
        <SidebarContent data={
          {
            title: title,
            isFromModal: true,
            areSettingsOpen: areSettingsOpen,
            setAreSettingsOpen: setAreSettingsOpen,
            saveChapter: onCreateChapterClick,
            setOrderId: setChapterOrder,
            updateCurrentChapter: setCurrentChapter,
            deleteChapter: showDeleteChapterPrompt,
            baseChapters: baseChapters,
            currentChapter: currentChapter,
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
          text: `Are you sure you want to delete "${currentChapter?.header}"?`,
          modalTitle: `Delete Chapter`,
          funcToCall: deleteChapter
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
    </Wrapper >
  );
}

const SettingsModal = styled(Modal<IBurgerContentModalStyle>)`
  /* overflow: auto; */
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