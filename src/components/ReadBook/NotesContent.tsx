import styled, { css } from "styled-components";
import INotesContentData from "../../interfaces/INotesContentData";
import { Colors } from "../../Colors";
import { useSearchParams } from "react-router-dom";
import { IBaseNote } from "../../interfaces/service/note/IBaseNote";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";

export default function NotesContent({ data, ...delegated }: INotesContentData) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Wrapper {...delegated}>
      {data.notes.map((note: IBaseNote) => (
        <NoteNameWrapper key={note._id}
          isSelected={false}
        >
          <NoteTitle onClick={() => {
          if (data.onNoteClick) {
            searchParams.set("noteId", `${note._id}`);
            setSearchParams(searchParams);
            data.onNoteClick();
          }
        }} >
            {note.header}
          </NoteTitle>
          <IconWrapper>
            <EditIcon onClick={() => {
              if (data.onEditClick) {
                searchParams.set("noteId", `${note._id}`);
                setSearchParams(searchParams);
                data.onEditClick();
              }
            }}/>
            <DeleteIcon onClick={() => {
              if (data.onDeleteClick) {
                searchParams.set("noteId", `${note._id}`);
                setSearchParams(searchParams);
                data.onDeleteClick();
              }
            }} />
          </IconWrapper>
        </NoteNameWrapper>
      ))}

    </Wrapper>
  );
}

interface INoteWrapperProps {
  isSelected: boolean;
}

const Wrapper = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
`

const DeleteIcon = styled(BsTrashFill)``;

const EditIcon = styled(BsPencilSquare)``;

const NoteTitle = styled.p`
  text-decoration: none;
  color: ${Colors.TEXT};
  margin-right: 6px;
  font-size: ${18 / 16}rem;
  display: block;
  text-align: justify;
  width: 100%;
`;

const NoteNameWrapper = styled.div`
text-decoration: none;
color: ${Colors.TEXT};
display: flex;
justify-content: space-between;
margin-left: 5px;
margin-right: 6px;
padding: 6px;
align-items: center;
cursor: pointer;
overflow: auto;
${({ isSelected }: INoteWrapperProps) => css`
  background-color: ${isSelected ? Colors.ACCENT : ""};
`}
`;
