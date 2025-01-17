import { useContext } from "react";
import { RatingServiceContext } from "../context/RatingServiceContext";

export const useRatingService = () => {
    const context = useContext(RatingServiceContext);
    if (!context) {
      throw new Error('useRatingService must be used within a RatingServiceContextProvider');
    }
    return context.ratingService;
  };