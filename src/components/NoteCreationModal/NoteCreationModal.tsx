
import 'react-quill/dist/quill.snow.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { Colors } from '../../Colors';
import styled, { css } from 'styled-components';
import { ORDERED_LIST, BULLET_LIST } from '../../constants/ToolbarConstants';
import { ToolbarTextStyle } from '../../enums/ToolbarTextStyle';
import Editor from '../Editor/Editor';
import NotePagePath from '../../assets/NotePage.svg'
import INoBackgroundContentModalStyle from '../../interfaces/modal/INoBackgroundContentModalStyle';
import $ from "jquery";
import { generateId } from '../../helpers/helpFunctions';
import IOverlayStyleData from '../../interfaces/modal/IOverlayStyleData';
import { useEffect, useState } from 'react';
import INoteModalData from '../../interfaces/modal/INoteModalData';
import { NoteModalMode } from '../../enums/NoteModalMode';
import { Link } from 'react-router-dom';
const modalId = generateId(7);
const imageId = generateId(7);
const wrapperId = generateId(7);
const textAreaId = generateId(7);

export default function EditDescriptionModal({ data, noteData, ...delegated }: INoteModalData<INoBackgroundContentModalStyle, IOverlayStyleData>) {
    const [overflowY, setOverflowY] = useState("");

    useEffect(() => {
        upadeOverflowY();
        updateWrapperHeight();
    }, [])

    window.addEventListener("resize", () => {
        upadeOverflowY();
        updateWrapperHeight();
    });

    window.screen.orientation.addEventListener("change", () => {
        upadeOverflowY();
        updateWrapperHeight();
    });

    function upadeOverflowY(): void {
        const overflow = window.innerHeight < 602 ? "auto" : "hidden";
        setOverflowY(overflow);
        console.log("overflow", overflow);
    }

    function updateWrapperHeight(): void {
        const imageHeight = $(`#${imageId}`).outerHeight() || 0;
        $(`#${wrapperId}`).outerHeight(imageHeight);
    }

    function setTextAreaBackground(): void {
        const textArea = $(`#${textAreaId}`);

        if (noteData.mode === NoteModalMode.Reading) {
            textArea.find(".ql-container").css("background-color", "transparent");
            textArea.css("width", "100%");
        } else {
            textArea.find(".ql-container").css("background-color", Colors.FOREGROUND);
        }
    }

    return (
        <EditDesc id={modalId}
            {...delegated}
            data={{

                isOpen: data.isOpen,
                isExiting: data.isExiting,
                ContentElement: data.ContentElement,
                willPlayCloseAnimation: data.willPlayCloseAnimation,
                height: data.height,
                contentData: {
                    width: "413px",
                    height: "70%",
                    maxHeight: "100svh",
                    disableMaxWidthHeightQuery: true,
                    isExiting: data.isExiting,
                },
                overlayData: {
                    overflowX: "hidden",
                    overflowY: overflowY,
                },
                setOpen: data.setOpen,
                setExiting: data.setExiting,
                onAfterOpen: setTextAreaBackground
            }}>
            <Wrapper id={wrapperId}>
                <Note onLoad={() => updateWrapperHeight()} src={NotePagePath} id={imageId} />
                {noteData.mode !== NoteModalMode.Reading ?
                    <HeaderTextarea value={noteData.noteTitle} onChange={(event: string | any) => {
                        noteData.onNoteTitleChange(event.target.value);
                    }}
                        mode={noteData.mode} /> :
                    <Header>{noteData.noteTitle}</Header>}
                <TextArea id={textAreaId} data={{
                    onValueChange: noteData.onDescriptionChange,
                    setData: noteData.initialDescription,
                    theme: noteData.mode !== NoteModalMode.Reading ? "snow" : "bubble",
                    readonly: noteData.mode === NoteModalMode.Reading ? true : false,
                    modules: {
                        toolbar: {
                            sizes: [{ size: [] }],
                            textStyles: [
                                ToolbarTextStyle.BOLD,
                                ToolbarTextStyle.ITALIC,
                                ToolbarTextStyle.UNDERLINE,
                                ToolbarTextStyle.STRIKE,
                            ],
                            liststyles: [ORDERED_LIST, BULLET_LIST],
                            align: [{ align: [] }],
                            removeStylesButton: ["clean"],
                        }
                    }
                }} mode={noteData.mode}></TextArea>
                {noteData.mode !== NoteModalMode.Reading ?
                    <ButtonWrapper>
                        <Button data={{
                            color: Colors.ACCENT,
                            height: 51,
                            width: 100,
                            radius: 20,
                            textSize: 22,
                            type: "submit",
                            onClick: () => {
                                if (noteData.onSaveClick) {
                                    noteData.onSaveClick(noteData.mode)
                                }
                            },
                        }}>Save</Button>
                        <Button data={{
                            color: Colors.WARNING,
                            height: 51,
                            width: 100,
                            radius: 20,
                            textSize: 22,
                            type: "submit",
                            onClick: () => { data.setExiting(true) }
                        }}>Close</Button>
                    </ButtonWrapper> : null
                }
            </Wrapper>
            {(noteData.userId && noteData.displayName) && <Credits>
                <CreditsText>Written by <CreditsLink to={`/profile/${noteData.userId}`}>{noteData.displayName}</CreditsLink></CreditsText>
            </Credits>}
        </EditDesc>
    );
}

const EditDesc = styled(Modal<INoBackgroundContentModalStyle, IOverlayStyleData>)`
`

const Note = styled.img`
    position: absolute;
    @media only screen and (max-width: 413px) {
        width: 100%;
    }
`

const Wrapper = styled.div`
  /* background-image: url(${NotePagePath}); */
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
  gap: 10px;
  height: 590px;
  width: 413px;
  isolation: isolate;
  /* @media only screen and (max-height: 580px) {
    height: 100%;
  } */
`

const TextArea = styled(Editor)`
  display: flex;
  flex-flow: column;
  height: 100%;
  /* margin-right: 46px; */
  overflow-y: auto;
  /* margin-top: ${98 + 20}px; */
  z-index: 1;
  /* isolation: isolate; */
  /* top: 100%; */
  /* position: absolute; */
  max-width: 337px;
  margin-right: auto;
  margin-left: 10px;

  ${({ mode }: { mode: NoteModalMode }) => css`
    margin-bottom: ${mode === NoteModalMode.Reading ? "20px" : ""};
    background-color: ${mode === NoteModalMode.Reading ? "transparent" : ""};
  `}

  @media only screen and (max-width: 413px) {
    margin-right: 60px;
    width: 80svw;
  }
`

const Header = styled.h2`
  text-align: center;
  z-index: 1;
  width: 337px;
  margin-top: 20px;
  margin-right: auto;
  margin-left: 10px;
  @media only screen and (max-width: 413px) {
  margin-right: 60px;
  width: 80svw;
}`

const Credits = styled.div`
  z-index: 1;
  /* background-color: ${Colors.ACCENT};
  width: fit-content;
  border-radius: 22px;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px; */
`;

const CreditsText = styled.span`
color: ${Colors.BUTTON_TEXT};
`;

const CreditsLink = styled(Link)`
color: white;
font-weight: bold;
`

const HeaderTextarea = styled.textarea`
  margin-top: 20px;
  /* margin-right: 46px; */
  background-color: ${Colors.FOREGROUND};
  text-align: center;
  height: 78px;
  max-height: 78px;
  resize: none;
  font-size: ${32 / 16}rem;
  border-radius: 20px;
  z-index: 1;
  margin-right: auto;
  margin-left: 10px;
  width: 337px;

  ${({ mode }: { mode: NoteModalMode }) => css`
    margin-bottom: ${mode === NoteModalMode.Reading ? "20px" : ""};
    background-color: ${mode === NoteModalMode.Reading ? "transparent" : ""};
    border-style: solid;
    border-width: 1;
    border-color: ${Colors.BORDER};
  `}

  @media only screen and (max-width: 413px) {
    margin-right: 60px;
    width: 80svw;
  }
  /* position: absolute; */
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
    margin-right: 50px;
    gap: 24px;
    z-index: 1;
    @media only screen and (max-width: 413px) {
      margin-right: 46px;
    /* margin-right: revert; */
    /* width: 60svw; */
  }
`