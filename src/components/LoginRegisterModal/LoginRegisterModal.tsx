import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { OverlayStyle } from "../../commonStyledStyles/OverlayStyle";
import { LoginRegisterModalStyle } from "../../commonStyledStyles/LoginRegisterModalStyle";
import CustomInput from "../Input/Input";
import { Colors } from "../../Colors";
import Button from "../Button.ts/Button";
import IRegisterModalData from "../../interfaces/modal/IRegisterModalData";
import IRegisterRequest from "../../interfaces/service/user/IRegisterRequest";
import ILoginRequest from "../../interfaces/service/user/ILoginRequest";
import { XCircle } from "react-feather";
import validator from "validator";
import { StatusCodeError } from "../../error/StatusCodeError";

export default function LoginRegisterModal(data: IRegisterModalData) {
    ReactModal.setAppElement("#root");
    const [email, setEmail] = React.useState("");
    const [displayName, setDisplayname] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isValidEmail, setIsEmailValid] = React.useState(false);
    const [isStrongPassword, setIsStrongPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    function validateEmail(value: string) {
        setIsEmailValid(validator.isEmail(value));
        setEmail(value);
    }

    function validatePassword(value: string) {
        setIsStrongPassword(validator.isStrongPassword(value));
        setPassword(value);
    }

    function handleCloseModal() {
        data.setOpen(false);
    }

    async function handleRegisterClick(event: any) {
        event.preventDefault();
        const request: IRegisterRequest = {
            email: email,
            displayName: displayName,
            password: password,
        }

        try {
            await data.userService.register(request);
            handleCloseModal();
        } catch (error) {
            if (error instanceof StatusCodeError) {
                if (error.statusCode === 400) {
                    setErrorMessage("Invalid credentials");
                }
            } else {
                setErrorMessage("An error occured while trying to register, please try again");
            }
        }
    }

    async function handleLoginClick(event: any) {
        event.preventDefault();
        const request: ILoginRequest = {
            email: email,
            password: password,
        }

        try {
            await data.userService.login(request);
            data.setOpen(false);
        } catch (error) {
            if (error instanceof StatusCodeError) {
                if (error.statusCode === 400) {
                    setErrorMessage("Invalid credentials");
                }
            } else {
                setErrorMessage("An error occured while trying to login, please try again");
            }
        }
    }

    return (
        <ReactModal
            className="_"
            overlayClassName="_"
            onRequestClose={handleCloseModal}
            contentElement={(props, children) => (
                <LoginRegisterModalStyle width={data.width} {...props}>{children}</LoginRegisterModalStyle>
            )}
            overlayElement={(props, contentElement) => (
                <OverlayStyle {...props}>{contentElement}</OverlayStyle>
            )}
            isOpen={data.isOpen}>
            <HeaderWrapper>
                {data.isLogin ? <Header>Login</Header> : <Header>Register</Header>}
                <CloseIcon onClick={handleCloseModal}></CloseIcon>
            </HeaderWrapper>
            <form onSubmit={data.isLogin ? handleLoginClick : handleRegisterClick}>
                <BodyWrapper>
                    <Label htmlFor="email">Email</Label>
                    <ModalInput onValueChange={(value: string) => validateEmail(value)} value={email} type="email" id="email" placeholder="name@abc.ad"></ModalInput>
                    {(!isValidEmail && email) && <Error>This is not a valid email</Error>}
                    {!data.isLogin && <React.Fragment>
                        <Label htmlFor="username">Username</Label>
                        <ModalInput onValueChange={setDisplayname} value={displayName} type="text" id="username" placeholder="Dragon Killer"></ModalInput>
                    </React.Fragment>}
                    <Label htmlFor="password">Password</Label>
                    <ModalInput onValueChange={data.isLogin ? setPassword : validatePassword} value={password} type="password" id="password" placeholder="***********"></ModalInput>
                    {!data.isLogin && !isStrongPassword && password && <Error>This password is too weak</Error>}
                    {errorMessage && <Error>{errorMessage}</Error>}
                </BodyWrapper>
                <FooterWrapper>
                    {data.isLogin ?
                        <Button data={{ color: Colors.ACCENT, height: 51, width: 195, radius: 20, textSize: 22, type: "submit", onClick: handleLoginClick }}>Login</Button> :
                        <Button data={{ color: Colors.ACCENT, height: 51, width: 195, radius: 20, textSize: 22, type: "submit", onClick: handleRegisterClick }}>Register</Button>}

                </FooterWrapper>
            </form>
        </ReactModal>
    );
}

const Error = styled.span`
    background-color: ${Colors.WARNING};
    width: 70%;
    text-align: center;
    border-radius: 20px;
    padding: 4px;
    margin-bottom: 20px;
`

const CloseIcon = styled(XCircle)`
  color: ${Colors.WARNING};
  width: 36px;
  height: 36px;
  margin-right: 4px;
  cursor: pointer;
  position: absolute;
  @media only screen and (max-width: 220px) {
    position: revert;
    min-width: 36px;
  }
`;

const HeaderWrapper = styled.div`
  background-color: ${Colors.ACCENT};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;

  @media only screen and (max-width: 220px) {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
`

const BodyWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const FooterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15%;
    margin-right: 15%;
    margin-Bottom: 18px;
    gap: 26px;
    @media only screen and (max-width: 320px) {
        gap: 20px;
        margin-right: revert;
        margin-left: revert;
    }
`

const Header = styled.h2`
    font-size: ${32 / 16}rem;
    margin: auto;
`

const Label = styled.label`
    font-size: ${22 / 16}rem;
    &:first-of-type{
        margin-top: 20px;
    }
`

const ModalInput = styled(CustomInput)`
    margin: auto;
    text-align: center;
    width: 70%;
    margin-bottom: 20px;
    &:last-of-type{
        margin-bottom: 30px;
    }
    
    @media only screen and (max-width: 320px) {
        width: 100%;
    }
`