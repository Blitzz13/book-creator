import styled, { css } from "styled-components";
import { BsFillBookFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import ChaptersContent from "../BookSidebar/ChaptersContent";
import HeaderWrapper from "../StyledWrapper/HeaderWrapper";
import IReadSidebarData from "../../interfaces/IReadSidebarData";

export default function ReadSideBarContent({ data, ...delegated }: IReadSidebarData) {
  return (
    <Wrapper {...delegated}>
      <Header data={{ noRoundedCorners: data.isFromModal }}>
        <BookIcon onClick={() => data.setChaptersSelected(true)} opacity={data.areChaptersSelected ? 0.5 : 1} />
        <NotesIcon onClick={() => data.setChaptersSelected(false)} opacity={data.areChaptersSelected ? 1 : 0.5} />
      </Header>
      <ChaptersContent data={{
        baseChapters: data.baseChapters,
        isInWritingMode: data.isInWritingMode,
        currentChapterId: data.currentChapterId,
        onChapterClick: data.onChapterClick
      }} />
    </Wrapper>
  );
}

const Header = styled(HeaderWrapper)`
  padding: 18px;
`

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


const Wrapper = styled.div``;