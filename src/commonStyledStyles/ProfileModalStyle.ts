import styled, { css } from "styled-components";
import { Colors } from "../Colors";

export const ProfileModalStyle = styled.div`
  @media only screen and (max-width: 650px) {
    width: 100%;
    right: revert;
  }
  ${({ width, height }: { width: string; height: number }) =>
    css`
      width: ${width};
      top: ${height + 9}px;
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
