import styled from "styled-components";
import { Colors } from "../../Colors";
import BookSidebar from "../BookSidebar/BookSidebar";
import $ from "jquery";
import Editor from "../Editor/Editor";
import { useEffect } from "react";

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

export default function WriteBook(data: any) {

  window.addEventListener("resize", () => {
    resizeContentTextarea();
  });

  window.addEventListener("load", () => {
    resizeContentTextarea();
  })

  useEffect(() => {
    resizeContentTextarea();
  },[])
  return (
    <Wrapper onLoad={resizeContentTextarea}>
      <HeaderTextarea id="header-textarea" name="textarea" placeholder="Enter chapter name here"></HeaderTextarea>
      <ContentTextarea data={{}} id="writing-area"></ContentTextarea>
      {/* <Editor /> */}
      <Settings id="book-settings" />
    </Wrapper>
  );
}

const HeaderTextarea = styled.textarea`
  background-color: ${Colors.FOREGROUND};
  text-align: center;
  width: 100%;
  height: 78px;
  max-height: 78px;
  resize: none;
  grid-area: a;
  font-size: ${32 / 16}rem;
`;

const ContentTextarea = styled(Editor)`
  grid-area: c;
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