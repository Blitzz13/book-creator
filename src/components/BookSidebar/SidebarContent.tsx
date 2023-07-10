import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { Settings, BookOpen } from "react-feather";
import BookSettingsSection from "../BookSettingsSection/BookSettingsSection";
import { generateId } from "../../helpers/helpFunctions";
import Button from "../Button/Button";
import IBookSidebarData from "../../interfaces/IBookSidebarData";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import { ChapterState } from "../../enums/ChapterState";
import { BookState } from "../../enums/BookState";
import ChaptersContent from "./ChaptersContent";
const buttonAreaId = generateId(7);
const titleId = generateId(7);

//To fix issue on ios
// function resizeContentArea() {
//   const contentArea = $("#sections-wrapper");
//   const buttons = $(`#${buttonAreaId}`);
//   const title = $(`#${titleId}`);

//   // if (window.visualViewport) {
//     const navHeight = $("#nav-bar").outerHeight(true);
//     const headerHeight = $("#header-textarea").outerHeight(true);
//     const contentOffset = 40;
//     const sidebarOffset = 15;
//     const contentHeight = window.innerHeight - (title.outerHeight() || 0) - (buttons.outerHeight() || 0) - 700;
//     // contentArea.css("padding-bottom", `${quilToolbar}px`)
//     contentArea.outerHeight(200);
//     // contentArea.css("height", "100px");
//     (window as any).test  = contentArea;
//     // buttons.height(contentHeight + (headerHeight ? headerHeight : 0) + sidebarOffset);
//   // }
// }

export default function SidebarContent({ data, ...delegated }: IBookSidebarData) {
  const bookSettingsId = generateId(7);
  const headerSettingsId = generateId(7);
  const chapterSettingsId = generateId(7);
  const params = useParams();
  const navigate = useNavigate();

  const [isChapterStateOpen, setIsChapterStateOpen] = useState(false);
  const [isBookStateOpen, setIsBookStateOpen] = useState(false);

  function onSelectChapterState(state: ChapterState): void {
    data.updateCurrentChapter({ ...data.currentChapter, state: state })
  }

  function onSelectBookState(state: BookState): void {
    data.updateBook({ ...data.book, state: state })
  }

  return (
    <Wrapper isFromModal={data.isFromModal} {...delegated}>
      <HeaderWrapper isFromModal={data.isFromModal} id="header-settings">
        <SettingsIcon opacity={data.areSettingsOpen ? 0.5 : 1} onClick={() => data.setAreSettingsOpen(true)} />
        <OpenBookIcon opacity={data.areSettingsOpen ? 1 : 0.5} onClick={() => data.setAreSettingsOpen(false)} />
      </HeaderWrapper>
      <BookTitle id={titleId}>{data.title}</BookTitle>
      {data.areSettingsOpen ?
        <SectionsWrapper id="sections-wrapper">
          <SectionTitle data={{ title: "Book Settings", settingId: bookSettingsId }}></SectionTitle>
          <SettingsWrapper id={bookSettingsId}>
            <SettingsText>
              <NoWrapText>
                Title:
              </NoWrapText>
              <SettingsInput onValueChange={(text: string) => { data.updateBook({ ...data.book, title: text }) }} value={data.book.title} />
            </SettingsText>
            <SettingsText>
              <NoWrapText>
                Front Cover:
              </NoWrapText>
              <SettingsInput onValueChange={(text: string) => {
                data.updateBook({ ...data.book, frontConver: text })
              }} value={data.book.frontConver || "URL"} />
            </SettingsText>
            <SettingsText>
              <NoWrapText>
                Back Cover:
              </NoWrapText>
              <SettingsInput onValueChange={(text: string) => {
                data.updateBook({ ...data.book, backCover: text })
              }} value={data.book.backCover || "URL"} />
            </SettingsText>
            <SettingsText onClick={() => { setIsBookStateOpen(!isBookStateOpen) }}>
              State: <StateDropDown data={{
                items: Object.values(BookState),
                isOpen: isBookStateOpen,
                selectedItem: data.book.state,
                onItemClick: onSelectBookState
              }} />
            </SettingsText>
            <SettingsTextButton onClick={() => data.showEditDescription(true)}>Edit Description</SettingsTextButton>
            <InlineWrapper>
              <SettingsTextButton onClick={() => data.setPreviewOpen(true)}>Preview</SettingsTextButton>
              <SettingsTextButton onClick={() => data.saveBook()}>Save</SettingsTextButton>
              <SettingsTextButton onClick={() => data.deleteConfirmation(false)}>Delete</SettingsTextButton>
            </InlineWrapper>
          </SettingsWrapper>
          <SectionTitle data={{ title: "Header Settings", settingId: headerSettingsId }}></SectionTitle>
          <SettingsWrapper id={headerSettingsId}>
            <SettingsText>Stylize first letter: true</SettingsText>
          </SettingsWrapper>
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle>
          <SettingsWrapper id={chapterSettingsId}>
            <SettingsText>Chapter name: {data.currentChapter?.header}</SettingsText>
            <SettingsText onClick={() => { setIsChapterStateOpen(!isChapterStateOpen) }}>
              State: <StateDropDown data={{
                items: Object.values(ChapterState),
                isOpen: isChapterStateOpen,
                selectedItem: data.currentChapter?.state ?? ChapterState.Draft,
                onItemClick: onSelectChapterState
              }} />
            </SettingsText>
            <SettingsText>Order:
              <SettingsInput onValueChange={(order: number) => { data.updateCurrentChapter({ ...data.currentChapter, orderId: order }) }}
                placeholder=""
                type="number"
                value={data.currentChapter?.orderId ?? 0} />
            </SettingsText>
            <SettingsTextButton onClick={() => data.deleteConfirmation(true)}>Delete Chapter</SettingsTextButton>
          </SettingsWrapper>
        </SectionsWrapper> :
        <SectionsWrapper id="sections-wrapper">
          <ChaptersContent data={
            {
              baseChapters: data.baseChapters,
              setOrderId: data.setOrderId,
              currentChapterId: data.currentChapter?.id,
              isInWritingMode: true,
              onChapterClick: () => {
                if (data.onChapterClick) {
                  data.onChapterClick();
                }
              },
            }
          } />
        </SectionsWrapper>
      }
      <ButtonArea id={buttonAreaId}>
        <SaveButton data={{
          color: Colors.ACCENT, height: 51, width: 195, radius: 20, textSize: 22, onClick: () => {
            navigate(`/write/${params.bookId}`);
            window.location.reload();
          }
        }}>New</SaveButton>
        <SaveButton data={{ color: Colors.ACCENT, height: 51, width: 195, radius: 20, textSize: 22, onClick: () => { data.saveChapter() } }}>Save</SaveButton>
      </ButtonArea>
    </Wrapper>
  );
}

const InlineWrapper = styled.div`
  display: flex;
  gap: 16px;
`

const NoWrapText = styled.p`
  white-space: nowrap;
`

const StateDropDown = styled(Dropdown)`
  margin-left: 6px;
  width: 100%;
`

const SettingsInput = styled(Input)`
  flex: 1;
  width: 100%;
  background-color: ${Colors.ACCENT};
  border-radius: 20px;
  margin-left: 4px;
  font-size: ${18 / 16}rem;
  text-align: left;
  padding: 0;
  padding-left: 4px;
`

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

const SettingsText = styled.label`
  font-size: ${18 / 16}rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const SettingsTextButton = styled(SettingsText)`
  text-decoration: underline;
`

const SectionsWrapper = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0 2px 0;
  flex: 0 1 auto;
`

const SettingsWrapper = styled.div`
  display: none;
  text-align: left;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  display: none;
  flex-direction: column;
  gap: 6px;
`