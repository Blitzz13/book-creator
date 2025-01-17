import { IAverageRatingResponse } from "./IAverageRatingResponse";
import ICreateRatingRequest from "./ICreateRatingRequest";
import { IRating } from "./IRating";
import { IRatingObjResponse } from "./IRatingObjResponse";
import { IRatingsRequest } from "./IRatingsRequest";
import IUpdateRatingRequest from "./IUpdateRatingRequest";

export default interface IRatingService {
    createRating(bookId: string, request: ICreateRatingRequest): Promise<IRatingObjResponse>;
    updateRating(ratingId: string, request: IUpdateRatingRequest): Promise<IRatingObjResponse>;
    deleteRating(ratingId: string): Promise<void>;
    getAverageRatingForMultipleBooks(bookIds: string[]): Promise<IAverageRatingResponse[]>;
    getAverageRatingForBook(bookId: string): Promise<IAverageRatingResponse>;
    getAllUserRatings(userId: string): Promise<IRatingObjResponse[]>;
    getUserRatingOfBook(userId: string, bookId: string): Promise<IRatingObjResponse | undefined>;
    getRatingsOfBook(request: IRatingsRequest): Promise<IRating[]>;
}