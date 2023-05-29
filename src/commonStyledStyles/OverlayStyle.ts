import styled, { css, keyframes } from "styled-components";

export const OverlayStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3500;
  height: 100vh;
  background: #212b3277;
  ${({ isExiting }: { isExiting?: boolean }) =>
    css`
      ${isExiting
        ? css`
            animation: ${TurnOffOpacity} 0.3s ease-out;
          `
        : css`
            animation: ${TurnOnOpacity} 0.3s ease-in;
          `}
      animation-fill-mode: forwards;
    `};
`;

const TurnOnOpacity = keyframes`
 from{
    opacity: 0;
 }
 to
  {
    opacity: 1;
  }
`;

const TurnOffOpacity = keyframes`
 from{
    opacity: 1;
 }
 to
  {
    opacity: 0;
  }
`;
