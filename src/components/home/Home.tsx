import styled from "styled-components";
import AnimatedBook from "../AnimatedBook/AnimatedBook";
import BookWithPercentage from "../BookWithPercentage/BookWithPercentage";
import StyledWrapper from "../StyledWrapper/StyledWrapper";

export default function Home() {
  let content = [];
  for (let i = 0; i < 12; i++) {
    content.push(<BookWithPercentage backCover="https://pictures.abebooks.com/isbn/9780345427656-us.jpg"
      frontCover="https://pictures.abebooks.com/isbn/9780345427656-us.jpg"
      width={130}
      height={8}
      percentage={20}
      key={i}></BookWithPercentage>);
  }

  const GridWrapper = styled.div`
    padding-left: 20px;
    column-gap: 24px;
    justify-content: left;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(${content.length}, fit-content);
    overflow: auto;
  `
  return (
    <>
      <Wrapper>
        <Header>Continue Reading</Header>
        <GridWrapper>
          {content}
        </GridWrapper>
      </Wrapper>
      <Wrapper>
        <AnimatedBook></AnimatedBook>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(StyledWrapper)`
  margin: 9px 22px;
  padding-bottom: 4px;
  overflow: hidden;
`

const Header = styled.h3`
  max-width: fit-content;
  font-weight: 400;
  padding: 10px 20px;
  font-size: ${24 / 16}rem;
`