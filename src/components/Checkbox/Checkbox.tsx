import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";
import { Colors } from "../../Colors";


export default function Checkbox({ data, ...delegated }: { data: { text: string, isChecked: boolean, setCheck: Function } }) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    data.setCheck(event.target.checked);
  };

  return (
    <CustomCheckbox {...delegated}>
      <HiddenCheckbox checked={data.isChecked} onChange={handleCheckboxChange} />
      <Icon>
        {data.isChecked && <MdCheck />}
      </Icon>
      {data.text}
    </CustomCheckbox>
  );
};

const CustomCheckbox = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
`;

const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  /* border: 2px solid #333; */
  background-color: ${Colors.BACKGROUND};;
  border-radius: 4px;
  margin-right: 8px;

  ${HiddenCheckbox}:checked + & {
    background-color: ${Colors.ACCENT};
    border-color: #333;
    color: ${Colors.BACKGROUND};
  }
`;

