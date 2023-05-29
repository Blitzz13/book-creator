import styled from "styled-components";
import { Colors } from "../../Colors";
import BookSettings from "../BookSettings/BookSettings";
import $ from "jquery";

function resizeContentTextarea() {
  const contentTextArea = $("#content-textarea");
  const settings = $("#book-settings");

  if (contentTextArea) {
    const navHeight = $("#nav-bar").outerHeight(true);
    const headerHeight = $("#header-textarea").outerHeight(true);
    const contentHeight = window.innerHeight - (navHeight ? navHeight : 0) - (headerHeight ? headerHeight : 0) - 40;
    contentTextArea.height(contentHeight);
    settings.height(contentHeight + (headerHeight ? headerHeight : 0) + 15);
  }
}

export default function WriteBook(data: any) {

  window.addEventListener("resize", () => {
    resizeContentTextarea();
  });

  window.addEventListener("load", () => {
    resizeContentTextarea();
  })
  return (
    <Wrapper onLoad={resizeContentTextarea}>
      <HeaderTextarea id="header-textarea" name="textarea" placeholder="Enter chapter name here"></HeaderTextarea>
      <ContentTextarea id="content-textarea" name="textarea" placeholder="Enter content here"></ContentTextarea>
      <Settings id="book-settings"></Settings>
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
`;

const ContentTextarea = styled.textarea`
  background-color: ${Colors.FOREGROUND};
  width: 100%;
  resize: none;
  grid-area: c;
`;

const Settings = styled(BookSettings)`
  grid-area: b;
`;

const Wrapper = styled.div`
  margin-left: 22px;
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr 234px;
  grid-template-areas:
  "a b"
  "c b";
`;