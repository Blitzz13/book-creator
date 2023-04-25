import ILoginRequest from "./ILoginRequest";
// import ILoginResponse from "./ILoginResponse";
import IRegisterService from "./IRegisterRequest";

export default interface IUserService {
  login(request: ILoginRequest): Promise<void>;
  logout(): Promise<void>;
  register(request: IRegisterService): Promise<void>;
}
