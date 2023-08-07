import IUserSettings from "./IUserSettings";

export default interface IDetailsRequest{
    displayName: string;
    description: string;
    imageUrl: string;
    email: string;
    settings: IUserSettings;
}