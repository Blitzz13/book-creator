import styled, { css } from "styled-components";
import ICommonContentModalStyle from "../interfaces/modal/ICommonContentModalStyle";

export const NoBackgroundContentModalStyle = styled.div`
  @media only screen and (max-width: 830px) {
    max-width: 50%;
  }

  @media only screen and (max-height: 600px) {
    max-height: 100svh;
  }

  ${(data: ICommonContentModalStyle) =>
    css`
      width: ${data.width};
      height: ${data.height};

      @media only screen and (max-height: ${data.maxScreenHeight}px) {
        height: 100svh;
      }
    `};
/* 
  @media only screen and (max-width: 530px) {
    height: 100%;
  } */

  max-width: 700px;
`;
