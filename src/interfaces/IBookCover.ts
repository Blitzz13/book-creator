export interface IBookCover {
  data: {
    onBookClick: Function;
    onReadClick: Function;
    title: string;
    isFavourited: boolean;
    addToFavourites: Function;
    isMyBook: boolean;
    onDeleteClick?: Function;
    onEditClick?: Function;
    backgroundColor?: string;
    cover?: string;
    scaleBook?: boolean;
    mediaMaxWidth?: number;
  };
}
