import { Search } from 'react-feather';
import styled from 'styled-components/macro';
import { Colors } from '../../Colors';

// import VisuallyHidden from '../VisuallyHidden';
// import Icon from '../Icon';

const SearchInput = ({ ...delegated }) => {
    return (
        <Label>
            {/* <VisuallyHidden>Search</VisuallyHidden> */}
            <SearchIcon></SearchIcon>
            <Input {...delegated} placeholder="Search Book" />
            {/* <SearchIcon id="search" strokeWidth={1} size={16} /> */}
        </Label>
    );
};

const Label = styled.label`
  position: relative;
`;

const Input = styled.input`
  border: none;
  background: ${Colors.ACCENT};
  border-radius: 20px;
  padding-left: 34px;
  font-size: ${22 / 16}rem;
  color: ${Colors.TEXT};
  width: ${226 / 16}rem;

  &::placeholder {
    color: ${Colors.BUTTON_TEXT};
  }
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
