import { UserAction } from "../enums/UserAction";

export default interface IUserAction {
    type: UserAction;
    payload: {
        email: string;
        token: string;
    } | null;
}