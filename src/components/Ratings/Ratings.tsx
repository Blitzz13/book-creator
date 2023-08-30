import styled from "styled-components";
import { Colors } from "../../Colors";
import Button from "../Button/Button";
import Editor from "../Editor/Editor";
import { useEffect, useState } from "react";
import { generateId } from "../../helpers/helpFunctions";
import $ from "jquery";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import profilePlaceholder from "../../assets/placeholder-image-portrait.png"
import Loader from "../Loader/Loader";
import { useBookService } from "../../hooks/useBookServiceContext";
import StarRating from "../StarRating/StarRating";
import { useRatingService } from "../../hooks/useRatingServiceContext";
import { IRating } from "../../interfaces/service/rating/IRating";
import { IRatingObjResponse } from "../../interfaces/service/rating/IRatingObjResponse";
import IDisplayBook from "../../interfaces/IDisplayBook";
import { ServiceToBook } from "../../Converters/Book/ConvertBook";
import { IRatingModel } from "../../interfaces/IRatingModel";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { CommonContentModalStyle } from "../../commonStyledStyles/CommonContentModalStyle";
import NativeDropdown from "../NativeDropdown/NativeDropdown";
import { OrderDirectionService } from "../../enums/OrderDirectionService";
import { RatingSortService } from "../../enums/RatingSortService";
import { RatingSort } from "../../enums/RatingSort";
import { OrderDirection } from "../../enums/OrderDirection";
import { IRatingsFlter } from "../../interfaces/IRatingsFlter";

const textAreaId = generateId(7);

export default function Ratings() {
  const bookService = useBookService();
  const ratingService = useRatingService();
  const params = useParams();
  const authContext = useAuthContext();
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [myRating, setMyRating] = useState<IRatingObjResponse>();
  const [book, setBook] = useState<IDisplayBook>();
  const [averageRating, setAverageRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertExiting, setIsAlertExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [ratingModel, setRatingModel] = useState<IRatingModel>({
    rating: 0,
  });
  const [ratingsFilter, setRatingsFilter] = useState<IRatingsFlter>({
    order: OrderDirectionService.Decending,
    sort: RatingSortService.ByDate
  });


  async function getRatings(): Promise<void> {
    if (params.bookId) {
      setShowLoader(true);
      const book = await bookService.fetchBook(params.bookId);
      setBook(ServiceToBook(book));

      let userRating: IRatingObjResponse | undefined;
      if (authContext.user) {
        userRating = await ratingService.getUserRatingOfBook(authContext.user.id, params.bookId);
        const bookRating = await ratingService.getAverageRatingForBook(params.bookId);
        setAverageRating(bookRating.averageRating);
        setNumberOfRatings(bookRating.numberOfRatings);
        setMyRating(userRating);
        setRatingModel({
          rating: userRating?.rating || 0,
          comment: userRating?.comment,
        })
      }

      const ratings = await ratingService.getRatingsOfBook({
        bookId: params.bookId,
        order: ratingsFilter.order,
        sort: ratingsFilter.sort,
      });

      const foundRating = ratings.filter(x => x.id === userRating?._id)[0];
      const orderedRatings = ratings.filter(x => x.id !== userRating?._id);

      if (foundRating) {
        orderedRatings.unshift(foundRating);
      }

      setRatings(orderedRatings);
      setShowLoader(false);
    }
  }

  useEffect(() => {
    getRatings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext]);

  useEffect(() => {
    getRatings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratingsFilter]);

  function setTextAreaCss() {
    const textAreaContainer = $(`#${textAreaId}`).find(".ql-container");
    textAreaContainer.css("border-radius", "22px");
    textAreaContainer.css("background-color", Colors.BACKGROUND);
  }

  function onValueChange(text: string) {
    setRatingModel({ ...ratingModel, comment: text })
  }

  return (
    <Wrapper>
      <Loader data={{ isLoading: showLoader }}></Loader>
      <DetailsWrapper>
        <BookCover src={book?.frontConver || profilePlaceholder} />
        <TextLabel>Title:</TextLabel>
        <Text>{book?.title}</Text>
        <TextLabel>Description:</TextLabel>
        <TextArea
          id={textAreaId}
          onLoad={() => {
            setTextAreaCss();
          }}
          data={{
            onValueChange: () => { },
            setData: book?.description,
            theme: "bubble",
            readonly: true,
          }} />
          <StarRating data={{
            alreadyRated: false,
            averageRating: averageRating,
            numberOfRatings: numberOfRatings,
            interactive: false,
          }}/>
      </DetailsWrapper>
      <ReviewsWrapper>
        {authContext.user !== undefined &&
          <MyReviewWrapper>
            <ReviewerName to={`/profile/${authContext.user?.id}`}>{authContext.user?.displayName}</ReviewerName>
            <TextareaComment onChange={(event) => onValueChange(event.currentTarget.value)} value={ratingModel?.comment}></TextareaComment>
            <MyReviewBottomWrapper>
              <StarRating data={{
                onStarClick: (rating: number) => {
                  setRatingModel({
                    ...ratingModel,
                    rating: rating,
                  })
                },
                alreadyRated: true,
                averageRating: ratingModel.rating,
                numberOfRatings: 0,
                currentUserRating: ratingModel.rating,
                hideNumbers: true,
                interactive: true
              }} />
              {myRating && <DeleteButton data={{
                color: Colors.WARNING, height: 30, width: 84, radius: 20, textSize: 16, onClick: async () => {
                  if (myRating) {
                    setShowLoader(true);
                    await ratingService.deleteRating(myRating._id);
                    setRatings(ratings.filter(x => x.id !== myRating._id));
                    setMyRating(undefined);
                    setShowLoader(false);
                  }
                }
              }}>Delete</DeleteButton>}
              <UpdateButton data={{
                color: Colors.ACCENT, height: 30, width: 84, radius: 20, textSize: 16, onClick: async () => {
                  if (myRating) {
                    ratingService.updateRating(myRating?._id, ratingModel);
                    setRatings(prevArray =>
                      prevArray.map(obj => (obj.id === myRating._id && ratingModel) ? { ...obj, ...ratingModel, } : obj)
                    );
                    setMyRating({ ...myRating, rating: ratingModel.rating })
                  } else {
                    if (ratingModel.rating < 1) {
                      setIsAlertOpen(true);
                      return;
                    }

                    if (params.bookId) {
                      setShowLoader(true);
                      const rating = await ratingService.createRating(params.bookId, ratingModel);
                      setMyRating(rating);

                      ratings.unshift({
                        book: params.bookId,
                        comment: rating.comment,
                        displayName: authContext.user?.displayName || "",
                        rating: rating.rating,
                        id: rating._id,
                        userId: authContext.user?.id || "",
                      });

                      setRatings(ratings);
                      setShowLoader(false);
                    }
                  }
                }
              }}>
                {myRating ? "Update" : "Post"}
              </UpdateButton>
            </MyReviewBottomWrapper>
          </MyReviewWrapper>
        }
        <FiltersWrapper>
          <FilterWrapper>
            Order <NativeDropdown onValueChange={async (selectedValue: string) => {
              switch (selectedValue) {
                case OrderDirection.Acending:
                  setRatingsFilter({ ...ratingsFilter, order: OrderDirectionService.Acending })
                  break;
                case OrderDirection.Decending:
                  setRatingsFilter({ ...ratingsFilter, order: OrderDirectionService.Decending })
                  break;
                default:
                  break;
              }
            }}
              width={260}
              enumType={OrderDirection}
              disableFirstOption={true}
              initialValue={OrderDirection.Decending}
              data={{ items: Object.values(OrderDirection) }} />
          </FilterWrapper>
          <FilterWrapper>
            Sort by: <NativeDropdown onValueChange={(selectedValue: string) => {
              switch (selectedValue) {
                case RatingSort.ByDate:
                  setRatingsFilter({ ...ratingsFilter, sort: RatingSortService.ByDate })
                  break;
                case RatingSort.ByRating:
                  setRatingsFilter({ ...ratingsFilter, sort: RatingSortService.ByRating })
                  break;
                default:
                  break;
              }
            }}
              width={260}
              enumType={RatingSort}
              disableFirstOption={true}
              initialValue={RatingSort.ByDate}
              data={{ items: Object.values(RatingSort) }} />
          </FilterWrapper>
        </FiltersWrapper>
        {ratings.map((rating: IRating) => (
          <ReviewWrapper key={rating.id}>
            <ReviewerName to={`/profile/${rating.userId}`}>{rating.displayName}</ReviewerName>
            <ReviewerComment>{rating.comment}</ReviewerComment>
            <StarRating data={{
              alreadyRated: rating.id === myRating?._id,
              averageRating: rating.rating,
              currentUserRating: rating.id === myRating?._id ? myRating?.rating : 0,
              numberOfRatings: 0,
              hideNumbers: true,
              interactive: false
            }} />
          </ReviewWrapper>
        ))}
        {ratings.length <= 0 && <span>No reviews left yet</span>}
      </ReviewsWrapper>
      <ConfirmationModal data={{
        isOpen: isAlertOpen,
        isExiting: isAlertExiting,
        ContentElement: CommonContentModalStyle,
        contentData: {
          width: "400px",
        },
        setOpen: setIsAlertOpen,
        setExiting: setIsAlertExiting,
      }}
        confirmationData={{
          text: `You must set your review to have at least one star.`,
          modalTitle: `Review`,
          isAlert: true
        }}>
      </ConfirmationModal>
    </Wrapper>
  );
}

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  width: 100%;
  background-color: ${Colors.FOREGROUND};
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
  border-bottom-right-radius: 22px;
  border-bottom-left-radius: 22px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 14px;
  padding-bottom: 14px;
  gap: 6px;
`;

const MyReviewWrapper = styled(ReviewWrapper)`
  height: 250px;
`;

const MyReviewBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const ReviewerName = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
`

const ReviewerComment = styled.span`
  
`

const ReviewButton = styled(Button)`
  padding: 0;
`

const UpdateButton = styled(ReviewButton)`
  margin-left: 10px;
  padding: 0;
`

const DeleteButton = styled(ReviewButton)`
  margin-left: auto;
  padding: 0;
`

const Wrapper = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-bottom: 22px;
  display: flex;
  /* flex-flow: column; */
  gap: 24px;
  /* width: fit-content; */
  @media only screen and (max-width: 888px) {
    flex-flow: column;
    align-items: center;
    /* margin-left: auto; */
    /* margin-right: auto; */
    /* width: fit-content; */
    /* align-items: center; */
    /* text-align: center; */
  }
`;

const ReviewsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
  background-color: ${Colors.FOREGROUND};
  height: fit-content;
  width: fit-content;
  border-radius: 20px;
  padding: 12px;
  min-width: 384px;
  @media only screen and (max-width: 888px) {
    text-align: center;
    align-items: center;
    width: 100%;
    min-width: revert;
  }
`;

const TextareaComment = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 12px;
  padding: 8px 10px;
  border-color: ${Colors.BORDER};
`

const TextArea = styled(Editor)`
  display: flex;
  flex-flow: column;
  height: 400px;
  width: 100%;
  max-width: 512px;
  @media only screen and (max-width: 888px) {
    height: 400px;
  }
`;

const BookCover = styled.img`
  background-color: ${Colors.BACKGROUND};
  max-width: 512px;
  max-height: 470px;
  width: 100%;
  border-radius: 20px;
  object-fit: contain;
`;

const TextLabel = styled.span`
  font-size: ${22 / 16}rem;
  font-weight: bold;
`;

const Text = styled.span`
  font-size: ${22 / 16}rem;
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`

const FilterWrapper = styled.div`
  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    align-items: center;
  }
`

// const Checkbox = styled.input`
//   text-align: left;
//   width: 25px;
//   height: 25px;
//   &:checked {
//     background-color: ${Colors.ACCENT};
//   }
// `