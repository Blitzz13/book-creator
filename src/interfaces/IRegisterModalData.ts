import IModalData from "./IModalData";
import IUserService from "./service/user/IUserService";

export default interface IRegisterModalData extends IModalData {
  userService: IUserService;
}
