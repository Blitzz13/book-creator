import styled from 'styled-components';
import { Colors } from '../../Colors';
import { IFileInputData } from '../../interfaces/IFileInputData';

export default function FileInput({data, ...delegated}: IFileInputData) {
    return (
        <Wrapper>
            <Input {...delegated} type="file" accept={data.accept} onChange={(event) => data.onChange(event)} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  /* margin: 10px 0; */
  width: 100%;
  color: ${Colors.TEXT};
  background: ${Colors.ACCENT};
  border: 1px solid ${Colors.BORDER};
  border-radius: 22px;
  /* padding: 5px 8px; */
  padding-left: 4px;
  outline: none;
  white-space: nowrap;
  font-size: ${17.8 / 16}rem;
  &::-webkit-file-upload-button{
    visibility: hidden;
    display: none;
  }
`;
