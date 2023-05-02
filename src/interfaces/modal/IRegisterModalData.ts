import IUserService from "../service/user/IUserService";
import IModalData from "./IModalData";

export default interface IRegisterModalData extends IModalData {
  userService: IUserService;
  isLogin: boolean;
}
