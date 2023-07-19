import styled, { css, keyframes } from "styled-components";
import INoBackgroundContentModalStyle from "../interfaces/modal/INoBackgroundContentModalStyle";

export const NoBackgroundContentModalStyle = styled.div`
  ${(data: INoBackgroundContentModalStyle) =>
    css`
      width: ${data.width};
      height: ${data.height};
      overflow: ${data.overflow};
      overflow-y: ${data.overflowY};
      @media only screen and (max-width: 830px) {
        max-width: ${data.disableMaxWidthHeightQuery ? "revert" : "50%"};
      }

      @media only screen and (max-height: 600px) {
        max-height: ${data.disableMaxWidthHeightQuery ? "revert" : "100svh"};
      }

      @media only screen and (max-height: ${data.maxScreenHeight}px) {
        height: 100svh;
        max-height: ${data.maxHeight};
      }

      ${data.isExiting
        ? css`
            animation: ${MoveOut} 0.3s ease-out;
          `
        : css`
            animation: ${MoveIn} 0.3s ease-in;
          `}
      animation-fill-mode: forwards;
    `};

  /* 
  @media only screen and (max-width: 530px) {
    height: 100%;
  } */

  max-width: 700px;
`;

const MoveIn = keyframes`
 from{
    transform: translateY(60%);
 }
 to
  {
    transform: translateY(0);
  }
`;

const MoveOut = keyframes`
 from{
    transform: translateY(0);
 }
 to
  {
    transform: translateY(-60%);
  }
`;
