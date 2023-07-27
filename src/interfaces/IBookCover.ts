export interface IBookCover {
  data: {
    onBookClick: Function;
    onReadClick: Function;
    title: string;
    isFavourited: boolean;
    addToFavourites: Function;
    backgroundColor?: string;
    cover?: string;
    scaleBook?: boolean;
  };
}
