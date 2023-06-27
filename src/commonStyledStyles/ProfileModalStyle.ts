import styled, { css } from "styled-components";
import { Colors } from "../Colors";
import ICommonContentModalStyle from "../interfaces/modal/ICommonContentModalStyle";

export const ProfileModalStyle = styled.div`
  @media only screen and (max-width: 650px) {
    width: 100%;
    right: revert;
  }
  ${(data: ICommonContentModalStyle) =>
    css`
      width: ${data.width};
      top: ${data.height as number + 9}px;
    `};
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 20px;
  background-color: ${Colors.FOREGROUND};
  border-style: solid;
  border-width: 0 0px 5px 3px;
  border-color: ${Colors.ACCENT};
  border-radius: 30px;
  position: absolute;
  right: 22px;
`;
