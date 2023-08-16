import { UserRole } from "../../../enums/UserRole";
import IUserSettings from "./IUserSettings";

export default interface IDetailsRequest{
    displayName: string;
    description: string;
    imageUrl: string;
    role: UserRole;
    email: string;
    settings: IUserSettings;
}