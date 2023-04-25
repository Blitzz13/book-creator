import styled, { css } from "styled-components";
import IButtonData from "../../interfaces/IButtonData";

export default function Button({ data, ...delegated }: IButtonData) {
  return (
    <CustomButton onClick={() => data.onClick()} data={data} {...delegated}>
    </CustomButton>
  );
};

const CustomButton = styled.button`
  ${({ data }: IButtonData) => css`
    width: ${data.width}px;
    min-width: 100px;
    padding: 14px;
    height: ${data.height}px;
    border-radius: ${data.radius}px;
    background-color: ${data.color};
    border-width: 0;
    font-size: ${data.textSize / 16}rem;
  `};

  @media only screen and (max-width: 300px) {
    min-width: revert;
    padding: revert;
  }
`;