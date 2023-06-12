import styled from "styled-components";
import { Colors } from "../../Colors";
import BookSidebar from "../BookSidebar/BookSidebar";
import $ from "jquery";
import Editor from "../Editor/Editor";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IWriteBookData from "../../interfaces/IWriteBookData";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { IoSettingsSharp } from "react-icons/io5";
import Modal from "../Modal/Modal";
import SidebarContent from "../BookSidebar/SidebarContent";
import { BurgerMenuModalStyle } from "../../commonStyledStyles/BurgerMenuModalStyle";
import IBurgerContentModalStyle from "../../interfaces/modal/IBurgerContentModalStyle";

function resizeContentTextarea() {
  const contentTextArea = $("#writing-area");
  const settings = $("#book-settings");
  const quilToolbar = $(".ql-toolbar").outerHeight(true);

  if (contentTextArea && quilToolbar) {
    const navHeight = $("#nav-bar").outerHeight(true);
    const headerHeight = $("#header-textarea").outerHeight(true);
    const contentOffset = 40;
    const sidebarOffset = 15;
    const contentHeight = window.innerHeight - (navHeight ? navHeight : 0) - (headerHeight ? headerHeight : 0) - contentOffset;
    contentTextArea.css("padding-bottom", `${quilToolbar}px`)
    contentTextArea.outerHeight(contentHeight);
    settings.height(contentHeight + (headerHeight ? headerHeight : 0) + sidebarOffset);
    console.log(settings.height());
  }
}

export default function WriteBook(data: IWriteBookData) {
  const params = useParams();
  const [isExiting, setIsExiting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  window.addEventListener("resize", () => {
    resizeContentTextarea();
  });

  window.addEventListener("load", () => {
    resizeContentTextarea();
  })

  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  function onSettingsClick(): void {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    resizeContentTextarea();

    const fetchData = async () => {
      try {
        if (params.bookId) {
          const book: IServiceBook = await data.bookService.fetchBook(params.bookId);
          setTitle(book.title);
        }
      } catch (error) {
        navigate("*");
      }
    }

    fetchData().catch();
  });

  return (
    <Wrapper onLoad={resizeContentTextarea}>
      <HeaderWrapper id="header-textarea">
        <HeaderOverflowHide>
          <HeaderTextarea name="header-textarea" placeholder="Enter chapter name here"></HeaderTextarea>
        </HeaderOverflowHide>
        <IconsWrapper>
          <SettingsIcon onClick={onSettingsClick}></SettingsIcon>
        </IconsWrapper>
      </HeaderWrapper>
      <ContentTextarea data={{}} id="writing-area"></ContentTextarea>
      <Settings data={{ title: title, isFromModal: false }} id="book-settings" />
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
        <SidebarContent data={{ title: title, isFromModal: true }} />
      </SettingsModal>
    </Wrapper>
  );
}

const SettingsModal = styled(Modal<IBurgerContentModalStyle>)`
  /* overflow: auto; */
`

const IconsWrapper = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: left;
`

const SettingsIcon = styled(IoSettingsSharp)`
  display: none;
  font-size: 150%;
  @media only screen and (max-width: 690px) {
    display: revert;
  }
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
`;

const Settings = styled(BookSidebar)`
  grid-area: b;

  @media only screen and (max-width: 690px) {
    display: none;
    /* position: absolute; */
  }

  @media only screen and (max-height: 500px) {
    /* display: none; */
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