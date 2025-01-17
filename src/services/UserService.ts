import ILoginRequest from "../interfaces/service/user/ILoginRequest";
// import ILoginResponse from "../interfaces/service/user/ILoginResponse";
import IRegisterRequest from "../interfaces/service/user/IRegisterRequest";
import IUserService from "../interfaces/service/user/IUserService";
import { useAuthContext } from "../hooks/useAuthContext";
import { UserAction } from "../enums/UserAction";
import { StatusCodeError } from "../error/StatusCodeError";
import IDetailsRequest from "../interfaces/service/user/IDetailsRequest";
import IUpdateDetailsRequest from "../interfaces/service/user/IUpdateDetailsRequest";
import ISaveBookProgressRequest from "../interfaces/service/user/ISaveBookProgressRequest";
import ISavedBookProgressResponse from "../interfaces/service/user/ISavedBookProgressResponse";
import IStartedBookProgressResponse from "../interfaces/service/user/IStartedBookProgressResponse";
import BaseService from "./BaseService";
import ISearchUserResponse from "../interfaces/service/user/ISearchUserResponse";
import ISearchUserRequest from "../interfaces/service/user/ISearchUserRequest";

export default class UserService extends BaseService implements IUserService {
  private _url = "/api/users";
  private _auth = useAuthContext();

  public async saveBookProgress(request: ISaveBookProgressRequest): Promise<ISavedBookProgressResponse> {
    const response = await fetch(`${this._url}/bookProgress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Saving book progress failed with ${response.statusText}`);
  }

  public async getBookProgress(request: { bookId: string, userId: string }): Promise<ISavedBookProgressResponse> {
    const response = await fetch(`${this._url}/bookProgress/${request.userId}/${request.bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Getting book progress failed with ${response.statusText}`);
  }

  public async startedBooksProgress(userId: string): Promise<IStartedBookProgressResponse[]> {
    const response = await fetch(`${this._url}/startedBooks/${userId}`, {
      method: "GET",
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Getting book progress failed with ${response.statusText}`);
  }

  public async updateUser(request: IUpdateDetailsRequest): Promise<void> {
    const stringified = JSON.stringify(request);
    const response = await fetch(`${this._url}/details/${request.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
      body: stringified,
    });

    const user = localStorage.getItem("user");
    if (user && request.displayName) {
      const parsedData = JSON.parse(user);
      if (request.userId !== parsedData.id) {
        return;
      }

      parsedData.displayName = request.displayName;
      const updatedDataString = JSON.stringify(parsedData);
      localStorage.setItem("user", updatedDataString);
      this._auth.dispatch({
        type: UserAction.Update,
        payload: parsedData,
      });
    }

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Updating user failed with ${response.statusText}`);
  }

  public async getDetails(userId: string): Promise<IDetailsRequest> {
    const response = await fetch(`${this._url}/details/${userId}`, {
      method: "GET",
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Getting details for user failed with ${response.statusText}`);
  }

  public async searchUsers(request: ISearchUserRequest): Promise<ISearchUserResponse[]> {
    const response = await fetch(`${this._url}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Getting details for user failed with ${response.statusText}`);
  }

  public async searchUserIds(request: {userIds: string[]}): Promise<ISearchUserResponse[]>{
    const response = await fetch(`${this._url}/search-by-ids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Getting details for user failed with ${response.statusText}`);
  }

  public async login(request: ILoginRequest): Promise<void> {
    const response = await fetch(`${this._url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      this._auth.dispatch({
        type: UserAction.Login,
        payload: json,
      });
    } else {
      throw new StatusCodeError(`Login failed with ${response.status}`, response.status);
    }
  }

  public async refreshToken(): Promise<void> {
    const response = await fetch(`${this._url}/refresh-token`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.user?.token}`
      },
    });

    const json = await response.json();
    if (this.user) {
      const updatedUser = {
        token: json.token,
        displayName: this.user.displayName,
        id: this.user.id,
        email: this.user.email,
      }

      const updatedUserData = JSON.stringify(updatedUser);
      localStorage.setItem("user", updatedUserData);

      this._auth.dispatch({
        type: UserAction.Update,
        payload: updatedUser,
      });
    }
  }

  public async logout(): Promise<void> {
    localStorage.removeItem("user");
    this._auth.dispatch({ type: UserAction.Logout, payload: null });
  }

  public async register(request: IRegisterRequest): Promise<void> {
    const response = await fetch(`${this._url}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      this._auth.dispatch({
        type: UserAction.Login,
        payload: json,
      });
    } else {
      throw new StatusCodeError(`Register failed with ${response.status}`, response.status);
    }

    // throw new Error(`Fetching books failed with ${response.statusText}`);
    // throw new Error(`Fetching book failed with ${"asd"}`);
  }
}
