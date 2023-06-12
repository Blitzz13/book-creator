import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { Settings, BookOpen } from "react-feather";
import BookSettingsSection from "../BookSettingsSection/BookSettingsSection";
import { generateId } from "../../helpers/helpFunctions";
import React from "react";
import Button from "../Button.ts/Button";
import IBookSidebarData from "../../interfaces/IBookSidebarData";
const bookSettingsAreaId = generateId(7);


export default function SidebarContent({ data, ...delegated }: IBookSidebarData) {
  const bookSettingsId = generateId(7);
  const headerSettingsId = generateId(7);
  const chapterSettingsId = generateId(7);

  const [areSettingsOpen, setAreSettingsOpen] = React.useState(true);

  return (
    <Wrapper isFromModal={data.isFromModal} {...delegated}>
      <HeaderWrapper isFromModal={data.isFromModal} id="header-settings">
        <SettingsIcon opacity={areSettingsOpen ? 0.5 : 1} onClick={() => setAreSettingsOpen(true)} />
        <OpenBookIcon opacity={areSettingsOpen ? 1 : 0.5} onClick={() => setAreSettingsOpen(false)} />
      </HeaderWrapper>
      <BookTitle>{data.title}</BookTitle>
      {areSettingsOpen ?
        <SectionsWrapper id="sections-wrapper">
          <SectionTitle data={{ title: "Book Settings", settingId: bookSettingsId }}></SectionTitle>
          <SettingsWrapper id={bookSettingsId}>
            <SettingsText>Book name: Test</SettingsText>
            <SettingsText>Font family: Arial</SettingsText>
            <SettingsText>Font size: 32px</SettingsText>
          </SettingsWrapper>
          <SectionTitle data={{ title: "Header Settings", settingId: headerSettingsId }}></SectionTitle>
          <SettingsWrapper id={headerSettingsId}>
            <SettingsText>Stylize first letter: true</SettingsText>
          </SettingsWrapper>
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle>
          <SettingsWrapper id={chapterSettingsId}>
            <SettingsText>Chapter name: Test</SettingsText>
            <SettingsText>Chapter state: Draft</SettingsText>
          </SettingsWrapper>
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle  >
        </SectionsWrapper> :
        <SectionsWrapper id="sections-wrapper">
          <ChapterName>The boy who lived</ChapterName>
          <ChapterName>The boy who didnt live</ChapterName>
          <ChapterName>The boy who didnt did live to be or new game</ChapterName>
          <ChapterName>Kpop</ChapterName>
        </SectionsWrapper>
      }
      <ButtonArea id={bookSettingsAreaId}>
        <SaveButton data={{ color: Colors.ACCENT, height: 51, width: 195, radius: 20, textSize: 22, type: "submit", onClick: () => { } }}>Save</SaveButton>
      </ButtonArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  ${({ isFromModal }: { isFromModal: boolean }) => css`
    height: ${isFromModal ? "100svh" : "100%"};
  `}
`

const BookTitle = styled.h2`
  text-align: center;
  margin: 10px;
`

const ButtonArea = styled.div`
  flex: 0 1 40px;
  display: flex;
  justify-content: center;
`

const SaveButton = styled(Button)`
  margin: 10px;
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
  overflow: auto;
  text-align: left;
  flex: 1 1 auto;
`

const SettingsIcon = styled(Settings)`
  margin-left: 14px;
  margin-top: 14px;
  margin-bottom: 14px;
  ${({ opacity }: { opacity: number }) => css`
    opacity: ${opacity};
  `}
`

const OpenBookIcon = styled(BookOpen)`
  margin-right: 14px;
  margin-top: 14px;
  margin-bottom: 14px;
  ${({ opacity }: { opacity: number }) => css`
    opacity: ${opacity};
  `}
`

const HeaderWrapper = styled.div`
  z-index: 1;
  background-color: ${Colors.ACCENT};
  height: 40px;
  ${({ isFromModal }: { isFromModal: boolean }) => css`
    border-top-right-radius: ${isFromModal ? 0 : 28}px;
    border-top-left-radius: ${isFromModal ? 0 : 28}px;
  `}
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-grow: 1; */
  /* width: 231px; */
  /* position: absolute; */
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0 2px 0;
  flex: 0 1 auto;
`

const SettingsWrapper = styled.div`
  display: none;
  text-align: left;
  margin-left: 4px;
  margin-bottom: 4px;
  display: none;
  flex-direction: column;
  gap: 6px;
`