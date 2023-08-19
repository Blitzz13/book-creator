import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { IProgressBar } from "../../interfaces/IProgressBar";

export default function ProgressBar(data: IProgressBar) {
  return (
    <Wrapper>
      <BackgroundProgress width={data.width} height={data.height}></BackgroundProgress>
      <ForegroundProgress width={data.width} height={data.height} percentage={data.percentage}></ForegroundProgress>
      {(data.dontShowText === false || data.dontShowText === undefined) &&
        <Percentage>{data.percentage}</Percentage>
      }
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

const BackgroundProgress = styled.div`
  background-color: ${Colors.BACKGROUND};
  grid-column: 1;
  grid-row: 1;

  ${(data: { width: number, height: number }) =>
    css`
    width: ${data.width}px;
    height: ${data.height}px;
  `};
`

const ForegroundProgress = styled.div`
  background-color: ${Colors.ACCENT};
  ${(data: { width: number, height: number, percentage: number }) =>
    css`
      height: ${data.height}px;
      width: ${(data.percentage / 100) * data.width}px;
    `};
  grid-column: 1;
  grid-row: 1;
`