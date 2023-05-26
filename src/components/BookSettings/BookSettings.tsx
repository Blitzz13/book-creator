import styled from "styled-components";
import { Colors } from "../../Colors";
import StyledWrapper from "../StyledWrapper/StyledWrapper";

export default function BookSettings(data: any) {
    return (
        <Wrapper>
          <div>Setting</div>
            {/* <HeaderTextarea name="textarea" placeholder="Enter chapter name here"></HeaderTextarea>
            <ContentTextarea name="textarea" placeholder="Enter content here"></ContentTextarea> */}
        </Wrapper>
    );
}

const Wrapper = styled(StyledWrapper)`
  margin-left: 22px;
  margin-right: 22px;
`;