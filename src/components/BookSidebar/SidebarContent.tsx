import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { Settings, BookOpen } from "react-feather";
import BookSettingsSection from "../BookSettingsSection/BookSettingsSection";
import { generateId, isEqual } from "../../helpers/helpFunctions";
import Button from "../Button/Button";
import IBookSidebarData from "../../interfaces/IBookSidebarData";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Input/Input";
import { useEffect, useState } from "react";
import { ChapterState } from "../../enums/ChapterState";
import { BookState } from "../../enums/BookState";
import ChaptersContent from "./ChaptersContent";
import NativeDropdown from "../NativeDropdown/NativeDropdown";
import { BookGenre } from "../../enums/Genre";
import { IoMdClose } from "react-icons/io";
import ImageUploader from "../ImageUploader/ImageUploader";
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
  const chapterSettingsId = generateId(7);
  const params = useParams();
  const navigate = useNavigate();

  const [isChapterStateOpen, setIsChapterStateOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<BookGenre[]>([]);

  function onSelectChapterState(state: string): void {
    data.updateCurrentChapter({ ...data.currentChapter, state: state })
  }

  function onSelectBookState(state: string): void {
    data.updateBook({ ...data.book, state: state as BookState })
  }

  const handleGenreChange = (selectedValue: string) => {
    let updatedGenres = selectedGenres.slice();
    if (selectedGenres.includes(selectedValue as BookGenre)) {
      updatedGenres = selectedGenres.filter(x => x !== selectedValue)
    } else {
      updatedGenres.push(selectedValue as BookGenre);
    }

    setSelectedGenres(updatedGenres);
    data.setDisplayBook({ ...data.book, genres: updatedGenres })
  };

  useEffect(() => {
    if (!isEqual(data.book.genres, selectedGenres)) {
      setSelectedGenres(data.book.genres);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.book.genres]);

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
              <ImageUploader data={{
                setImageUrl: (url: string) => {
                  setIsUploading(false);
                  data.updateBook({ ...data.book, frontConver: url });
                },
                setPercentage: (percent: number) => {
                  if (percent < 100) {
                    setIsUploading(true);
                  }
                  data.updateBook({ ...data.book, frontConverPercent: percent })
                },
              }} />
            </SettingsText>
            <SettingsText>
              <NoWrapText>
                Back Cover:
              </NoWrapText>
              <ImageUploader data={{
                setImageUrl: (url: string) => {
                  setIsUploading(false);
                  data.updateBook({ ...data.book, backCover: url });
                },
                setPercentage: (percent: number) => {
                  if (percent < 100) {
                    setIsUploading(true);
                  }
                  data.updateBook({ ...data.book, backCoverPercent: percent })
                },
              }} />
            </SettingsText>
            <SettingsText>
              State: <EnumDropdown disableFirstOption={true} initialValue={data.book.state} onValueChange={onSelectBookState} enumType={BookState} data={{ items: Object.values(BookState) }} />
            </SettingsText>
            <SettingsText>
              Genre: <EnumDropdown disableFirstOption={true} onValueChange={handleGenreChange} enumType={BookGenre} data={{ items: Object.values(BookGenre) }} />
            </SettingsText>
            <SelecteGenreWrapper>
              {selectedGenres.map((item, index) => (
                <SelectedGenre onClick={() => handleGenreChange(item)} key={index}>
                  {item}
                  <XIcon size={16} />
                </SelectedGenre>
              ))}
            </SelecteGenreWrapper>
            <SettingsTextButton onClick={() => data.showEditDescription(true)}>Edit Description</SettingsTextButton>
            <SettingsTextButton onClick={() => data.onInviteListClick(false)}>Invite to book</SettingsTextButton>
            <InlineWrapper>
              <SettingsTextButton onClick={() => data.setPreviewOpen(true)}>Preview</SettingsTextButton>
              <SettingsTextButton onClick={() => {
                if (data.book.frontConverPercent && data.book.frontConverPercent < 100) {
                  return;
                }

                if (data.book.backCoverPercent && data.book.backCoverPercent < 100) {
                  return;
                }

                data.saveBook();
              }}>Save</SettingsTextButton>
              <SettingsTextButton onClick={() => data.deleteConfirmation(false)}>Delete</SettingsTextButton>
            </InlineWrapper>
           {isUploading && <Warning>Images are still uploading, please wait.</Warning>}
          </SettingsWrapper>
          <SectionTitle data={{ title: "Chapter Settings", settingId: chapterSettingsId }}></SectionTitle>
          <SettingsWrapper id={chapterSettingsId}>
            <SettingsText>Chapter name: {data.currentChapter?.header}</SettingsText>
            <SettingsText onClick={() => { setIsChapterStateOpen(!isChapterStateOpen) }}>
              State: <EnumDropdown disableFirstOption={true} initialValue={data.currentChapter?.state} onValueChange={onSelectChapterState} enumType={ChapterState} data={{ items: Object.values(ChapterState) }} />
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
              isLoading: data.areChaptersLoading || false,
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

const EnumDropdown = styled(NativeDropdown)`
  display: flex;
  gap: 16px;
  margin-left: 8px;
`

const SelecteGenreWrapper = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  flex-wrap: wrap;
`;

const SelectedGenre = styled.span`
  background-color: ${Colors.ACCENT};
  border-radius: 20px;
  padding: 4px;
  padding-left: 8px;
  gap: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const XIcon = styled(IoMdClose)`
  
`

const NoWrapText = styled.p`
  white-space: nowrap;
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
`;

const Warning = styled.span`
  color: ${Colors.WARNING};
`