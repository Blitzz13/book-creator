
import 'react-quill/dist/quill.snow.css';
import { CommonContentModalStyle } from '../../commonStyledStyles/CommonContentModalStyle';
import Modal from '../Modal/Modal';
import ICommonContentModalStyle from '../../interfaces/modal/ICommonContentModalStyle';
import Button from '../Button/Button';
import { Colors } from '../../Colors';
import styled from 'styled-components';
import { XCircle } from 'react-feather';
import { ORDERED_LIST, BULLET_LIST } from '../../constants/ToolbarConstants';
import { ToolbarTextStyle } from '../../enums/ToolbarTextStyle';
import Editor from '../Editor/Editor';
import IDescriptionModalData from '../../interfaces/modal/IDescriptionModalData';
import IOverlayStyleData from '../../interfaces/modal/IOverlayStyleData';

export default function EditDescriptionModal({ data, descriptionData, ...delegated }: IDescriptionModalData<ICommonContentModalStyle, IOverlayStyleData>) {

    return (
        <EditDesc {...delegated} data={{
            isOpen: data.isOpen,
            isExiting: data.isExiting,
            ContentElement: CommonContentModalStyle,
            willPlayCloseAnimation: data.willPlayCloseAnimation,
            height: data.height,
            contentData: {
                width: data.contentData.width,
                maxScreenHeight: 580,
            },
            setOpen: data.setOpen,
            setExiting: data.setExiting,
        }}>
            <Wrapper>
                <HeaderWrapper>
                    <Header>{descriptionData.modalTitle}</Header>
                    <CloseIcon onClick={() => { data.setExiting(true) }}></CloseIcon>
                </HeaderWrapper>
                <TextArea data={{
                    onValueChange: descriptionData.onDescriptionChange,
                    setData: descriptionData.initialDescription,
                    modules: {
                        toolbar: {
                            sizes: [{ size: [] }],
                            textStyles: [
                                ToolbarTextStyle.BOLD,
                                ToolbarTextStyle.ITALIC,
                                ToolbarTextStyle.UNDERLINE,
                            ],
                            liststyles: [ORDERED_LIST, BULLET_LIST],
                            align: [{ align: [] }],
                            removeStylesButton: ["clean"],
                        }
                    }
                }} id="writing-area"></TextArea>
                <ButtonWrapper>
                    <Button data={{
                        color: Colors.ACCENT,
                        height: 51,
                        width: 100,
                        radius: 20,
                        textSize: 22,
                        type: "submit",
                        onClick: descriptionData.funcToCall
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
                </ButtonWrapper>
            </Wrapper>
        </EditDesc>
    );
}

const EditDesc = styled(Modal<ICommonContentModalStyle, IOverlayStyleData>)`
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: 500px;
  @media only screen and (max-height: 580px) {
    height: 100%;
  }
`

const HeaderWrapper = styled.div`
  background-color: ${Colors.ACCENT};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;

  @media only screen and (max-width: 220px) {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
`

const TextArea = styled(Editor)`
  display: flex;
  flex-flow: column;
  height: 100%;
  max-height: 384px;
  margin-left: 30px;
  margin-right: 30px;
`

const Header = styled.h2`
    font-size: ${32 / 16}rem;
    margin: auto;
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


const ButtonWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
    gap: 24px;
`