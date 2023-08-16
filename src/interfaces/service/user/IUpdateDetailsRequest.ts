import { UserRole } from "../../../enums/UserRole";

export default interface IUpdateDetailsRequest {
    userId: string;
    displayName?: string;
    role?: UserRole;
    description?: string;
    imageUrl?:string;
    settings?: {
        hideFavouriteBooks?: boolean,
        hideEmail?: boolean,
    };
}