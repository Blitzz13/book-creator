import IDetailsRequest from "./IDetailsRequest";
import ILoginRequest from "./ILoginRequest";
// import ILoginResponse from "./ILoginResponse";
import IRegisterService from "./IRegisterRequest";
import ISaveBookProgressRequest from "./ISaveBookProgressRequest";
import ISavedBookProgressResponse from "./ISavedBookProgressResponse";
import ISearchUserRequest from "./ISearchUserRequest";
import ISearchUserResponse from "./ISearchUserResponse";
import IStartedBookProgressResponse from "./IStartedBookProgressResponse";
import IUpdateDetailsRequest from "./IUpdateDetailsRequest";

export default interface IUserService {
  login(request: ILoginRequest): Promise<void>;
  saveBookProgress(request: ISaveBookProgressRequest): Promise<ISavedBookProgressResponse>;
  getBookProgress(request: {bookId: string, userId:string}): Promise<ISavedBookProgressResponse>;
  startedBooksProgress(userId: string): Promise<IStartedBookProgressResponse[]>;
  logout(): Promise<void>;
  searchUsers(request: ISearchUserRequest): Promise<ISearchUserResponse[]>;
  searchUserIds(request: {userIds: string[]}): Promise<ISearchUserResponse[]>;
  refreshToken(): Promise<void>;
  register(request: IRegisterService): Promise<void>;
  updateUser(request: IUpdateDetailsRequest): Promise<void>;
  getDetails(userId: string, logedUserId: string): Promise<IDetailsRequest>;
}
