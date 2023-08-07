import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { IBookCover } from "../../interfaces/IBookCover";
import bookPlaceholderImage from "../../assets/placeholder-image-portrait.png";
import Button from "../Button/Button";
import { RiBookmark3Line, RiBookmark3Fill } from "react-icons/ri"
import { useAuthContext } from "../../hooks/useAuthContext";

const height = 350;
const width = 233;
const defaultMediaMaxWidth = 535;

export default function BookCover({ data, ...delegated }: IBookCover) {
  const [, setLoaded] = React.useState(false);
  const [, setShowDetails] = React.useState(false);
  const [isFavourited, setFavourited] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < (data.mediaMaxWidth ?? defaultMediaMaxWidth));
  const authContext = useAuthContext();
  useEffect(() => {
    setFavourited(data.isFavourited)
  }, [data.isFavourited])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < (data.mediaMaxWidth ?? defaultMediaMaxWidth));
    };

    // Add event listener for window resizing
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        scaleBook={data.scaleBook}
        mediaMaxWidth={data.mediaMaxWidth} />
      <Details>
        <Title>
          {data.title}
        </Title>
        <ButtonsWrapper scaleBook={data.scaleBook}
          mediaMaxWidth={data.mediaMaxWidth}>
          {/* {isSmallScreen === false && <DummyIcon size={26} />} */}
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
          {data.isMyBook === true && <ReadButton data={{
            color: Colors.WARNING,
            height: 30,
            width: 90,
            radius: 20,
            textSize: 16,
            onClick: () => {
              if (data.onDeleteClick) {
                data.onDeleteClick();
              }
            }
          }}>
            Delete
          </ReadButton>}
        </ButtonsWrapper>
        {authContext.user && <> {
          isFavourited?
            <FavoriteFill onClick = { () => {
              data.addToFavourites();
          setFavourited(false);
        }}
        size={26} />
        :
        <Favorite onClick={() => {
          data.addToFavourites();
          setFavourited(true);
        }} size={26} />
        }</>}
    </Details>
    </Wrapper >
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

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${({ scaleBook, mediaMaxWidth }: { scaleBook?: boolean, mediaMaxWidth?: number }) => css`
      ${scaleBook ? `
        @media only screen and (max-width: ${mediaMaxWidth ?? defaultMediaMaxWidth}px) {
          flex-direction: column;  
        }
      `: ""}
  `}
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
  ${({ backgroundColor, scaleBook, mediaMaxWidth }: { backgroundColor?: string, scaleBook?: boolean, mediaMaxWidth?: number }) => css`
      background-color: ${backgroundColor ? Colors.FOREGROUND : backgroundColor};
      ${scaleBook ? `
         @media only screen and (max-width: ${mediaMaxWidth ?? defaultMediaMaxWidth}px) {
          height: 180px;
          width: 110px;
        }
      `: ""}
  `}
`;