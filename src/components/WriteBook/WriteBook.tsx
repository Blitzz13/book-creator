import styled from "styled-components";
import { Colors } from "../../Colors";
import BookSettings from "../BookSettings/BookSettings";

export default function WriteBook(data: any) {
    return (
        <Wrapper>
            <HeaderTextarea name="textarea" placeholder="Enter chapter name here"></HeaderTextarea>
            <ContentTextarea name="textarea" placeholder="Enter content here"></ContentTextarea>
            <BookSettings></BookSettings>
        </Wrapper>
    );
}

const HeaderTextarea = styled.textarea`
  background-color: ${Colors.FOREGROUND};
  text-align: center;
  width: 100%;
  resize: vertical;
`;

const ContentTextarea = styled.textarea`
  background-color: ${Colors.FOREGROUND};
  width: 100%;
  resize: vertical;
`;

const Wrapper = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  display: grid;
  gap: 22px;
`;