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
  const [isOpen, setIsOpen] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [updatedChapterTitle, setUpdatedChapterTitle] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [content, setContent] = useState("");
  const [chapterTitles, setChapterTitles] = useState<IBaseChapter[]>([]);

  window.addEventListener("resize", () => {
    resizeContentTextarea();
  });

  window.addEventListener("load", () => {
    resizeContentTextarea();
  })

  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  function onChapterTitleChange(event: any): void {
    setUpdatedChapterTitle(event.target.value);
  }

  function onSettingsClick(): void {
    setAreSettingsOpen(true);
    setIsOpen(!isOpen);
  }

  function onBookClick(): void {
    setAreSettingsOpen(false);
    setIsOpen(!isOpen);
  }

  async function onCreateChapterClick(): Promise<void> {
    if (params.bookId) {
      const chapterId = searchParams.get("chapterId");
      if (chapterId) {
        const chapter = await data.chapterService.updateChapter({ chapterId: chapterId, content: editorContent, header: updatedChapterTitle, orderId: "1" });
        setChapterTitle(chapter.header);
      } else {
        const chapter = await data.chapterService.createChapter({ bookId: params.bookId, content: editorContent, header: updatedChapterTitle, orderId: "1" });
        setSearchParams(`?chapterId=${chapter._id}`)
      }
    }
  }


  useEffect(() => {
    resizeContentTextarea();

    const fetchData = async () => {
      try {
        if (params.bookId) {
          const book: IServiceBook = await data.bookService.fetchBook(params.bookId);
          const chapters: IBaseChapter[] = await data.chapterService.fetchAllChapterTitles(params.bookId);
          setChapterTitles(chapters);

          const chapterId = searchParams.get("chapterId");
          if (chapterId) {
            const chapter: IServiceChapter = await data.chapterService.fetchChapter(chapterId);

            setUpdatedChapterTitle(chapter.header);
            setContent(chapter.content);
          }

          setTitle(book.title);
        }
      } catch (error) {
        navigate("*");
      }
    }

    fetchData().catch();
  }, [data.bookService, data.chapterService, navigate, params.bookId, searchParams, chapterTitle]);

  return (
    <Wrapper onLoad={resizeContentTextarea}>
      <HeaderWrapper id="header-textarea">
        <HeaderOverflowHide>
          <HeaderTextarea onChange={onChapterTitleChange} value={updatedChapterTitle} name="header-textarea" placeholder="Enter chapter name here" />
        </HeaderOverflowHide>
        <IconsWrapper>
          <SettingsIcon onClick={onSettingsClick} />
          <BookIcon onClick={onBookClick} />
          <CheckIcon onClick={onCreateChapterClick} />
        </IconsWrapper>
      </HeaderWrapper>
      <ContentTextarea data={{
        onValueChange: setEditorContent, setData: content, modules: {
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
          chapterTitles: chapterTitles
        }
      } id="book-settings" />
      <SettingsModal data={{
        isOpen: isOpen,
        isExiting: isExiting,
        ContentElement: BurgerMenuModalStyle,
        contentData: {
          width: "65%",
          isExiting: isExiting,
        },
        setOpen: setIsOpen,
        setExiting: setIsExiting,
      }}>
        <SidebarContent data={
          {
            title: title,
            isFromModal: true,
            areSettingsOpen: areSettingsOpen,
            setAreSettingsOpen: setAreSettingsOpen,
            saveChapter: onCreateChapterClick,
            chapterTitles: chapterTitles
          }
        } />
      </SettingsModal>
    </Wrapper>
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
  }
`;

const Settings = styled(BookSidebar)`
  grid-area: b;

  @media only screen and (max-width: 690px) {
    display: none;
    /* position: absolute; */
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