import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../Colors';
import BackgroundWrapper from '../StyledWrapper/StyledWrapper';
import SearchInput from '../SearchInput/SearchInput';
import RegisterModal from '../RegisterModal/RegisterModal';
import IUserService from '../../interfaces/service/user/IUserService';

export default function NavBar(data: { userService: IUserService }) {
  function onRegisterClick(): void {
    setRegisterOpen(!isRegisterOpen);
  }

  const [isRegisterOpen, setRegisterOpen] = React.useState(false);

  return (
    <Wrapper>
      <NavLinkWrapper>
        <Logo to="/">LOGO</Logo>
        <NavLink to="/">Browse</NavLink>
        <NavLink to="/about">Genres</NavLink>
      </NavLinkWrapper>
      <NavButtonWrapper>
        <NavSearch></NavSearch>
        <NavButton onClick={onRegisterClick}>Register</NavButton>
        <NavButton>Login</NavButton>
      </NavButtonWrapper>
      <RegisterModal userService={data.userService} width="50%" isOpen={isRegisterOpen} setOpen={setRegisterOpen}>
      </RegisterModal>
    </Wrapper>
  );
}


const Wrapper = styled(BackgroundWrapper)`
  min-height: 68px;
  display: flex;
  grid-auto-flow: column;
  gap: 9px;
  justify-content: space-between;
  align-items: center;
  margin: 9px 22px;
  padding: 4px 10px;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 52px;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.TEXT};
  font-size: ${32 / 16}rem;
  /* margin-left: 52px; */
  
  &:first-of-type{
    margin-left: 0;
  }
`;

const NavSearch = styled(SearchInput)`
  max-width: 190px;
`

const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const NavButton = styled.button`
  background-color: ${Colors.ACCENT};
  border-radius: 20px;
  color: ${Colors.BUTTON_TEXT};
  font-size: ${22 / 16}rem;
  padding: 4px 10px;
  border-width: 0;
`;

const Logo = styled(NavLink)`
  font-size: ${64 / 16}rem;
`