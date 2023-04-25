import styled from "styled-components";
import { Colors } from "../../Colors";
import { IProgressBar } from "../../interfaces/IProgressBar";

export default function ProgressBar(data: IProgressBar) {
  const BackgroundProgress = styled.div`
    height: ${data.height}px;
    background-color: ${Colors.BACKGROUND};
    width: ${data.width}px;
    grid-column: 1;
    grid-row: 1;
  `
  const ForegroundProgress = styled.div`
    background-color: ${Colors.ACCENT};
    height: ${data.height}px;
    width: ${(data.percentage / 100) * data.width}px;
    grid-column: 1;
    grid-row: 1;
  `
  return (
      <Wrapper>
        <BackgroundProgress></BackgroundProgress>
        <ForegroundProgress></ForegroundProgress>
        <Percentage>{data.percentage}</Percentage>
      </Wrapper>
  );
}

const Wrapper = styled.div`
  /* margin-left: 10px; */
  display: grid;
`

const Percentage = styled.span`
  /* margin-left: 10px; */
  &::after{
    content: "%";
  }
`