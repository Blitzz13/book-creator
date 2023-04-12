import styled from "styled-components";
import { IBookWithProgress } from "../../interfaces/IProgressBook";
import AddedBook from "../AddedBook/AddedBook";
import ProgressBar from "../ProgressBar";

export default function BookWithPercentage(data: IBookWithProgress, key: any) {
  return (
    <>
      <Wrapper key={key}>
        <AddedBook frontCover={data.frontCover} backCover={data.backCover}></AddedBook>
        <ProgressBar percentage={data.percentage} width={data.width} height={data.height}></ProgressBar>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  gap: 3px;
  display: flex;
  flex-direction: column;
`