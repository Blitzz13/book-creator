import styled, { css } from "styled-components";
import { BsFillBookFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import ChaptersContent from "../BookSidebar/ChaptersContent";
import HeaderWrapper from "../StyledWrapper/HeaderWrapper";
import IReadSidebarData from "../../interfaces/IReadSidebarData";
import NotesContent from "./NotesContent";
import { MdNoteAdd } from "react-icons/md";
import { Colors } from "../../Colors";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ReadSideBarContent({ data, ...delegated }: IReadSidebarData) {
  const authContext = useAuthContext();

  return (
    <Wrapper {...delegated}>
      <Header data={{ noRoundedCorners: data.isFromModal }}>
        <BookIcon onClick={() => data.setChaptersSelected(true)} opacity={data.areChaptersSelected ? 0.5 : 1} />
        {authContext.user && <NotesIcon onClick={() => data.setChaptersSelected(false)} opacity={data.areChaptersSelected ? 1 : 0.5} />}
      </Header>
      {data.areChaptersSelected ?
        <Chapters data={{
          baseChapters: data.baseChapters,
          isInWritingMode: data.isInWritingMode,
          currentChapterId: data.currentChapterId,
          onChapterClick: data.onChapterClick,
          isLoading: false
        }} />
        :
        <Notes data={{
          notes: data.baseNotes,
          onNoteClick: () => {
            if (data.onNoteClick) {
              data.onNoteClick();
            }
          },
          onDeleteClick: () => {
            if (data.onNoteDeleteClick) {
              data.onNoteDeleteClick();
            }
          },
          onEditClick: () => {
            if (data.onNoteEditClick) {
              data.onNoteEditClick();
            }
          }
        }} />
      }
      {authContext.user &&
        <AddNoteIcon onClick={() => {
          if (data.onNoteCreateClick) {
            data.onNoteCreateClick();
          }
        }} />}
    </Wrapper>
  );
}

const AddNoteIcon = styled(MdNoteAdd)`
  font-size: 260%;
  color: ${Colors.ACCENT};
  margin-left: auto;
  cursor: pointer;
  margin-top: 4px;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 915px) {
    margin-right: 6px;
    margin-bottom: 4px;
  }

  @media only screen and (max-height: 540px) {
    font-size: 360%;
  }
`;

const Chapters = styled(ChaptersContent)`
  flex: 1 1 auto;
  overflow: auto;
`

const Notes = styled(NotesContent)`
  flex: 1 1 auto;
  overflow: auto;
`;

const Header = styled(HeaderWrapper)`
  padding: 18px;
`;

const NotesIcon = styled(GiNotebook)`
  font-size: 160%;
  cursor: pointer;
  
  ${({ opacity }: { opacity: number }) => css`
    opacity: ${opacity};
  `}
`;

const BookIcon = styled(BsFillBookFill)`
  font-size: 170%;
  cursor: pointer;

  ${({ opacity }: { opacity: number }) => css`
    opacity: ${opacity};
  `}
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;