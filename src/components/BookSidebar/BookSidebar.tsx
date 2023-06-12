import styled, { css } from "styled-components";
import StyledWrapper from "../StyledWrapper/StyledWrapper";
import { Colors } from "../../Colors";
import { Settings, BookOpen } from "react-feather";
import BookSettingsSection from "../BookSettingsSection/BookSettingsSection";
import $ from "jquery";
import { generateId } from "../../helpers/helpFunctions";
import React, { useEffect } from "react";
import Button from "../Button.ts/Button";
import IBookSidebarData from "../../interfaces/IBookSidebarData";
import SidebarContent from "./SidebarContent";
const bookSettingsAreaId = generateId(7);

function resizeSettings() {
  const wrapperHeight = $("#book-settings").outerHeight();
  const settingsHeight = $("#header-settings").outerHeight();
  const sectionsWrapper = $("#sections-wrapper");
  const saveButtonHeight = $(`#${bookSettingsAreaId}`).outerHeight(true);

  if (wrapperHeight && settingsHeight && saveButtonHeight) {
    sectionsWrapper.height(wrapperHeight - settingsHeight - saveButtonHeight);
  }
}


export default function BookSidebar({ data, ...delegated }: IBookSidebarData) {
  const bookSettingsId = generateId(7);
  const headerSettingsId = generateId(7);
  const chapterSettingsId = generateId(7);

  const [areSettingsOpen, setAreSettingsOpen] = React.useState(true);

  // function onIconClick(areSettings: boolean): void {
  //   setAreSettingsOpen(areSettings);
  // }

  window.addEventListener("resize", () => {
    // resizeSettings();
  });

  window.addEventListener("load", () => {
    // resizeSettings();
  })

  useEffect(() => {
    // resizeSettings();
  }, [])

  return (
    <Wrapper {...delegated}>
      <SidebarContent data={data}/>
    </Wrapper>
  );
}

const BookTitle = styled.h2`
`

const ButtonArea = styled.div`
`

const SaveButton = styled(Button)`
  margin-bottom: 10px;
`

const SectionTitle = styled(BookSettingsSection)`
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0 2px 0;
`

const ChapterName = styled.p`
  margin: 4px 6px 12px 6px;
  font-size: ${18 / 16}rem;
  cursor: pointer;
`

const SettingsText = styled.p`
  font-size: ${18 / 16}rem;
  cursor: pointer;
`

const SectionsWrapper = styled.div`
  /* margin-top: 40px; */
  overflow-y: auto;
  text-align: left;
`

const SettingsIcon = styled(Settings)`
  margin-left: 14px;
  /* margin-right: auto; */
  ${({ opacity }: { opacity: number }) => css`
    opacity: ${opacity};
  `}
`

const OpenBookIcon = styled(BookOpen)`
  margin-right: 14px;
  ${({ opacity }: { opacity: number }) => css`
    opacity: ${opacity};
  `}
`

const HeaderWrapper = styled.div`
  z-index: 1;
  background-color: ${Colors.ACCENT};
  height: 40px;
  border-top-right-radius: 28px;
  border-top-left-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-grow: 1; */
  /* width: 231px; */
  width: 100;
  /* position: absolute; */
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0 2px 0;
`

const Wrapper = styled(StyledWrapper)`
  /* display: flex;
  flex-direction: column; */
  /* margin-left: 22px; */
  /* margin-right: 22px; */
  /* overflow-y: hidden; */
  /* isolation: isolate; */
  /* grid-area: b; */
`;

const SettingsWrapper = styled.div`
  display: none;
  text-align: left;
  margin-left: 4px;
  margin-bottom: 4px;
  display: none;
  flex-direction: column;
  gap: 6px;
`