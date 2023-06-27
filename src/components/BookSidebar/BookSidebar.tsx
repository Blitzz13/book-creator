import styled from "styled-components";
import StyledWrapper from "../StyledWrapper/StyledWrapper";
import IBookSidebarData from "../../interfaces/IBookSidebarData";
import SidebarContent from "./SidebarContent";


export default function BookSidebar({ data, ...delegated }: IBookSidebarData) {
  return (
    <Wrapper {...delegated}>
      <SidebarContent data={data}/>
    </Wrapper>
  );
}

const Wrapper = styled(StyledWrapper)`
`;