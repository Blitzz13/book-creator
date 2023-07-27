import { Search } from 'react-feather';
import styled from 'styled-components/macro';
import Input from '../Input/Input';
import { ISearchInputData } from '../../interfaces/ISearchInputData';
import { FormEvent } from 'react';

const SearchInput = ({ data, ...delegated }: ISearchInputData) => {
  return (
    <Label>
      <form onSubmit={(event: FormEvent) => data.onSubmit(event)}>
        <SearchIcon></SearchIcon>
        <Input onValueChange={(text: string) => data.onValueChange(text)} {...delegated} placeholder="Search Book" />
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
`;

export default SearchInput;

