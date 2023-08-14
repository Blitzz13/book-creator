export default interface IStarRatingData {
    data: {
        averageRating: number;
        numberOfRatings: number;
        alreadyRated: boolean;
        currentUserRating?: number;
        onStarClick?: Function;
    }
}