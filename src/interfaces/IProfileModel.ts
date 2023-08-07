import IUserSettings from "./service/user/IUserSettings";

export interface IProfileModel {
    id: string;
    displayName: string;
    intialDisplayName: string;
    favouriteBookIds: string[];
    email: string;
    profileImageUrl: string;
    initialDescription?: string;
    description?: string;
    settings?: IUserSettings;
}