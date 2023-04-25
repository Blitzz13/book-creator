import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { OverlayStyle } from "../../commonStyledStyles/OverlayStyle";
import { LoginRegisterModalStyle } from "../../commonStyledStyles/LoginRegisterModalStyle";
import CustomInput from "../Input/Input";
import { Colors } from "../../Colors";
import Button from "../Button.ts/Button";
import IRegisterModalData from "../../interfaces/IRegisterModalData";
import IRegisterRequest from "../../interfaces/service/user/IRegisterRequest";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { UserAction } from "../../enums/UserAction";

export default function RegisterModal(data: IRegisterModalData) {
    ReactModal.setAppElement("#root");
    const [email, setEmail] = React.useState("");
    const [displayName, setDisplayname] = React.useState("");
    const [password, setPassword] = React.useState("");
    // const context = useAuthContext();

    function handleCloseModal() {
        data.setOpen(false);
    }

    function handleRegisterClick() {
        const request: IRegisterRequest = {
            email: email,
            displayName: displayName,
            password: password,
        }

        data.userService.register(request);
        // console.log(email);
        // console.log(displayName);
        // console.log(password);
    //    context.dispatch({ type: UserAction.Login, payload: { email: "test", token: "awiuhdiuawhdui" } });
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
                <Header>Register</Header>
            </HeaderWrapper>
            <BodyWrapper>
                <Label htmlFor="email">Email</Label>
                <ModalInput onValueChange={setEmail} value={email} type="email" id="email" placeholder="name@abc.ad"></ModalInput>
                <Label htmlFor="username">Username</Label>
                <ModalInput onValueChange={setDisplayname} value={displayName} type="text" id="username" placeholder="Dragon Killer"></ModalInput>
                <Label htmlFor="password">Password</Label>
                <ModalInput onValueChange={setPassword} value={password} type="password" id="password" placeholder="***********"></ModalInput>
            </BodyWrapper>
            <FooterWrapper>
                <Button data={{ color: Colors.WARNING, height: 51, width: 195, radius: 20, textSize: 22, onClick: handleCloseModal }}>Close</Button>
                <Button data={{ color: Colors.ACCENT, height: 51, width: 195, radius: 20, textSize: 22, onClick: handleRegisterClick }}>Register</Button>
            </FooterWrapper>
        </ReactModal>
    );
}

const HeaderWrapper = styled.div`
    background-color: ${Colors.ACCENT};
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const BodyWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    /* gap: 30px; */
`

const FooterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 15%;
    margin-right: 15%;
    margin-Bottom: 18px;
    gap: 26px;
    @media only screen and (max-width: 320px) {
        gap: 20px;
        /* flex-direction:   column; */
        margin-right: revert;
        margin-left: revert;
    }
`

const Header = styled.h2`
    font-size: ${32 / 16}rem;
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

// const ModalStyle = styled.div`
//   /* min-height: 18rem; */
//   /* margin-left: 14px;
//   margin-right: 14px;
//   margin-top: 14px; */
//   /* padding: 2.5rem; */
//   width: ${({ width }: { width: number }) =>
//         css`
//       ${width}px
//   `};
//   /* height: 400px; */
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   background-color: white;
//   border-radius: 20px;
// `;

// const OverlayStyle = styled.div`
//   position: fixed;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 3500;
//   background: #212b3277;
// `;