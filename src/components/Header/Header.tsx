import styled from "styled-components";
import { XCircle } from "react-feather";
import { Colors } from "../../Colors";
import IHeaderData from "../../interfaces/IHederData";


export default function Header({ data, ...delegated }: IHeaderData) {
  return (
    <Wrapper {...delegated}>
      <Title>{data.title}</Title>
      <CloseIcon onClick={
        () => { data.crossFunc() }
      }></CloseIcon>
    </Wrapper>
  );
}

const Title = styled.h2`
    font-size: ${32 / 16}rem;
    margin: auto;
`

const Wrapper = styled.div`
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
