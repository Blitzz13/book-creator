import IAuthUser from "./IAuthUser";
import IUserAction from "./IUserAction";

export default interface IAuthContext {
  dispatch(data: IUserAction): void;
  user?: IAuthUser;
}
