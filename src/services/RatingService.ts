import { IAverageRatingResponse } from "../interfaces/service/rating/IAverageRatingResponse";
import ICreateRatingRequest from "../interfaces/service/rating/ICreateRatingRequest";
import { IRating } from "../interfaces/service/rating/IRating";
import { IRatingObjResponse } from "../interfaces/service/rating/IRatingObjResponse";
import IRatingService from "../interfaces/service/rating/IRatingService";
import { IRatingsRequest } from "../interfaces/service/rating/IRatingsRequest";
import IUpdateRatingRequest from "../interfaces/service/rating/IUpdateRatingRequest";
import BaseService from "./BaseService";

export default class RatingService extends BaseService implements IRatingService {
    private _url = "/api/ratings";

    public async createRating(bookId: string, request: ICreateRatingRequest): Promise<IRatingObjResponse> {
        const response = await fetch(`${this._url}/rate/${bookId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.user?.token}`
            },
            body: JSON.stringify(request),
        });

        const json = await response.json()

        if (response.ok) {
            return json;
        }

        throw new Error(`rating book failed with ${response.statusText}`);
    }

    public async updateRating(bookId: string, request: IUpdateRatingRequest): Promise<IRatingObjResponse> {
        const response = await fetch(`${this._url}/rate/${bookId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.user?.token}`
            },
            body: JSON.stringify(request),
        });

        const json = await response.json()

        if (response.ok) {
            return json;
        }

        throw new Error(`updating book failed with ${response.statusText}`);
    }

    public async deleteRating(ratingId: string): Promise<void> {
        const response = await fetch(`${this._url}/rate/${ratingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.user?.token}`
            },
        });

        if (response.ok) {
            return;
        }

        throw new Error(`updating book failed with ${response.statusText}`);
    }

    public async getAverageRatingForMultipleBooks(bookIds: string[]): Promise<IAverageRatingResponse[]> {
        const response = await fetch(`${this._url}/average`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bookIds: bookIds }),
        });

        const json = await response.json()

        if (response.ok) {
            return json;
        }

        throw new Error(`getting average ratings for multiple books failed with ${response.statusText}`);
    }

    public async getAverageRatingForBook(bookId: string): Promise<IAverageRatingResponse> {
        const response = await fetch(`${this._url}/average/${bookId}`, {
            method: "GET",
        });

        const json = await response.json()

        if (response.ok) {
            return json;
        }

        throw new Error(`getting average ratings for a book failed with ${response.statusText}`);
    }

    public async getRatingsOfBook(request: IRatingsRequest): Promise<IRating[]> {
        const response = await fetch(`${this._url}/${request.bookId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        });

        const json = await response.json()

        if (response.ok) {
            return json;
        }

        throw new Error(`getting average ratings for a book failed with ${response.statusText}`);
    }

    public async getAllUserRatings(userId: string): Promise<IRatingObjResponse[]> {
        const response = await fetch(`${this._url}/user/${userId}`, {
            method: "GET",
        });

        const json = await response.json()

        if (response.ok) {
            return json;
        }

        throw new Error(`getting average ratings for a book failed with ${response.statusText}`);
    }

    public async getUserRatingOfBook(userId: string, bookId: string): Promise<IRatingObjResponse | undefined> {
        const response = await fetch(`${this._url}/user/${userId}/${bookId}`, {
            method: "GET",
        });

        const json = await response.json()

        if (response.ok) {
            return json;
        }

        throw new Error(`getting average ratings for a book failed with ${response.statusText}`);
    }
}