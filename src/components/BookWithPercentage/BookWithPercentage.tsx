import styled from "styled-components";
import { IBookWithProgress } from "../../interfaces/IProgressBook";
import AddedBook from "../AddedBook/AddedBook";
import ProgressBar from "../ProgressBar";
import bookPlaceholderImage from "../../assets/placeholder-image-portrait.png";

export default function BookWithPercentage(data: IBookWithProgress) {
  return (
    <Wrapper>
      <AddedBook
        onClick={() => data.onClick()}
        frontCover={data.frontCover || bookPlaceholderImage}
        backCover={
          data.backCover ||
          data.frontCover ||
          bookPlaceholderImage} />
      <ProgressBar
        percentage={data.percentage}
        width={data.width}
        height={data.height} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  gap: 3px;
  display: flex;
  flex-direction: column;
`