import IDetailsRequest from "./IDetailsRequest";
import ILoginRequest from "./ILoginRequest";
// import ILoginResponse from "./ILoginResponse";
import IRegisterService from "./IRegisterRequest";
import IUpdateDetailsRequest from "./IUpdateDetailsRequest";

export default interface IUserService {
  login(request: ILoginRequest): Promise<void>;
  logout(): Promise<void>;
  register(request: IRegisterService): Promise<void>;
  updateUser(request: IUpdateDetailsRequest): Promise<void>;
  getDetails(userId: string, logedUserId: string): Promise<IDetailsRequest>;
}
