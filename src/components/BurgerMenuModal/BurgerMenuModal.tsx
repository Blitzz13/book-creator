import ReactModal from "react-modal";
import { OverlayStyle } from "../../commonStyledStyles/OverlayStyle";
import { Colors } from "../../Colors";
import { Link } from "react-router-dom";
import styled from "styled-components";
import IBurgerMenuModalData from "../../interfaces/modal/IBurgerMenuModalData";
import { BurgerMenuModalStyle } from "../../commonStyledStyles/BurgerMenuModalStyle";
import { X } from "react-feather";
import React from "react";
import { OnClickEvent } from "../../types/OnClickEvent";

export default function BurgerMenuModal(data: IBurgerMenuModalData) {
    ReactModal.setAppElement("#root");

    const [isExiting, setIsExiting] = React.useState(false);

    function startExitAnimation() {
        if (!isExiting) {
            setIsExiting(true);
        }
    }

    function close() {
        data.setOpen(false);
        setIsExiting(false);
    }

    async function handleRegisterClick(event: OnClickEvent) {
        event.preventDefault();
        await data.onRegisterClick();
        data.setOpen(false);
    }

    async function handleCreateBookClick(event: OnClickEvent) {
        event.preventDefault();
        data.onCreateBookClick();
        data.setOpen(false);
    }

    async function handleLoginClick(event: OnClickEvent) {
        event.preventDefault();
        await data.onLoginClick();
        data.setOpen(false);
    }

    async function handleLogoutClick(event: OnClickEvent) {
        event.preventDefault();
        data.onLogoutClick();
        data.setOpen(false);
    }

    return (
        <ReactModal
            className="_"
            overlayClassName="_"
            onRequestClose={startExitAnimation}
            contentElement={(props, children) => (
                <BurgerMenuModalStyle onAnimationEnd={() => {
                    if (isExiting) {
                        close();
                    }
                }} isExiting={isExiting} width={data.width} {...props}>{children}</BurgerMenuModalStyle>
            )}
            overlayElement={(props, contentElement) => (
                <OverlayStyle isExiting={isExiting} {...props}>{contentElement}</OverlayStyle>
            )}
            isOpen={data.isOpen}>
            <Header>
                <Logo onClick={startExitAnimation} to="/">LOGO</Logo>
                <CloseIcon onClick={startExitAnimation} />
            </Header>
            <Wrapper>
                {data.displayName ?
                    <NavLink onClick={startExitAnimation} to={"/profile/" + data.userId}>{data.displayName}</NavLink>
                    :
                    <React.Fragment>
                        <NavLink onClick={handleLoginClick} to="">Login</NavLink>
                        <NavLink onClick={handleRegisterClick} to="">Register</NavLink>
                    </React.Fragment>}

                <NavLink onClick={startExitAnimation} to="/search">Browse</NavLink>
                {data.displayName &&
                    <React.Fragment>
                        <NavLink onClick={handleCreateBookClick} to="">Start new book</NavLink>
                        <NavLink onClick={handleLogoutClick} to="">Logout</NavLink>
                    </React.Fragment>
                }
            </Wrapper>
        </ReactModal>
    );
}

const CloseIcon = styled(X)`
  /* color: ${Colors.WARNING}; */
  width: 56px;
  height: 56px;
  min-width: 56px;
  display: none;
  cursor: pointer;
  @media only screen and (max-width: 976px) {
    display: inline;
    position: revert;
  }
`;

const Header = styled.div`
    background-color: ${Colors.ACCENT};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.TEXT};
  font-size: ${32 / 16}rem;
`;

const Logo = styled(NavLink)`
  font-size: ${56 / 16}rem;
  margin-left: 24px;
`
