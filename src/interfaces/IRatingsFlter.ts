import { OrderDirectionService } from "../enums/OrderDirectionService";
import { RatingSortService } from "../enums/RatingSortService";

export interface IRatingsFlter {
    order: OrderDirectionService,
    sort: RatingSortService,
}