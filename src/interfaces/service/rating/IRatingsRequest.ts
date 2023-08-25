import { OrderDirectionService } from "../../../enums/OrderDirectionService";
import { RatingSortService } from "../../../enums/RatingSortService";

export interface IRatingsRequest {
    bookId: string,
    order?: OrderDirectionService,
    sort?: RatingSortService,
}