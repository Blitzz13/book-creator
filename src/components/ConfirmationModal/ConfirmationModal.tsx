
import 'react-quill/dist/quill.snow.css';
import { CommonContentModalStyle } from '../../commonStyledStyles/CommonContentModalStyle';
import Modal from '../Modal/Modal';
import ICommonContentModalStyle from '../../interfaces/modal/ICommonContentModalStyle';
import IConfirmationModalData from '../../interfaces/modal/IConfirmationModalData';
import Button from '../Button/Button';
import { Colors } from '../../Colors';
import styled from 'styled-components';
import { XCircle } from 'react-feather';

export default function ConfirmationModal({ data, confirmationData, ...delegated }: IConfirmationModalData<ICommonContentModalStyle>) {

    return (
        <Modal {...delegated} data={{
            isOpen: data.isOpen,
            isExiting: data.isExiting,
            ContentElement: CommonContentModalStyle,
            willPlayCloseAnimation: data.willPlayCloseAnimation,
            height: data.height,
            contentData: {
                width: data.contentData.width,
                isExiting: data.isExiting,
            },
            setOpen: data.setOpen,
            setExiting: data.setExiting,
        }}>
            <Wrapper>
                <HeaderWrapper>
                    <Header>{confirmationData.modalTitle}</Header>
                    <CloseIcon onClick={() => { data.setExiting(true) }}></CloseIcon>
                </HeaderWrapper>
                <Prompt>{confirmationData.text}</Prompt>
                <ButtonWrapper>
                    <Button data={{
                        color: Colors.ACCENT,
                        height: 51,
                        width: 100,
                        radius: 20,
                        textSize: 22,
                        type: "submit",
                        onClick: () => { data.setExiting(true) }
                    }}>{confirmationData.isAlert ? "Ok" : "No"}</Button>
                    {confirmationData.isAlert && confirmationData.funcToCall && <Button data={{
                        color: Colors.WARNING,
                        height: 51,
                        width: 100,
                        radius: 20,
                        textSize: 22,
                        type: "submit",
                        onClick: confirmationData.funcToCall
                    }}>Yes</Button>}
                </ButtonWrapper>
            </Wrapper>
        </Modal >
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
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

const Prompt = styled.p`
    margin-left: 10px;
    margin-right: 10px;
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