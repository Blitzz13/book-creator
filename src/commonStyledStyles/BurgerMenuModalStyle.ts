import styled, { css, keyframes } from "styled-components";
import { Colors } from "../Colors";

export const BurgerMenuModalStyle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  max-width: 700px;
  background-color: ${Colors.BACKGROUND};
  ${({ width, isExiting }: { width: string; isExiting: boolean }) =>
    css`
      width: ${width};
      ${isExiting
        ? css`
            animation: ${MoveOut} 0.3s ease-out;
          `
        : css`
            animation: ${MoveIn} 0.3s ease-in;
          `}
      animation-fill-mode: forwards;
    `};
`;

const MoveIn = keyframes`
 from{
    transform: translateX(-30%);
 }
 to
  {
    transform: translateX(0);
  }
`;

const MoveOut = keyframes`
 from{
    transform: translateX(0);
 }
 to
  {
    transform: translateX(100%);
  }
`;
