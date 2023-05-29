import styled from "styled-components";
import StyledWrapper from "../StyledWrapper/StyledWrapper";
import { Colors } from "../../Colors";
import { Settings, BookOpen } from "react-feather";
import BookSettingsSection from "../BookSettingsSection/BookSettingsSection";
import $ from "jquery";
import { generateId } from "../../helpers/helpFunctions";

function resizeSettings() {
  const wrapper = $("#book-settings").outerHeight();
  const settings = $("#header-settings").outerHeight();
  const sectionsWrapper = $("#sections-wrapper");

  if (wrapper && settings) {
    sectionsWrapper.height(wrapper - settings);
  }
}


export default function BookSettings(data: any) {
  const bookSettingsId = generateId(7);
  const headerSettingsId = generateId(7);
  const chapterSettingsId = generateId(7);
  window.addEventListener("resize", () => {
    resizeSettings();
  });

  window.addEventListener("load", () => {
    resizeSettings();
  })

  return (
    <Wrapper {...data}>
      <HeaderWrapper id="header-settings">
        <SettingsIcon />
        <OpenBookIcon />
      </HeaderWrapper>
      <SectionsWrapper id="sections-wrapper">
        <SectionTitle data={{ title: "Book Settings", settingId: bookSettingsId }}></SectionTitle>
        <SettingsWrapper id={bookSettingsId}>
          <p>Book name: Test</p>
          <p>Font family: Arial</p>
          <p>Font size: 32px</p>
        </SettingsWrapper>
        <SectionTitle data={{ title: "Header Settings", settingId: headerSettingsId }}></SectionTitle>
        <SettingsWrapper id={headerSettingsId}>
          <p>Stylize first letter: true</p>
        </SettingsWrapper>
        <SectionTitle data={{ title: "Chapter Settings",settingId: chapterSettingsId }}></SectionTitle  >
        <SettingsWrapper id={chapterSettingsId}>
          <p>Chapter name: Test</p>
          <p>Chapter state: Draft</p>
        </SettingsWrapper>
      </SectionsWrapper>
    </Wrapper>
  );
}

const SectionTitle = styled(BookSettingsSection)`
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0 2px 0;
`

const SectionsWrapper = styled.div`
  margin-top: 40px;
  overflow-y: auto;
`

const SettingsIcon = styled(Settings)`
  margin-left: 14px;
`

const OpenBookIcon = styled(BookOpen)`
  margin-right: 14px;
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
  width: 187px;
  position: absolute;
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0 2px 0;
`

const Wrapper = styled(StyledWrapper)`
  margin-left: 22px;
  margin-right: 22px;
  overflow-y: hidden;
  isolation: isolate;
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