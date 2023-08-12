import styled from "styled-components";
import { Colors } from "../../Colors";
import { BounceLoader } from "react-spinners";

export default function SmallLoader({ data, ...delegated }: { data: { isLoading: boolean } }) {
    return (
        <>
            {data.isLoading && <Wrapper {...delegated}>
                <BackgroundWrapper />
                <Spinner color={Colors.ACCENT} loading={true} size={100} />
            </Wrapper>}
        </>
    );
};

const Spinner = styled(BounceLoader)`
  top: 50%;
  margin: auto;
  /* left: 50%; */
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
`

const BackgroundWrapper = styled.div`
  background-color: black;
  opacity: 0.4;
  position: absolute;
  width: 100%;
  height: 100%;
`;