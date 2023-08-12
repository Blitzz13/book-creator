import styled, { css, keyframes } from "styled-components";
import { Colors } from "../Colors";
import IBurgerContentModalStyle from "../interfaces/modal/IBurgerContentModalStyle";

export const BurgerMenuModalStyle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  max-width: 700px;
  background-color: ${Colors.BACKGROUND};
  ${(data: IBurgerContentModalStyle) =>
    css`
      width: ${data.width};
      border-top-left-radius: ${data.border?.topLeft};
      border-top-right-radius: ${data.border?.topRight};
      border-bottom-right-radius: ${data.border?.bottomRight};
      border-bottom-left-radius: ${data.border?.bottomLeft};
      ${data.isExiting
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
