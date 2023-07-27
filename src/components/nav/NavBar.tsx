import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../Colors';
import BackgroundWrapper from '../StyledWrapper/StyledWrapper';
import SearchInput from '../SearchInput/SearchInput';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';
import IUserService from '../../interfaces/service/user/IUserService';
import { useAuthContext } from '../../hooks/useAuthContext';
import DesktopProfileModal from '../DesktopProfileModal/DesktopProfileModal';
import { Menu } from 'react-feather';
import BurgerMenuModal from '../BurgerMenuModal/BurgerMenuModal';
import CreateBookModal from '../CreateBookModal/CreateBookModal';
import IBookService from '../../interfaces/service/book/IBookService';
import { OnClickEvent } from '../../types/OnClickEvent';
import { FormEvent } from 'react';

export default function NavBar(data: { userService: IUserService, bookService: IBookService }) {
  function onRegisterClick(): void {
    setRegisterOpen(!isRegisterOpen);
  }

  function onCreateBookClick(): void {
    setCreateBookOpen(!isCreateBookOpen);
  }

  function onLoginClick(): void {
    setLoginOpen(!isLoginOpen);
  }

  function onProfileClick(event: OnClickEvent): void {
    event.preventDefault();
    setProfileMenuOpen(!isProfileMenuOpen);
  }

  function onBurgerMenuClick(): void {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  function handleLogout(): void {
    data.userService.logout();
  }

  function onSearchSubmit(event: FormEvent): void {
    event.preventDefault();
    navigate(`/search?searchString=${searchString}`);
  }

  const authContext = useAuthContext();

  const [isRegisterOpen, setRegisterOpen] = React.useState(false);
  const [isLoginOpen, setLoginOpen] = React.useState(false);
  const [isCreateBookOpen, setCreateBookOpen] = React.useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);
  const [searchString, setSearchString] = React.useState("");
  const [height, setHeight] = React.useState(0);    
  const navigate = useNavigate();

  React.useEffect(() => {
    let box = document.getElementById('nav-bar');
    if (box) {
      setHeight(box.offsetHeight);
    }
  }, []);

  return (
    <Wrapper id="nav-bar">
      <NavLinkWrapper>
        <Logo to="/">LOGO</Logo>
        <NavLink to="/search">Browse</NavLink>
        <NavLink to="/about">Genres</NavLink>
      </NavLinkWrapper>
      <NavButtonWrapper>
        <NavSearch data={{
          onValueChange: (text: string) => {
            setSearchString(text);
          },
          onSubmit: onSearchSubmit,
        }} />
        {authContext.user ? <React.Fragment>
          <NavLink onClick={onProfileClick} to="">{authContext.user.displayName}</NavLink>
        </React.Fragment> :
          <React.Fragment>
            <NavButton onClick={onRegisterClick}>Register</NavButton>
            <NavButton onClick={onLoginClick}>Login</NavButton>
          </React.Fragment>
        }
      </NavButtonWrapper>
      <BurgerMenuIcon onClick={onBurgerMenuClick} />
      <LoginRegisterModal isLogin={false} userService={data.userService} width="50%" isOpen={isRegisterOpen} setOpen={setRegisterOpen}>
      </LoginRegisterModal>
      <LoginRegisterModal isLogin={true} userService={data.userService} width="50%" isOpen={isLoginOpen} setOpen={setLoginOpen}>
      </LoginRegisterModal>
      <CreateBookModal bookService={data.bookService} width="500px" isOpen={isCreateBookOpen} setOpen={setCreateBookOpen}>
      </CreateBookModal>
      <DesktopProfileModal createBook={onCreateBookClick} logout={handleLogout} navbarHeight={height} width="300px" isOpen={isProfileMenuOpen} setOpen={setProfileMenuOpen}>
      </DesktopProfileModal>
      <BurgerMenuModal onCreateBookClick={onCreateBookClick} displayName={authContext.user?.displayName} width="80%" isOpen={isBurgerMenuOpen} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} onLogoutClick={handleLogout} setOpen={setBurgerMenuOpen}>
      </BurgerMenuModal>
    </Wrapper>
  );
}

const Wrapper = styled(BackgroundWrapper)`
  min-height: 68px;
  display: flex;
  grid-auto-flow: column;
  gap: 9px;
  justify-content: space-between;
  align-items: baseline;
  margin: 9px 22px;
  padding: 4px 10px;

  @media only screen and (max-width: 976px) {
    align-items: center;
  }
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 52px;

  @media only screen and (max-width: 976px) {
    /* display: none; */
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.TEXT};
  font-size: ${32 / 16}rem;
  /* margin-left: 52px; */
  
  &:first-of-type {
    margin-left: 0;
  }

  @media only screen and (max-width: 976px) {
    display: none;
  }
`;

const NavSearch = styled(SearchInput)`
  max-width: 190px;
  @media only screen and (max-width: 976px) {
    max-width: revert;
  }
`

const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;

  @media only screen and (max-width: 976px) {
    display: inline;
  }
`;

const NavButton = styled.button`
  background-color: ${Colors.ACCENT};
  border-radius: 20px;
  color: ${Colors.BUTTON_TEXT};
  font-size: ${22 / 16}rem;
  padding: 4px 10px;
  border-width: 0;

  @media only screen and (max-width: 976px) {
    display: none;
  }
`;

const Logo = styled(NavLink)`
  font-size: ${64 / 16}rem;
  
  @media only screen and (max-width: 976px) {
    display: inline;
  }

  @media only screen and (max-width: 630px  ) {
    display: none;
  }
`;

const BurgerMenuIcon = styled(Menu)`
  /* color: ${Colors.WARNING}; */
  width: 36px;
  height: 36px;
  min-width: 36px;
  display: none;
  cursor: pointer;
  @media only screen and (max-width: 976px) {
    display: inline;
    position: revert;
  }
`;