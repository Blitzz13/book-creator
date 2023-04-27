import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../Colors';
import BackgroundWrapper from '../StyledWrapper/StyledWrapper';
import SearchInput from '../SearchInput/SearchInput';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';
import IUserService from '../../interfaces/service/user/IUserService';
import { useAuthContext } from '../../hooks/useAuthContext';
import DesktopProfileModal from '../DesktopProfileModal/DesktopProfileModal';

export default function NavBar(data: { userService: IUserService }) {
  function onRegisterClick(): void {
    setRegisterOpen(!isRegisterOpen);
  }

  function onLoginClick(): void {
    setLoginOpen(!isLoginOpen);
  }

  function onProfileClick(): void {
    setProfileMenuOpen(!isProfileMenuOpen);
  }

  function handleLogout(): void {
    data.userService.logout();
  }

  const authContext = useAuthContext();

  const [isRegisterOpen, setRegisterOpen] = React.useState(false);
  const [isLoginOpen, setLoginOpen] = React.useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const ref = React.useRef();

  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    let box = document.getElementById('nav-bar');
    if (box) {
      setHeight(box.offsetHeight);
    }
  }, []);

  return (
    <Wrapper id="nav-bar" ref={ref}>
      <NavLinkWrapper>
        <Logo to="/">LOGO</Logo>
        <NavLink to="/">Browse</NavLink>
        <NavLink to="/about">Genres</NavLink>
      </NavLinkWrapper>
      <NavButtonWrapper>
        <NavSearch />
        {authContext.user ? <React.Fragment>
          <NavLink onClick={onProfileClick} to="">{authContext.user.displayName}</NavLink>
        </React.Fragment> :
          <React.Fragment>
            <NavButton onClick={onRegisterClick}>Register</NavButton>
            <NavButton onClick={onLoginClick}>Login</NavButton>
          </React.Fragment>
        }
      </NavButtonWrapper>
      <LoginRegisterModal isLogin={false} userService={data.userService} width="50%" isOpen={isRegisterOpen} setOpen={setRegisterOpen}>
      </LoginRegisterModal>
      <LoginRegisterModal isLogin={true} userService={data.userService} width="50%" isOpen={isLoginOpen} setOpen={setLoginOpen}>
      </LoginRegisterModal>
      <DesktopProfileModal logout={handleLogout} navbarHeight={height} width="300px" isOpen={isProfileMenuOpen} setOpen={setProfileMenuOpen}>

      </DesktopProfileModal>
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
  /* transform: translateY(-50%); */
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