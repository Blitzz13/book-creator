import { UserAction } from "../enums/UserAction";

export default interface IUserAction {
    type: UserAction;
    payload: {
        email: string;
        id: string;
        token: string;
    } | null | undefined;
}