import styled from "styled-components";
import { Colors } from "../../Colors";
import IInputData from "../../interfaces/IInputData";

export default function CustomInput({ onValueChange, ...data }: IInputData) {
  return (
    <Input onChange={(event) => onValueChange(event.currentTarget.value)}  {...data} placeholder={data.placeholder} />
  );
};

const Input = styled.input`
  border: none;
  background: ${Colors.ACCENT};
  border-radius: 20px;
  padding-left: 34px;
  font-size: ${22 / 16}rem;
  color: ${Colors.TEXT};
  width: ${226 / 16}rem;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 24px;
  
  &::placeholder {
    color: ${Colors.BUTTON_TEXT};
  }
`;