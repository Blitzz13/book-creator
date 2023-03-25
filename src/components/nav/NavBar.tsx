import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../Colors';
import BackgroundWrapper from '../StyledWrapper/StyledWrapper';
import SearchInput from '../SearchInput/SearchInput';

export default function NavBar() {
  return (
    <>
      <Wrapper>
        <NavLinkWrapper>
          <Logo to="/">LOGO</Logo>
          <NavLink to="/">Browse</NavLink>
          <NavLink to="/about">Genres</NavLink>
        </NavLinkWrapper>
        <NavButtonWrapper>
          <NavSearch></NavSearch>
          <NavButton>Register</NavButton>
          <NavButton>Login</NavButton>
        </NavButtonWrapper>
      </Wrapper>
    </>
  );
}


const Wrapper = styled(BackgroundWrapper)`
  background-color: ${Colors.FOREGROUND};
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
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 24px;
  max-width: 190px;
`

const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const NavButton = styled.div`
  background-color: ${Colors.ACCENT};
  border-radius: 20px;
  color: ${Colors.BUTTON_TEXT};
  font-size: ${22 / 16}rem;
  padding: 4px 10px;
`;

const Logo = styled(NavLink)`
  font-size: ${64 / 16}rem;
`