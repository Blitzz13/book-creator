import IModalData from "./IModalData";

export default interface IProfileModalData extends IModalData {
  navbarHeight: number;
  logout: Function;
  createBook: Function;
}
