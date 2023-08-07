export default interface IUpdateDetailsRequest {
    userId: string;
    displayName?: string;
    description?: string;
    imageUrl?:string;
    settings?: {
        hideFavouriteBooks?: boolean,
        hideEmail?: boolean,
    };
}