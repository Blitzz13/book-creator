import styled, { css, keyframes } from "styled-components";
import { IAnimatedBook } from "../../interfaces/IAnimatedBook";
import Modal from "../Modal/Modal";
import { NoBackgroundContentModalStyle } from "../../commonStyledStyles/NoBackgroundContentModalStyle";
import { generateId } from "../../helpers/helpFunctions";
import $ from "jquery";
import bookPlaceholderImage from "../../assets/placeholder-image-portrait.png";
const modalId = generateId(7);
const bookAspectRatio = 1.48;

function resizeContentTextarea() {
  const book = $(`#${modalId}`);
  //for later use to show description
  // const page = $(`#test`);
  // const text = $(`#text123`);
  // text.offset({ top: page.offset()?.top, left: page.offset()?.left || 0 });
  // text.css("max-width", `50px`)
  // console.log(page.offset()?.top);
  // console.log(page.offset()?.left);
  let width = book.outerWidth();
  if (width) {

    if (window.innerHeight <= 600) {
      book.css("height", "90%");
      const height = book.outerHeight() || 1;
      book.outerWidth(height / bookAspectRatio);
      width = book.outerWidth() || 1;
    } else {
      book.outerHeight(width * bookAspectRatio);
    }

    MoveMiddle = keyframes`
    from {
      transform: translate(${width / 2}px);
    }
    to {
      transform: translate(0);
    }
  `;
    MoveBack = keyframes`
    from {
      transform: translate(0);
    }
    to {
      transform: translate(${width / 2}px);
    }
  `;
  }
}


export default function AnimatedBook(data: IAnimatedBook) {
  window.addEventListener("resize", () => {
    if (data.modalData.isOpen) {
      resizeContentTextarea();
    }
  });

  window.screen.orientation.addEventListener("change", () => {
    if (data.modalData.isOpen) {
      resizeContentTextarea();
    }
  });

  function onClick(): void {
    data.setToggle(!data.toggle);
  }

  // const [isModalOpen, setisModalOpen] = useState(true);
  // const [isModalExiting, setIsPreviewExiting] = useState(false);

  return (
    <Modal id={modalId} data={{
      isOpen: data.modalData.isOpen,
      isExiting: data.isExiting,
      ContentElement: NoBackgroundContentModalStyle,
      contentData: {
        width: "400px",
        height: `${400 * bookAspectRatio}px`
      },
      setOpen: data.modalData.setOpen,
      setExiting: data.setIsExiting,
      onAfterOpen: resizeContentTextarea
    }}>
      {/* {data.toggle && <Text id="text123" onClick={onClick}>  dawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkddawod aowk, dokawd opakd kawopkd</Text>} */}
      <Wrapper toggle={data.toggle}>
        <Back src={data.backCover || data.frontCover || bookPlaceholderImage} onClick={onClick} toggle={data.toggle}></Back>
        <Page1 onClick={onClick} toggle={data.toggle}></Page1>
        <Page2 onClick={onClick} toggle={data.toggle}></Page2>
        <Page3 onClick={onClick} toggle={data.toggle}></Page3>
        <Page4 onClick={onClick} toggle={data.toggle}></Page4>
        <Page5 onClick={onClick} toggle={data.toggle}></Page5>
        <Page6 onClick={onClick} toggle={data.toggle}></Page6>
        <Front src={data.frontCover || bookPlaceholderImage} onClick={onClick} toggle={data.toggle}></Front>
      </Wrapper>
    </Modal>
  );
}

let MoveMiddle = keyframes``;

let MoveBack = keyframes``;

const Wrapper = styled.div`
  width: max(100%, 200px);
  transform-style: preserve-3d;
  position: relative;
  height: max(100%, 300px);
  /* margin-left: 500px; */
  cursor: pointer;
  backface-visibility: visible;
  /* transform: translateX(600px); */
  /* &:hover {
    transform: translate(600px);
  } */
  animation: ${({ toggle }: { toggle: boolean }) =>
    toggle
      ? css`
          ${MoveBack} 0.4s linear forwards
        `
      : css`
          ${MoveMiddle} 0.4s linear forwards
        `};
`;

// const FrontImage = styled.img`
//   margin-top: 8px;
//   grid-column: 1;
//   grid-row: 1;
//   width: 130px;
//   height: 180px;
//   z-index: 3;
// `;

// const BackImage = styled.img`
//   grid-column: 1;
//   grid-row: 1;
//   border-top-left-radius: 3px;
//   border-bottom-left-radius: 3px;
//   width: 128px;
//   height: 180px;
//   z-index: 1;
// `;

const BasePage = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform-origin: left center;
  transition: transform .5s ease-in-out, box-shadow .35s ease-in-out;
`

const BaseCover = styled.img`
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform-origin: left center;
  transition: transform .5s ease-in-out, box-shadow .35s ease-in-out;
`

const Front = styled(BaseCover)`
  background: navy;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-160deg) scale(1.1);
          box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
        `
  };
`

const Back = styled(BaseCover)`
  background: navy;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-20deg) scale(1.1);
        `
  };
`

// const Text = styled.p`
//     isolation: isolate;
//     z-index: 1;
//     position: absolute;
//     /* left: 70px;
//     width: 251px;
//     height: 300px; */
//     overflow: auto;
// `

const Page1 = styled(BasePage)`
  background: #efefef;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-150deg) scale(1.1);
          box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
        `
  };
`

const Page2 = styled(BasePage)`
  background: #efefef;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-30deg) scale(1.1);
          box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
        `
  };
`

const Page3 = styled(BasePage)`
  background: #f5f5f5;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-140deg) scale(1.1);
          box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
        `
  };
`

const Page4 = styled(BasePage)`
  background: #f5f5f5;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-40deg) scale(1.1);
          box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
        `
  };
`

const Page5 = styled(BasePage)`
  background: #fafafa;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-130deg) scale(1.1);
          box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
        `
  };
`

const Page6 = styled(BasePage)`
  background: #fdfdfd;
  ${({ toggle }: { toggle: boolean }) =>
    toggle === true && `
          transform: rotateY(-50deg) scale(1.1);
          box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
        `
  };
`
