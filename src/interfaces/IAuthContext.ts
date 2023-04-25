import IUserAction from "./IUserAction";

export default interface IAuthContext {
  dispatch(data: IUserAction): void;
  email: string;
  token: string;
}
