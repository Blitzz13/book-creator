import styled, { css } from "styled-components";
import { Colors } from "../Colors";
import ICommonContentModalStyle from "../interfaces/modal/ICommonContentModalStyle";

export const CommonContentModalStyle = styled.div`
  @media only screen and (max-width: 650px) {
    width: 100%;
  }
  ${(data: ICommonContentModalStyle) =>
    css`
      width: ${data.width};
      height: ${data.height};
    `};
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 20px;
  background-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0px 5px 3px;
  border-color: ${Colors.ACCENT};
  border-radius: 30px;
`;
