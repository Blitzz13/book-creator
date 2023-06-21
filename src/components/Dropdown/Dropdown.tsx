
import 'react-quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';
import IDropDownData from '../../interfaces/IDropdownData';
import { generateId } from '../../helpers/helpFunctions';
import { Colors } from '../../Colors';
import { AiOutlineCaretDown } from 'react-icons/ai';

export default function Dropdown({ data, ...delegated }: IDropDownData) {
  return (
    <Wrapper {...delegated}>
      <SelectedTextWrapper isOpen={data.isOpen}>
        <Field>{data.selectedItem}</Field>
        <ArrowDown></ArrowDown>
      </SelectedTextWrapper>
      {data.isOpen && <ContentWrapper>
        {data.items.map((text: string) => (
          <ListField onClick={() => data.onItemClick(text)} key={generateId(7)}>{text}</ListField>
        ))}
      </ContentWrapper>}
    </Wrapper>
  );
}

const ArrowDown = styled(AiOutlineCaretDown)`
  /* margin-left: 10px; */
`

const ContentWrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  background-color: ${Colors.ACCENT};
  /* min-width: 100px; */
  max-width: 165px;
  width: 200px;
  padding: 4px;
  border-radius: 14px;
  border-width: 2px;
  border-style: solid;
  border-color: black;
  position: absolute;
  left: 0;
  box-shadow: -4px 4px 10px 0px rgba(0,0,0,0.4);
  /* float: "right"; */
`

const Wrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: right; */
  position: relative;
  display: inline-block;
`

const SelectedTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  ${({ isOpen }: { isOpen: boolean }) => css`
    justify-content: ${isOpen ? "space-between" : ""};
  `}
`

const Field = styled.p`
  
`

const ListField = styled(Field)`
  padding: 6px;
  border-bottom: 2px;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-color: ${Colors.FOREGROUND};
  /* border-width: 1px; */
  border-style: solid;
  text-align: center;
  display: block;
  &:last-of-type{
    border-bottom: 0;
  }
`