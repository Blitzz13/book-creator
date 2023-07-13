import styled from "styled-components";
import INotesContentData from "../../interfaces/INotesContentData";
import { Colors } from "../../Colors";
import { Link } from "react-router-dom";
import { IBaseNote } from "../../interfaces/service/note/IBaseNote";

export default function NotesContent({ data, ...delegated }: INotesContentData) {
  return (
    <Wrapper {...delegated}>
      {data.notes.map((note: IBaseNote, index) => (
        <NoteNameWrapper isSelected={false} to="">
          <NoteTitle>
            {note.header}
          </NoteTitle>
        </NoteNameWrapper>
      ))}
    </Wrapper>
  );
}

interface INoteWrapperProps {
  isSelected: boolean;
}

const Wrapper = styled.div``;

const NoteTitle = styled.p`
  text-decoration: none;
  color: ${Colors.TEXT};
  margin-right: 6px;
  font-size: ${18 / 16}rem;
  display: block;
  text-align: justify;
`;

const NoteNameWrapper = styled(({ isSelected, ...rest }: INoteWrapperProps & React.ComponentProps<typeof Link>) => (
  <Link {...rest} />
)) <INoteWrapperProps>`
text-decoration: none;
color: ${Colors.TEXT};
display: flex;
justify-content: space-between;
margin-left: 5px;
margin-right: 6px;
padding: 6px;
align-items: center;
background-color: ${(props) => (props.isSelected ? Colors.ACCENT : "")};
`;
