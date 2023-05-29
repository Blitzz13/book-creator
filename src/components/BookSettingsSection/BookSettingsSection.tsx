import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../Colors";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IBookSettingSection } from "../../interfaces/IBookSettingSection";
import { generateId } from "../../helpers/helpFunctions";
import React from "react";
import $ from "jquery";

export default function BookSettingsSection({ data, ...delegated }: IBookSettingSection) {
  const arrowId = generateId(7);
  const [isOpen, setIsOpen] = React.useState(false);
  const [playAnim, setPlayAnim] = React.useState(false);
  const settings = $(`#${data.settingId}`);
  // let animate = false;

  function click(): void {
    if (!playAnim) {
      setPlayAnim(true);
    }

    setIsOpen(!isOpen);
  }

  React.useEffect(() => {
    const display = isOpen ? "flex" : "none";
    settings.css("display", display);
  }, [isOpen, settings])

  return (
    <Wrapper onClick={click} {...delegated}>
      <Paragraph>
        {data.title}
      </Paragraph>
      <ArrowDown animate={playAnim} isOpen={isOpen} id={arrowId}></ArrowDown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  margin: auto;
  background-color: ${Colors.ACCENT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${18 / 16}rem;
  cursor: pointer;
`;

const Paragraph = styled.p`
  margin-left: 10px;
`

const ArrowDown = styled(AiOutlineCaretDown)`
  margin-right: 10px;
  ${({ isOpen, animate }: { animate: boolean, isOpen: boolean }) =>
    animate && css`
      ${!isOpen
        ? css`
            animation: ${RotateAnimDown} 0.3s ease-out;
          `
        : css`
            animation: ${RotateAnimUp} 0.3s ease-in;
          `}
      animation-fill-mode: forwards;
    `};
`

const RotateAnimUp = keyframes`
    from { 
      transform: rotate(0);
    }
    to {
      transform: rotate(180deg);
    }
`
const RotateAnimDown = keyframes`
    from { 
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0);
    }
`