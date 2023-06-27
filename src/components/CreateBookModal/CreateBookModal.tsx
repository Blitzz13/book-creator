import React, { FormEvent } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { OverlayStyle } from "../../commonStyledStyles/OverlayStyle";
import CustomInput from "../Input/Input";
import { Colors } from "../../Colors";
import Button from "../Button/Button";
import { XCircle } from "react-feather";
import validator from "validator";
import ICreateBookModalData from "../../interfaces/modal/ICreateBookModalData";
import { CommonContentModalStyle } from "../../commonStyledStyles/CommonContentModalStyle";
import { useAuthContext } from "../../hooks/useAuthContext";
import Editor from "../Editor/Editor";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function resizeDescription() {
    const description = $("#description");
    const quilToolbar = description.find(".ql-toolbar");

    if (quilToolbar) {
        description.css("padding-bottom", `${quilToolbar.outerHeight()}px`);
    }
}

export default function CreateBookModal(data: ICreateBookModalData) {
    const navigate = useNavigate();

    window.addEventListener("resize", () => {
        resizeDescription();
    });

    ReactModal.setAppElement("#root");

    const authContext = useAuthContext();
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [isValidTitle, setIsTitleValid] = React.useState(true);
    const [isExiting, setIsExiting] = React.useState(false);

    function startExitAnimation() {
        if (!isExiting) {
            setIsExiting(true);
        }
    }

    function validateBookName(value: string) {
        setIsTitleValid(!validator.isEmpty(value));
        setTitle(value);
    }

    function handleCloseModal() {
        setIsExiting(false);
        data.setOpen(false);
    }

    async function handleBookCreateClick(event: FormEvent) {
        event.preventDefault();

        if (isValidTitle && authContext.user) {
            const book = await data.bookService.createBook({ title, authorId: authContext.user?.id, description });
            navigate(`/write/${book._id}`);
        }
    }

    return (
        <ReactModal
            className="_"
            overlayClassName="_"
            onAfterOpen={resizeDescription}
            onRequestClose={startExitAnimation}
            contentElement={(props, children) => (
                <CommonContentModalStyle width={"500px"} {...props}>{children}</CommonContentModalStyle>
            )}
            overlayElement={(props, contentElement) => (
                <OverlayStyle onAnimationEnd={() => {
                    if (isExiting) {
                        handleCloseModal();
                    }
                }} isExiting={isExiting} {...props}>{contentElement}</OverlayStyle>
            )}
            isOpen={data.isOpen}>
            <HeaderWrapper>
                <Header>Create Book</Header>
                <CloseIcon onClick={startExitAnimation}></CloseIcon>
            </HeaderWrapper>
            <form onSubmit={handleBookCreateClick}>
                <BodyWrapper>
                    <Label htmlFor="email">Title</Label>
                    <ModalInput onValueChange={(value: string) => validateBookName(value)} value={title} type="text" id="text" placeholder="Lord of the books"></ModalInput>
                    {!isValidTitle && <Error>The title must contain characters</Error>}
                    <Label htmlFor="email">Description</Label>
                    <Textarea data={{ onValueChange: setDescription }} id="description"></Textarea>
                </BodyWrapper>
                <FooterWrapper>
                    <Button data={{ color: Colors.ACCENT, height: 51, width: 195, radius: 20, textSize: 22, type: "submit", onClick: handleBookCreateClick }}>Create</Button>
                </FooterWrapper>
            </form>
        </ReactModal>
    );
}

const Textarea = styled(Editor)`
  width: inherit;
  height: 350px;
  margin-bottom: 30px;
  width: 70%;
  resize: none;
  @media only screen and (max-width: 320px) {
    width: 100%;
  }
`;

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