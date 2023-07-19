import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import IHeaderWrapperData from "../../interfaces/IHeaderWrapperData";

export default function HeaderWrapper({ data, children, ...delegated }: IHeaderWrapperData) {
  return (
    <Wrapper noRoundedCorners={data.noRoundedCorners} {...delegated}>{children}</Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 1;
  background-color: ${Colors.ACCENT};
  height: 40px;

  ${({ noRoundedCorners }: { noRoundedCorners: boolean }) => css`
    border-top-right-radius: ${noRoundedCorners ? 0 : 28}px;
    border-top-left-radius: ${noRoundedCorners ? 0 : 28}px;
  `}

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-width: 0 0 2px 0;
  flex: 0 1 auto;
`

/* ${({ isFromModal }: { isFromModal: boolean }) => css`
  border-top-right-radius: ${isFromModal ? 0 : 28}px;
  border-top-left-radius: ${isFromModal ? 0 : 28}px;
`} */