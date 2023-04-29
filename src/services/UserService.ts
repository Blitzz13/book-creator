import ILoginRequest from "../interfaces/service/user/ILoginRequest";
// import ILoginResponse from "../interfaces/service/user/ILoginResponse";
import IRegisterRequest from "../interfaces/service/user/IRegisterRequest";
import IUserService from "../interfaces/service/user/IUserService";
import { useAuthContext } from "../hooks/useAuthContext";
import { UserAction } from "../enums/UserAction";
import { StatusCodeError } from "../error/StatusCodeError";

export default class UserService implements IUserService {
  private _url = "/api/users";
  private _auth = useAuthContext();

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
