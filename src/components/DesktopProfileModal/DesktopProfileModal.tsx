import styled from "styled-components";
import ReactModal from "react-modal";
import { Colors } from "../../Colors";
import { Link } from "react-router-dom";
import IProfileModalData from "../../interfaces/IProfileModalData";
import { XCircle } from "react-feather";
import { ProfileModalStyle } from "../../commonStyledStyles/ProfileModalStyle";
import { NoOverlayStyle } from "../../commonStyledStyles/NoOverlayStyle";
export default function DesktopProfileModal(data: IProfileModalData) {
    ReactModal.setAppElement("#root");

    function handleCloseModal() {
        data.setOpen(false);
    }

    function handleLogout() {
        data.logout();
        handleCloseModal();
    }

    return (
        <ReactModal
            className="_"
            overlayClassName="_"
            onRequestClose={handleCloseModal}
            contentElement={(props, children) => (
                <ProfileModalStyle height={data.navbarHeight} width={data.width} {...props}>{children}</ProfileModalStyle>
            )}
            overlayElement={(props, contentElement) => (
                <NoOverlayStyle {...props}>{contentElement}</NoOverlayStyle>
            )}
            isOpen={data.isOpen}>
            <HeaderWrapper>
                <CloseIcon onClick={handleCloseModal}></CloseIcon>
            </HeaderWrapper>
            <BodyWrapper>
                <MenuLink to="">My Profile</MenuLink>
                <MenuLink to="">My Books</MenuLink>
                <MenuLink to="">Start new book</MenuLink>
                <MenuLink onClick={handleLogout} to="">Logout</MenuLink>
            </BodyWrapper>
        </ReactModal>
    );
}

const CloseIcon = styled(XCircle)`
  color: ${Colors.WARNING};
  width: 36px;
  height: 36px;
  margin-right: 4px;
  cursor: pointer;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.TEXT};
  font-size: ${32 / 16}rem;
  margin-left: 12px;
  
  &:first-of-type{
    margin-top: 12px;
  }

  &:last-of-type{
    margin-bottom: 12px;
  }
`;


const HeaderWrapper = styled.div`
  background-color: ${Colors.ACCENT};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
`;