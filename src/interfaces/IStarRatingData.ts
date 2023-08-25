export default interface IStarRatingData {
    data: {
        averageRating: number;
        numberOfRatings: number;
        alreadyRated: boolean;
        interactive?: boolean;
        bookId?: string
        hideNumbers?: boolean;
        currentUserRating?: number;
        onStarClick?: Function;
    }
}