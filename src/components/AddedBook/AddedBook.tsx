import styled from "styled-components";
import { Colors } from "../../Colors";
import { IAddedBook } from "../../interfaces/IAddedBook";

export default function AddedBook(data: IAddedBook) {
  return (
      <Wrapper onClick={() => data.onClick()}>
        <BackImage src={data.backCover}></BackImage>
        <Pages></Pages>
        <FrontImage src={data.frontCover}></FrontImage> 
      </Wrapper>
  );
}

const Wrapper = styled.div`
  /* margin: 9px 22px; */
  justify-content: left;
  display: grid;
  grid-auto-flow: column;
  isolation: isolate;
  cursor: pointer;
`;

const FrontImage = styled.img`
  margin-top: 8px;
  grid-column: 1;
  grid-row: 1;
  width: 130px;
  height: 180px;
  z-index: 3;
`;

const BackImage = styled.img`
  grid-column: 1;
  grid-row: 1;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  width: 128px;
  height: 180px;
  z-index: 1;
`;

const Pages = styled.div`
  grid-column: 1;
  grid-row: 1;
  background-color: ${Colors.BACKGROUND};
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  margin-left: 2px;
  margin-top: 2px;
  width: 124px;
  height: 9px;
  z-index: 2;
`