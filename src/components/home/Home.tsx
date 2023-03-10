import styled from "styled-components";

export default function Home() {
  const Wrapper = styled.div`
    background-color: gray;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const Header = styled.h1`
    font-size: 4rem;
  `
  return (
    <>
      <Wrapper>
        <Header>The Book Creator</Header>
      </Wrapper>
    </>
  );
}