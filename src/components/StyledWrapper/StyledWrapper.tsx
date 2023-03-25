import styled from "styled-components";
import { Colors } from "../../Colors";

export default function StyledWrapper({ ...delegated }) {
  return (
    <>
      <Wrapper {...delegated}></Wrapper>
    </>
  );
}

const Wrapper = styled.div`
    background-color: ${Colors.FOREGROUND};
    border-style: solid;
    border-width: 0 0px 5px 3px;
    border-color: ${Colors.ACCENT};
    border-radius: 30px;
`;