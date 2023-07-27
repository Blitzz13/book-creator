import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { IBookCover } from "../../interfaces/IBookCover";
import bookPlaceholderImage from "../../assets/placeholder-image-portrait.png";
import Button from "../Button/Button";
import { RiBookmark3Line, RiBookmark3Fill } from "react-icons/ri"

const height = 350;
const width = 233;

export default function BookCover({ data, ...delegated }: IBookCover) {
  const [, setLoaded] = React.useState(false);
  const [, setShowDetails] = React.useState(false);
  const [isFavourited, setFavourited] = useState(false);

  useEffect(() => {
    setFavourited(data.isFavourited)
  }, [data.isFavourited])
  function onLoad(): void {
    setLoaded(true)
  }

  return (
    <Wrapper onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      onTouchCancel={() => setShowDetails(false)}
      onTouchEnd={() => setShowDetails(false)}
      onTouchStart={() => setShowDetails(true)}>
      <Image onLoad={onLoad}
        onClick={() => data.onBookClick()}
        {...delegated}
        src={data.cover || bookPlaceholderImage}
        alt={data.title}
        backgroundColor={data.backgroundColor}
        scaleBook={data.scaleBook} />
      <Details>
        <Title>
          {data.title}
        </Title>
        <Test>
          <DummyIcon size={26} />
          <ReadButton data={{
            color: Colors.ACCENT,
            height: 30,
            width: 90,
            radius: 20,
            textSize: 16,
            onClick: () => { data.onReadClick() }
          }}>
            Read
          </ReadButton>
          {isFavourited ?
            <FavoriteFill onClick={() => {
              data.addToFavourites();
              setFavourited(false);
            }}
              size={26} />
            :
            <Favorite onClick={() => {
              data.addToFavourites();
              setFavourited(true);
            }} size={26} />}
        </Test>
      </Details>
    </Wrapper>
  );
}

const Favorite = styled(RiBookmark3Line)`
  cursor: pointer;
`;

const FavoriteFill = styled(RiBookmark3Fill)`
  cursor: pointer;
`;

const DummyIcon = styled(RiBookmark3Fill)`
  opacity: 0;
`;

const Test = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  isolation: isolate;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  z-index: 1;
`;

const ReadButton = styled(Button)`
  z-index: 1;
  padding: 0;
  margin: auto;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
  gap: 10px;
`;

const Image = styled.img`
  position: relative;
  height: ${height}px;
  width: ${width}px;
  object-fit: cover;

  cursor: pointer;
  ${({ backgroundColor, scaleBook }: { backgroundColor?: string, scaleBook?: boolean }) => css`
      background-color: ${backgroundColor ? Colors.FOREGROUND : backgroundColor};
      ${scaleBook ? `
         @media only screen and (max-width: 535px) {
          height: 180px;
          width: 110px;
        }
      `: ""}
  `}
`;