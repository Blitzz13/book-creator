import React from "react";
import styled, { css, keyframes } from "styled-components";

export default function AnimatedBook() {
  function onClick(): void {
    setToggle(!toggle);
  }

  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <Wrapper toggle={toggle}>
        <Back src="https://pictures.abebooks.com/isbn/9780345427656-us.jpg"></Back>
        <Page1></Page1>
        <Page2></Page2>
        <Page3></Page3>
        <Page4></Page4>
        <Page5></Page5>
        <Page6></Page6>
        <Front src="https://pictures.abebooks.com/isbn/9780345427656-us.jpg" onClick={onClick}></Front>
      </Wrapper>
    </>
  );
}

const MoveMiddle = keyframes`
 from{
  transform: translate(600px);
 }
 to
  {
    transform: translate(600px);
  }
`;

const MoveBack = keyframes`
  from {
    transform: translate(600px);
  }
  to {
    transform: translate(0px);
  }
`;

const Wrapper = styled.div`
  width: fit-content;
  transform-style: preserve-3d;
  position: relative;
  height: 300px;
  cursor: pointer;
  backface-visibility: visible;
  /* transform: translateX(600px); */
  /* &:active {
    transform: translate(600px);
  } */
  animation: ${({ toggle }: { toggle: boolean }) =>
    toggle
      ? css`
          ${MoveBack} 0.7s linear forwards
        `
      : css`
          ${MoveMiddle} 0.7s linear forwards
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
  width: 200px;
  height: 100%;
  top: 0; left: 0;
  transform-origin: left center;
  transition: transform .5s ease-in-out, box-shadow .35s ease-in-out;
`

const BaseCover = styled.img`
  transform-style: preserve-3d;
  position: absolute;
  width: 200px;
  height: 100%;
  top: 0; left: 0;
  transform-origin: left center;
  transition: transform .5s ease-in-out, box-shadow .35s ease-in-out;
`

const Front = styled(BaseCover)`
  background: navy;
  ${Wrapper}:active &{
    transform: rotateY(-160deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
  }
`

const Back = styled(BaseCover)`
  background: navy;
  ${Wrapper}:active &{
    transform: rotateY(-20deg) scale(1.1);
  }
`

const Page1 = styled(BasePage)`
  background: #efefef;
  ${Wrapper}:active &{
    transform: rotateY(-150deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
  }
`

const Page2 = styled(BasePage)`
  background: #efefef;
  ${Wrapper}:active &{
    transform: rotateY(-30deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
  }
`

const Page3 = styled(BasePage)`
  background: #f5f5f5;
  ${Wrapper}:active &{
    transform: rotateY(-140deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
  }
`

const Page4 = styled(BasePage)`
  background: #f5f5f5;
  ${Wrapper}:active &{
    transform: rotateY(-40deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
  }
`

const Page5 = styled(BasePage)`
  background: #fafafa;
  ${Wrapper}:active &{
    transform: rotateY(-130deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
  }
`

const Page6 = styled(BasePage)`
  background: #fdfdfd;
  ${Wrapper}:active &{
    transform: rotateY(-50deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
  }
`
