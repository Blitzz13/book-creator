import styled from "styled-components";
import bookPath from "../../assets/Book.svg"
import pagePath from "../../assets/Page.svg"
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import $ from "jquery"
import Editor from "../Editor/Editor";
import IChapterService from "../../interfaces/service/chapter/IChapterService";
import { Colors } from "../../Colors";
import IBookService from "../../interfaces/service/book/IBookService";
import StyledWrapper from "../StyledWrapper/StyledWrapper";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import IBaseChapter from "../../interfaces/service/chapter/IBaseChapter";
import { BsFillArrowRightSquareFill, BsFillBookFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { MdNoteAdd } from "react-icons/md";
import Modal from "../Modal/Modal";
import { BurgerMenuModalStyle } from "../../commonStyledStyles/BurgerMenuModalStyle";
import ReadSideBarContent from "./ReadSideBarContent";
import INoteService from "../../interfaces/service/note/INoteService";
import NoteCreationModal from "../NoteCreationModal/NoteCreationModal";
import { generateId } from "../../helpers/helpFunctions";
import INoteModalModel from "../../interfaces/modal/INoteModalModel";
import { NoBackgroundContentModalStyle } from "../../commonStyledStyles/NoBackgroundContentModalStyle";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IBaseNote } from "../../interfaces/service/note/IBaseNote";
import { NoteModalMode } from "../../enums/NoteModalMode";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { CommonContentModalStyle } from "../../commonStyledStyles/CommonContentModalStyle";
import IUserService from "../../interfaces/service/user/IUserService";
import ISaveBookProgressRequest from "../../interfaces/service/user/ISaveBookProgressRequest";
import ISavedBookProgressResponse from "../../interfaces/service/user/ISavedBookProgressResponse";
import Loader from "../Loader/Loader";

const initialReadAreaPaddingLeft = 98;
const initialReadAreaPaddingRight = 82;
const readAreaPaddingRightShortText = 10;
const initialReadAreaHeightOffset = 30;
const columnGap = 64;
const wrapperGap = 18;
const readAreaId = generateId(7);

export default function ReadBook(data: {
  chapterService: IChapterService,
  bookService: IBookService,
  noteService: INoteService,
  userService: IUserService
}) {
  const [chapterTitle, setChapterTitle] = useState("");
  const [scrollPosX, setScrollPosX] = useState(0);
  const [imageScale, setScale] = useState(0);
  const [areChaptersSelected, setAreChaptersSelected] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false);
  const [isConfirmModalExiting, setIsConfirmModalExiting] = useState(false);
  const [isModalExiting, setModalExiting] = useState(false);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isNoteModalExiting, setNoteModalExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [chapters, setChapters] = useState<IBaseChapter[]>([]);
  const [notes, setNotes] = useState<IBaseNote[]>([]);
  const [currentChapterId, setCurrentChapterId] = useState("");
  const [noteModalData, setNoteModalData] = useState<INoteModalModel>({
    content: "",
    modalTitle: "Create Note",
    header: "",
    currentContent: "",
    isOpen: false,
    isExiting: false,
    mode: NoteModalMode.Creating,
  });
  const authContext = useAuthContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const firstElementOfThePage = useRef<JQuery<HTMLElement>[]>();
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeTimeoutRef2 = useRef<NodeJS.Timeout | null>(null);
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const params = useParams();

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const chapterId = queryParams.get('chapterId');
    const noteId = queryParams.get('noteId');

    if (chapterId) {
      setCurrentChapterId(chapterId);
      setShowLoader(true);
    }

    if (noteId) {
      setCurrentNote(noteId);
      setShowLoader(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (text !== "") {
      loadChapterProgress();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleResize = useCallback((skipHighlight = false) => {
    const quill = $(`#${readAreaId}`).find(".ql-editor");
    const lastQuillWidth = quill.outerWidth() || 0;

    if (window.innerWidth <= 600) {
      quill.css("column-count", "1");
    } else {
      quill.css("column-count", "2");
    }

    const readArea = $(`#${readAreaId}`);
    const readIcons = $("#read-icons");
    const sideBar = $("#side-bar");
    const bookImage = $("#book-image");
    const textOverlay = $("#text-overlay");
    const readIconsHeight = readIcons.is(":visible") ? (readIcons.outerHeight(true) || 0) : 0;
    const navBarHeight = $("#nav-bar").outerHeight();
    const bookImageWidth = bookImage.outerWidth();
    const bookImageHeight = bookImage.outerHeight();

    if (bookImage && textOverlay && navBarHeight && readArea && bookImageWidth && bookImageHeight && sideBar) {
      let scale = bookImageWidth / 1200;
      sideBar.outerHeight(bookImageHeight);

      if (scale < 1 &&
        !isAndroid &&
        !isIos &&
        firstElementOfThePage.current &&
        resizeTimeoutRef &&
        resizeTimeoutRef2) {
        if (!skipHighlight) {
          highlightElement(firstElementOfThePage.current[0], resizeTimeoutRef);
          // highlightElement(firstElementOfThePage.current[1], resizeTimeoutRef2);
        }
      }

      const isTextUpdated = updateIfTextTooShort();

      if (window.innerWidth <= 600) {
        scale = 1;
        readArea.css("padding-left", `0`);
        readArea.css("padding-right", `0`);
      } else {
        readArea.css("padding-left", `${initialReadAreaPaddingLeft * scale}px`);
        readArea.css("padding-right", `${initialReadAreaPaddingRight * scale}px`);
        if (isTextUpdated) {
          readArea.css("padding-right", `${readAreaPaddingRightShortText * scale}px`);
        }
      }
      scale = 1;

      setScale(scale);

      if (isTextUpdated && window.innerWidth > 600) {
        textOverlay.outerWidth(bookImageWidth / 2);
      } else {
        textOverlay.outerWidth(bookImageWidth);
      }

      textOverlay.outerHeight(bookImageHeight - (initialReadAreaHeightOffset * scale));

      setCssIosPropsForPages(quill);
      // const textElements = quill.children('p, span, h1, h2, h3, h4, h5, h6, ul, ol, li, div'); // Adjust the selector based on the text elements you want to scale

      // textElements.each((index, element: HTMLElement) => {
      //   const $jqueryElem: JQuery<HTMLElement> = $(element);
      //   let originalFontSize: number | undefined = $jqueryElem.data('originalFontSize');

      //   if (originalFontSize === undefined) {
      //     originalFontSize = parseFloat($jqueryElem.css('font-size') || '0');
      //     $jqueryElem.data('originalFontSize', originalFontSize); // Save the original font size as a data attribute
      //   }

      //   const scaledFontSize: number = originalFontSize * scale;
      //   $jqueryElem.css('font-size', scaledFontSize + 'px');
      // });

      // textElements.each((index, element: HTMLElement) => {
      //   const originalFontSize = parseFloat($(element).css('font-size'));
      //   const scaledFontSize = originalFontSize * scale;
      //   $(element).css('font-size', scaledFontSize + 'px');
      // });

      const currentWidth = quill.outerWidth() || 0;
      console.log("move quill left by", (quill.scrollLeft() || 0) + (currentWidth - lastQuillWidth) + 34);
      quill.outerHeight(textOverlay.outerHeight() || 0);
      quill.css("column-gap", `${columnGap * scale}px`);

      textOverlay.css("left", `${(bookImage.offset()?.left || 0) - 22.5}px`);
      textOverlay.css("top", `${(bookImage.offset()?.top || 0) - navBarHeight - (readIconsHeight || 0) - 9}px`);

      //TODO: Replace with use state
      if (firstElementOfThePage.current && firstElementOfThePage.current[0] && (firstElementOfThePage.current[0][0].offsetLeft + columnGap / 4) !== quill.scrollLeft()) {
        if (quill[0]) {
          quill[0].scrollTo(firstElementOfThePage.current[0][0].offsetLeft - (columnGap / 4), 0);
          setShowLoader(false);
        }
      }

      setWindowWidth(window.innerWidth)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function getColumnCount(containerSelector: string): number {
  //   const $container: JQuery<HTMLElement> = $(containerSelector);
  //   const $childElements: JQuery<HTMLElement> = $container.children();
  //   const containerWidth: number = $container.width() || 0;

  //   let totalColumnCount: number = 0;
  //   let totalWidth: number = 0;

  //   $childElements.each((index: number, element: HTMLElement) => {
  //     const $childElement: JQuery<HTMLElement> = $(element);
  //     const childWidth: number = $childElement.outerWidth(true) || 0;

  //     if (totalWidth + childWidth > containerWidth) {
  //       totalColumnCount++;
  //       totalWidth = 0;
  //     }

  //     totalWidth += childWidth;
  //   });

  //   if (totalWidth > 0) {
  //     totalColumnCount++;
  //   }

  //   return totalColumnCount;
  // }

  async function setCurrentNote(noteId: string): Promise<void> {
    const note = await data.noteService.getSpecificNote(noteId);
    setNoteModalData({ ...noteModalData, header: note.header, content: note.content });
  }

  async function saveNote(mode: NoteModalMode): Promise<void> {
    switch (mode) {
      case NoteModalMode.Creating:
        await createNote();
        break;
      case NoteModalMode.Editing:
        await editNote();
        break;
      default:
        break;
    }

  }

  async function createNote(): Promise<void> {
    if (params.bookId) {
      try {
        await data.noteService.createNote({
          bookId: params.bookId,
          chapterId: currentChapterId,
          content: noteModalData.currentContent,
          header: noteModalData.header,
          orderId: 1,
          authorId: authContext.user?.id || ""
        });

        setNoteModalExiting(true);
        await refreshNotes();

        return;
      } catch (error) {
        return;
      }

    }

    console.error("Book id is missing");
  }

  async function editNote(): Promise<void> {
    if (params.bookId) {
      try {
        const queryParams = new URLSearchParams(location.search);
        const noteId = queryParams.get('noteId');
        if (noteId) {
          await data.noteService.updateNote(noteId, {
            content: noteModalData.currentContent,
            header: noteModalData.header,
          });

          setNoteModalExiting(true);
          await refreshNotes();

          return;
        }

        console.error("Note id is missing");

        return;
      } catch (error) {
        return;
      }

    }

    console.error("Book id is missing");
  }

  async function deleteNote(): Promise<void> {
    const queryParams = new URLSearchParams(location.search);
    const noteId = queryParams.get('noteId');
    if (noteId) {
      try {

        await data.noteService.deleteNote(noteId);
        setIsConfirmModalExiting(true);
        await refreshNotes();
        return;
      } catch (error) {
        console.error(error);
        return;
      }
    }
    console.error("Missing note id");
  }

  async function refreshNotes(): Promise<void> {
    if (params.bookId) {
      const notes = await data.noteService.getAllBaseNotes(params.bookId);
      setNotes(notes);
    }
  }

  function getFirstVisibleElement(container: JQuery<HTMLElement>): JQuery<HTMLElement>[] {
    const containerOffset = container.scrollLeft() || 0;
    // const containerWidth = container.width() || 0;

    const firstElement = container.children().filter((index, element) => {
      const elementOffset: number = element.offsetLeft || 0;
      // const elementWidth: number = element.clientWidth || 0;

      // return (elementOffset >= containerOffset && (elementOffset + elementWidth) <= (containerOffset + containerWidth));
      return (elementOffset >= containerOffset);
    }).first();

    const previousPageElement = container.children().filter((index, element) => {
      const elementOffset: number = element.offsetLeft || 0;
      // const elementWidth: number = element.clientWidth || 0;

      // return (elementOffset >= containerOffset && (elementOffset + elementWidth) <= (containerOffset + containerWidth));
      return (elementOffset < containerOffset);
    }).last();

    return [firstElement, previousPageElement];
  }

  async function load(): Promise<void> {
    if (params.bookId) {
      setShowLoader(true);
      // const book = await data.bookService.fetchBook(params.bookId);
      const loadedChapters = await data.chapterService.fetchAllChapterTitles(params.bookId);

      let currentChapterId = searchParams.get("chapterId");

      if (!currentChapterId) {
        if (authContext.user) {
          const progress = await data.userService.getBookProgress({
            bookId: params.bookId,
            userId: authContext.user.id
          });

          if (progress) {
            currentChapterId = progress.currentChapterId;
            setSearchParams(`?chapterId=${currentChapterId}`);
          } else {
            currentChapterId = setFirstChapter(loadedChapters);
          }
        } else {
          //TODO: check what happen to book without chapters
          currentChapterId = setFirstChapter(loadedChapters);
        }
      }

      const notes = await data.noteService.getAllBaseNotes(params.bookId);
      await loadChapter(currentChapterId);
      setCurrentChapterId(currentChapterId);
      setChapters(loadedChapters);
      setNotes(notes);
      setLoaded(true);
      handleResize(true);
    }

  }

  function setFirstChapter(chapters: IBaseChapter[]): string {
    const currentChapterId = chapters.find(x => x.orderId === 1)?._id || ""
    setSearchParams(`?chapterId=${currentChapterId}`);

    return currentChapterId;
  }

  const loadChapter = useCallback(async (chapterId: string) => {
    setScrollPosX(0);
    const chapter = await data.chapterService.fetchChapter(chapterId);
    setText(chapter.content);
    setChapterTitle(chapter.header);

    return chapter;
  }, [data.chapterService]);

  function updateIfTextTooShort(): boolean {
    const quill = $(`#${readAreaId}`).find(".ql-editor");
    const textElements = quill.children('p, span, h1, h2, h3, h4, h5, h6, ul, ol, li, div');
    let height = 0

    textElements.each((index, element: HTMLElement) => {
      const jqueryElem: JQuery<HTMLElement> = $(element);
      height += jqueryElem.outerHeight() || 0;
    });

    if (height < (quill.outerHeight() || 0)) {
      quill.css("column-count", "1");
      return true;
    }

    return false;
  }

  function setElementBackground(element: JQuery<HTMLElement>, removeHighlight?: boolean): void {
    // element.css("background-color", Colors.ACCENT);
    // if (element.is(":animated")) {
    //   return;
    // }
    element.css("background-color", `${removeHighlight ? "transparent" : Colors.ACCENT}`);
    // element.animate({ opacity: 0 }, 500, "", () => {
    //   element.css("background-color", Colors.ACCENT);
    // }).animate({ opacity: 1 }, 500, "", () => highlightElement(element));

    // setTimeout(() => {
    //   element.animate({ opacity: 0 }, 500, "", () => {
    //     element.css("background-color", "revert");
    //   }).animate({ opacity: 1 }, 500);

    //   element.stop();
    // }, duration);
  }

  useEffect(() => {
    if (currentChapterId) {
      loadChapter(currentChapterId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapterId])

  useEffect(() => {
    // updateIfTextTooShort();
    handleResize(!loaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize, text])

  useEffect(() => {
    const quill = $(`#${readAreaId}`).find(".ql-editor");
    quill.scrollLeft(scrollPosX * imageScale);
    console.log("scroll pos x", quill.scrollLeft());

    if (loaded) {
      firstElementOfThePage.current = getFirstVisibleElement(quill);
      const textReference = firstElementOfThePage.current[0][0].textContent
      saveChapterProgress(textReference);
      console.log(textReference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosX, imageScale]);

  useEffect(() => {
    const quill = $(`#${readAreaId}`).find(".ql-editor");
    quill.css("overflow", "hidden");
    quill.css("column-gap", `${columnGap}px`);
    $(`#${readAreaId}`).find(".ql-container").css("background-color", "transparent");

  }, []);

  window.addEventListener("orientationchange", () => {
    const quill = $(`#${readAreaId}`).find(".ql-editor");
    setCssIosPropsForPages(quill);

    if (firstElementOfThePage.current && firstElementOfThePage.current[0] && (firstElementOfThePage.current[0][0].offsetLeft + columnGap / 4) !== quill.scrollLeft()) {
      if (quill[0]) {
        quill[0].scrollTo(firstElementOfThePage.current[0][0].offsetLeft - (columnGap / 4), 0);
      }

      if (resizeTimeoutRef && resizeTimeoutRef2) {
        highlightElement(firstElementOfThePage.current[0], resizeTimeoutRef, 3000);
        highlightElement(firstElementOfThePage.current[1], resizeTimeoutRef2, 3000);
      }
    }
  })

  useEffect(() => {
    handleResize(); // Initial calculation
    load();

    $(window).on("resize", () => handleResize());
    return () => {
      $(window).off("resize", () => handleResize());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setCssIosPropsForPages(quill: JQuery<HTMLElement>) {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && window.innerWidth <= 600) {
      quill.css("column-width", `${$("#book-image").outerWidth()}px`);
    } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      quill.css("column-width", `revert`);
      quill.css("column-count", "2");
    }
  }

  function changePage(changeForwards: boolean): void {
    const quill = $(`#${readAreaId}`).find(".ql-editor");
    const quilScrollLeft = quill.scrollLeft();
    const quillWidth = quill.outerWidth(true);

    if (quill && quilScrollLeft !== undefined && quillWidth) {
      let pos;
      if (changeForwards) {
        pos = quilScrollLeft + quillWidth + ((68 / 2) * imageScale);
      } else {
        pos = quilScrollLeft - quillWidth - ((68 / 2) * imageScale);
      }

      setScrollPosX(pos);
    }
  }

  function saveChapterProgress(text: string | null): void {
    const quill = $(`#${readAreaId}`).find(".ql-editor");
    if (!text || text.length < 10) {
      const previousPageElement = quill.children().filter((index, element) => {
        const elementOffset: number = element.offsetLeft || 0;
        return (elementOffset >= (quill.scrollLeft() || 0) && (element.textContent?.length || 0) > 10);
      }).first();

      text = previousPageElement.text();
    }

    if (params.bookId && currentChapterId) {
      const percentage = (quill.scrollLeft() || 0) / ((quill[0].scrollWidth - quill[0].clientWidth) || 0);

      const progress: ISaveBookProgressRequest = {
        bookId: params.bookId,
        currentChapterId: currentChapterId,
        restoreRefference: text.trim().toString(),
        userId: authContext.user?.id || "",
        chapterPercentage: isNaN(percentage) ? 1 : percentage,
      }

      const localStorageItem = localStorage.getItem(params.bookId);

      let localStorageProgress: ISavedBookProgressResponse | undefined;
      if (localStorageItem) {
        localStorageProgress = JSON.parse(localStorageItem);
      }

      if (authContext.user) {
        if (localStorageProgress) {
          progress.restoreRefference = localStorageProgress.restoreRefference;
        }

        localStorage.removeItem(params.bookId);
        progress.userId = authContext.user.id;
        data.userService.saveBookProgress(progress);
      } else {
        localStorage.setItem(params.bookId, JSON.stringify({ currentChapterId: progress.currentChapterId, restoreRefference: progress.restoreRefference }));
      }
    }
  }

  async function loadChapterProgress(): Promise<void> {
    if (params.bookId) {
      const quill = $(`#${readAreaId}`).find(".ql-editor");
      let progress: ISavedBookProgressResponse | undefined;

      if (authContext.user) {
        progress = await data.userService.getBookProgress({
          bookId: params.bookId,
          userId: authContext.user.id
        });
      }

      if (!progress) {
        const localStorageItem = localStorage.getItem(params.bookId);
        if (localStorageItem) {
          progress = JSON.parse(localStorageItem);
        }
      }

      if (progress) {
        const quillChildren = quill[0].children;
        let tag: Element | null = null;

        for (let i = 0; i < quillChildren.length; i++) {
          const element = quillChildren[i];
          if (element.textContent?.trim() === progress.restoreRefference) {
            tag = element;
            break;
          }
        }

        if (tag) {
          const tagLeft = tag.getBoundingClientRect().left;
          setScrollPosX(tagLeft - quill[0].getBoundingClientRect().left);
          firstElementOfThePage.current = [$(tag as HTMLElement), $(tag as HTMLElement)];
          if (localStorage.getItem(params.bookId)) {
            saveChapterProgress("");
          }
        } else {
          saveChapterProgress("");
        }
        setShowLoader(false);
      } else {
        saveChapterProgress("");
        setShowLoader(false);
      }
    }
  }


  function highlightElement(element: JQuery<HTMLElement>, timeOut: MutableRefObject<NodeJS.Timeout | null>, duration = 1500) {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    // Start a new timeout to indicate the end of the resize operation
    const timeout = setTimeout(() => {
      if (element) {
        setElementBackground(element, true);
      }

      console.log("Resize operation ended");
    }, duration);

    timeOut.current = timeout;

    //Only highlight the element if its not highlited
    if (element && element.css("background-color") !== Colors.ACCENT) {
      setElementBackground(element);
    }
  }

  function showModal(openChapters: boolean): void {
    setModalOpen(true);
    setAreChaptersSelected(openChapters);
  }

  return (
    <Wrapper>
      <Loader data={{ isLoading: showLoader }} />
      <IconsWrapepr id="read-icons">
        <BookIcon size={28} onClick={() => showModal(true)} />
        <NotesIcon size={28} onClick={() => showModal(false)} />
        <ChapterTitle> {chapterTitle}</ChapterTitle>
        <AddNoteIcon size={28} onClick={() => setNoteModalOpen(true)} />
      </IconsWrapepr>
      <ImageWrapper>
        {(windowWidth > 600) && <Image id="book-image" src={bookPath} alt="SVG Image" onLoad={() => handleResize()} />}
        {(windowWidth <= 600) && <PageImage id="book-image" src={pagePath} alt="SVG Image" onLoad={() => handleResize()} />}
        <TextOverlay id="text-overlay">
          <ReadArea id={readAreaId} data={{ setData: text, theme: "bubble", readonly: true }} />
        </TextOverlay>
      </ImageWrapper>
      <SideBar id="side-bar">
        <ReadSideBarContent data={{
          baseChapters: chapters,
          currentChapterId: currentChapterId,
          isInWritingMode: false,
          isFromModal: false,
          baseNotes: notes,
          areChaptersSelected: areChaptersSelected,
          setChaptersSelected: setAreChaptersSelected,
          onNoteClick: () => {
            setNoteModalOpen(true);
            setNoteModalData({ ...noteModalData, mode: NoteModalMode.Reading });
          },
          onNoteEditClick: () => {
            setNoteModalOpen(true);
            const noteId = searchParams.get("noteId");
            if (noteId) {
              setCurrentNote(noteId);
            }
            setNoteModalData({ ...noteModalData, mode: NoteModalMode.Editing });
          },
          onNoteDeleteClick: () => {
            setisConfirmModalOpen(true);
          },
          onNoteCreateClick: () => {
            setNoteModalOpen(true);
            setNoteModalData({ ...noteModalData, header: "", currentContent: "", content: "", mode: NoteModalMode.Creating });
          }
        }} />
      </SideBar>
      <Modal data={{
        isOpen: isModalOpen,
        isExiting: isModalExiting,
        ContentElement: BurgerMenuModalStyle,
        contentData: {
          width: "65%",
          isExiting: isModalExiting,
        },
        setOpen: setModalOpen,
        setExiting: setModalExiting,
      }}>
        <ReadSideBarContent data={{
          baseChapters: chapters,
          currentChapterId: currentChapterId,
          isInWritingMode: false,
          isFromModal: true,
          baseNotes: notes,
          areChaptersSelected: areChaptersSelected,
          onChapterClick: () => { setModalExiting(true) },
          setChaptersSelected: setAreChaptersSelected,
          onNoteClick: () => {
            setNoteModalData({ ...noteModalData, mode: NoteModalMode.Reading });
            setModalExiting(true);
            setNoteModalOpen(true);
          },
          onNoteEditClick: () => {
            setNoteModalData({ ...noteModalData, mode: NoteModalMode.Editing });
            setModalExiting(true);
            setNoteModalOpen(true);
          },
          onNoteDeleteClick: () => {
            setModalExiting(true);
            setisConfirmModalOpen(true);
          },
          onNoteCreateClick: () => {
            setNoteModalData({ ...noteModalData, mode: NoteModalMode.Creating });
            setModalExiting(true);
            setNoteModalOpen(true);
          }
        }} />
      </Modal>
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
          text: `Are you sure you want to delete "${noteModalData.header}"?`,
          modalTitle: "Delete Note",
          funcToCall: () => deleteNote(),
        }}>
      </ConfirmationModal>
      <NoteCreationModal data={{
        isOpen: isNoteModalOpen,
        isExiting: isNoteModalExiting,
        ContentElement: NoBackgroundContentModalStyle,
        contentData: {
          width: "400px",
          isExiting: isNoteModalExiting
        },
        setOpen: setNoteModalOpen,
        setExiting: setNoteModalExiting,
      }}
        noteData={{
          modalTitle: noteModalData.modalTitle,
          initialDescription: noteModalData.content,
          noteTitle: noteModalData.header,
          currentContent: noteModalData.currentContent,
          mode: noteModalData.mode,
          onNoteTitleChange: (text: string) => {
            setNoteModalData({ ...noteModalData, header: text });
          },
          onDescriptionChange: (text: string) => {
            setNoteModalData({ ...noteModalData, currentContent: text });
          },
          onSaveClick: (mode: NoteModalMode) => saveNote(mode),
        }}>
      </NoteCreationModal>
      <ControlsWrapper>
        <ArrowLeftIcon onClick={() => changePage(false)} />
        <ArrowRightIcon onClick={() => changePage(true)} />
      </ControlsWrapper>
    </Wrapper>
  );
}

const NotesIcon = styled(GiNotebook)`
min-width: 28px;
  cursor: pointer;
`;

const AddNoteIcon = styled(MdNoteAdd)`
min-width: 28px;
  color: ${Colors.ACCENT};
  margin-left: auto;
  cursor: pointer;
`;

const BookIcon = styled(BsFillBookFill)`
min-width: 28px;
  cursor: pointer;
`;

const ArrowRightIcon = styled(BsFillArrowRightSquareFill)`
  font-size: 160%;
  cursor: pointer;
`;

const ArrowLeftIcon = styled(ArrowRightIcon)`
  transform: rotate(180deg);
`;

const Wrapper = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  display: grid;
  gap: ${wrapperGap}px;
  grid-template-columns: 1fr 234px;
  grid-template-areas:"a b";

  @media only screen and (max-width: 915px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  @media only screen and (max-height: 500px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 600px) {
    display: revert;
  }
`;

const IconsWrapepr = styled.div`
  display: none;
  justify-content: left;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;

  @media only screen and (max-width: 915px) {
    display: flex;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;

  @media only screen and (max-width: 915px) {
    margin-top: 18px;
  }
`;

const SideBar = styled(StyledWrapper)`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  @media only screen and (max-width: 915px) {
    display: none;
  }
`;

const Image = styled.img`
  flex-grow: 1;
  width: 100%;
  /* height: 100%; */
  max-width: 1200px;
`;

const PageImage = styled(Image)`
  height: 80svh;
  object-fit: cover;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const TextOverlay = styled.div`
  overflow: hidden;
  position: absolute;
  text-align: justify;
`;

const ChapterTitle = styled.span`
  
`

const ReadArea = styled(Editor)`
  padding-left: ${initialReadAreaPaddingLeft}px;
  padding-right: ${initialReadAreaPaddingRight}px;
`;