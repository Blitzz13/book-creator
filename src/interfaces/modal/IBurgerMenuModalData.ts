import IModalData from "./IModalData";

export default interface IBurgerMenuModalData extends IModalData {
  onLoginClick: Function;
  onLogoutClick: Function;
  onRegisterClick: Function;
  onCreateBookClick: Function;
  displayName?: string;
  userId?: string;
}
