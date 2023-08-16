import { UserRole } from "../enums/UserRole";

export default interface IAuthUser {
    email: string;
    id: string;
    token: string;
    displayName: string;
    role: UserRole;
}
