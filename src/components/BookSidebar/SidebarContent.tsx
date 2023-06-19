import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { Settings, BookOpen } from "react-feather";
import BookSettingsSection from "../BookSettingsSection/BookSettingsSection";
import { generateId } from "../../helpers/helpFunctions";
import Button from "../Button.ts/Button";
import IBookSidebarData from "../../interfaces/IBookSidebarData";
import IBaseChapter from "../../interfaces/service/chapter/IBaseChapter";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../Input/Input";
import { IoIosArrowUp } from "react-icons/io";
const buttonAreaId = generateId(7);
const titleId = generateId(7);

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
            <SettingsText>Chapter state: {data.currentChapter?.state}</SettingsText>
            <SettingsText>Order: <Order onValueChange={(order: number) => { data.updateCurrentChapter({ ...data.currentChapter, orderId: order }) }} placeholder="" type="number" value={data.currentChapter?.orderId}></Order></SettingsText>
          </SettingsWrapper>
        </SectionsWrapper> :
        <SectionsWrapper id="sections-wrapper">
          {data.baseChapters.map((chapter: IBaseChapter, index) => (
              <ChapterNameWrapper to={`/write/${params.bookId}?chapterId=${chapter._id}`} isSelected={ data.currentChapter?._id === chapter._id ? true : false} key={`wrapper_${chapter._id}`}>
                <ChapterName key={chapter._id}>
                  {chapter.header}
                </ChapterName>
                <ArrowsWrapper>
                  {index !== 0 && <ArrowUpIcon onClick={() => data.setOrderId(chapter.orderId - 1, chapter._id)}></ArrowUpIcon>}
                  {index !== data.baseChapters.length - 1 && <ArrowDownIcon onClick={() => data.setOrderId(chapter.orderId + 1, chapter._id)}></ArrowDownIcon>}
                </ArrowsWrapper>
              </ChapterNameWrapper>
          ))}
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

const ArrowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowUpIcon = styled(IoIosArrowUp)`
  cursor: pointer;
  @media only screen and (max-width: 650px) {
    font-size: 150%;
  }
`;

const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(180deg);
`;

const Order = styled(Input)`
  width: 100%;
  background-color: ${Colors.FOREGROUND};
  font-size: ${18 / 16}rem;
  text-align: left;
  /* border: revert; */
  border-radius: revert;
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

const ChapterNameWrapper = styled(Link)`
text-decoration: none;
  color: ${Colors.TEXT};
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
  margin-right: 6px;
  /* margin-bottom: 6px; */
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 4px;
  padding-right: 4px;
  padding: 6px;
  align-items: center;
  ${({ isSelected: isselected }: { isSelected: boolean }) => css`
    background-color: ${isselected ? Colors.ACCENT : ""};
  `}
`;

const ChapterName = styled.p`
  text-decoration: none;
  color: ${Colors.TEXT};
  /* margin: 0px 6px 0px 6px; */
  margin-right: 6px;
  font-size: ${18 / 16}rem;
  display: block;
  text-align: justify;
`

const SettingsText = styled.label`
  font-size: ${18 / 16}rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const SectionsWrapper = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  text-align: left;
  /* height: 200px; */
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
  margin-right: 4px;
  margin-bottom: 4px;
  display: none;
  flex-direction: column;
  gap: 6px;
`