import IUserAction from "./IUserAction";

export default interface IAuthContext {
  dispatch(data: IUserAction): void;
  user?: {
    email: string;
    id: string;
    token: string;
    displayName: string;
  };
}
