export interface IBookCover {
  data: {
    onBookClick: Function;
    onReadClick: Function;
    title: string;
    isFavourited: boolean;
    addToFavourites: Function;
    isMyBook: boolean;
    averageRating: number;
    numberOfRatings: number;
    alreadyRated: boolean;
    currentUserRating?: number;
    onStarClick?: Function;
    onDeleteClick?: Function;
    onEditClick?: Function;
    backgroundColor?: string;
    cover?: string;
    scaleBook?: boolean;
    mediaMaxWidth?: number;
  };
}
