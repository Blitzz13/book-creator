import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import styled from 'styled-components';
import { Colors } from '../../Colors';
import IStarRatingData from '../../interfaces/IStarRatingData';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

export default function StarRating({ data, ...delegated }: IStarRatingData) {
  const authContext = useAuthContext();
  const stars: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    if (i + 1 <= data.averageRating || i + 1 <= (data.currentUserRating || 0)) {
      stars.push(<StarFill onClick={() => {
        if (data.onStarClick) {
          data.onStarClick(i + 1);
        }
      }
      } key={i}
        data-interactive={data.interactive}
        data-user-rated={data.alreadyRated && i + 1 <= (data.currentUserRating || 0) && authContext.user !== undefined} />);
    } else if (i < data.averageRating) {
      stars.push(<StarHalf onClick={() => {
        if (data.onStarClick) {
          data.onStarClick(i + 1);
        }
      }
      } key={i}
        data-interactive={data.interactive}
        data-user-rated={data.alreadyRated && i + 1 <= (data.currentUserRating || 0) && authContext.user !== undefined} />);
    } else {
      stars.push(<StarEmpty onClick={() => {
        if (data.onStarClick) {
          data.onStarClick(i + 1);
        }
      }
      } key={i}
        data-interactive={data.interactive}
        data-user-rated={data.alreadyRated && i + 1 <= (data.currentUserRating || 0) && authContext.user !== undefined} />);
    }
  }

  return (
    <Wrapper {...delegated}>
      <StarsWrapper>{stars}</StarsWrapper>
      {!data.hideNumbers && <NumbersWrapper>
        <Rating>{data.averageRating.toFixed(2)}</Rating>
        {(data.interactive === true || data.interactive === undefined) ?
          <NumberOfRatingsLink to={`/reviews/${data.bookId}`}>(<u>{data.numberOfRatings}</u>)</NumberOfRatingsLink> :
          <NumberOfRatingsText>({data.numberOfRatings})</NumberOfRatingsText>
        }
      </NumbersWrapper>}
    </Wrapper>
  );
};

const starStyles = `
  color: ${(props: { 'data-user-rated': boolean }) =>
    props['data-user-rated'] ? Colors.ACCENT : Colors.STAR};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${Colors.STAR};
  @media only screen and (max-width: 535px) {
    gap: 5px;
    flex-direction: column;
  }
`;

const NumbersWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media only screen and (max-width: 535px) {
    display: flex;
    gap: 5px;
  }
`;

const StarsWrapper = styled.div`
  display:flex;
  gap: 1px;
  align-items: center;
`;

const StarFill = styled(BsStarFill) <IStar>`
  ${starStyles}
  color: ${(props) => (props['data-user-rated'] ? Colors.ACCENT : Colors.STAR)};
  cursor: ${(props) => ((props['data-interactive'] === true || props['data-interactive'] === undefined) ? "pointer" : "")};
  font-size: 24px;
  @media only screen and (max-width: 535px) {
    font-size: 16px;
  }
`;

const StarHalf = styled(BsStarHalf) <IStar>`
  ${starStyles}
  color: ${(props) => (props['data-user-rated'] ? Colors.ACCENT : Colors.STAR)};
  cursor: ${(props) => ((props['data-interactive'] === true || props['data-interactive'] === undefined) ? "pointer" : "")};
  font-size: 24px;
  @media only screen and (max-width: 535px) {
    font-size: 16px;
  }
`;

const StarEmpty = styled(BsStar) <IStar>`
  ${starStyles}
  color: ${(props) => (props['data-user-rated'] ? Colors.ACCENT : Colors.STAR)};
  cursor: ${(props) => ((props['data-interactive'] === true || props['data-interactive'] === undefined) ? "pointer" : "")};
  font-size: 24px;
  @media only screen and (max-width: 535px) {
    font-size: 16px;
  }
`;

const Rating = styled.span`
  /* display: flex;
  align-items: center; */
  font-size: ${22 / 16}rem;
  @media only screen and (max-width: 535px) {
    font-size: ${16 / 16}rem;
    font-weight: bold;
  }
`;

const NumberOfRatingsLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${18 / 16}rem;
  text-decoration: none;
  @media only screen and (max-width: 535px) {
    font-size: ${14 / 16}rem;
    font-weight: bold;
  }
`;

const NumberOfRatingsText = styled.span`
  display: flex;
  align-items: center;
  font-size: ${18 / 16}rem;
`;

interface IStar {
  "data-user-rated": boolean
  "data-interactive"?: boolean
}
