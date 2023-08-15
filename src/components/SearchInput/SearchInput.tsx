import { Search } from 'react-feather';
import styled from 'styled-components/macro';
import Input from '../Input/Input';
import { ISearchInputData } from '../../interfaces/ISearchInputData';
import { FormEvent, useRef } from 'react';

const SearchInput = ({ data, ...delegated }: ISearchInputData) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSearchClick = () => {
    data.onSubmit(null);
  };

  return (
    <Label>
      <form ref={formRef} onSubmit={(event: FormEvent) => data.onSubmit(event)}>
        <SearchIcon onClick={handleSearchClick} />
        <Input {...delegated}
          onValueChange={(text: string) => {
            data.onValueChange(text);
          }}
          placeholder="Search Book" />
      </form>
    </Label>
  );
};

const Label = styled.label`
  position: relative;
  display: flex;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 26px;
  height: 26px;
  padding-left: 5px;
  cursor: pointer;
`;

export default SearchInput;

