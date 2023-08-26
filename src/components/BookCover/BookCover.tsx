import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { IBookCover } from "../../interfaces/IBookCover";
import bookPlaceholderImage from "../../assets/placeholder-image-portrait.png";
import Button from "../Button/Button";
import { RiBookmark3Line, RiBookmark3Fill, RiDeleteBin5Fill } from "react-icons/ri"
import { useAuthContext } from "../../hooks/useAuthContext";
import StarRating from "../StarRating/StarRating";
import { UserRole } from "../../enums/UserRole";
import { Download } from "react-feather";
import { useBookService } from "../../hooks/useBookServiceContext";
import ProgressBar from "../ProgressBar";

const height = 350;
const width = 233;
const defaultMediaMaxWidth = 535;

export default function BookCover({ data, ...delegated }: IBookCover) {
  const bookService = useBookService();
  const [downloadPercentage, setDownloadPercentage] = React.useState(0);
  const [, setLoaded] = React.useState(false);
  const [, setShowDetails] = React.useState(false);
  const [isFavourited, setFavourited] = useState(false);
  const [, setIsSmallScreen] = useState(window.innerWidth < (data.mediaMaxWidth ?? defaultMediaMaxWidth));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onLoad(): void {
    setLoaded(true)
  }

  async function downloadBook(): Promise<void> {
    const incrementInterval = 20; // Time interval for increment in milliseconds
    let downloadPercentage = 6; // Initial download percentage
    let incrementing = true; // Flag to control incrementing process

    const intervalId = setInterval(() => {
      if (incrementing && downloadPercentage < 70) {
        downloadPercentage += 1;
        setDownloadPercentage(downloadPercentage);
      } else {
        clearInterval(intervalId); // Stop incrementing
      }
    }, incrementInterval);

    const file = await bookService.download(data.bookId);

    clearInterval(intervalId);
    setDownloadPercentage(70);
    const blob = new Blob([file]);

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${data.title.replace(":", "")}.epub`);
    document.body.appendChild(link);
    link.click();
    setDownloadPercentage(100);

    // Clean up by revoking the object URL
    URL.revokeObjectURL(link.href);
    setTimeout(() => {
      setDownloadPercentage(0);
    }, 600);
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
          {(data.isMyBook === true || authContext.user?.role === UserRole.Admin) && <ReadButton data={{
            color: Colors.WARNING,
            height: 30,
            width: 90,
            radius: 20,
            textSize: 16,
            onClick: () => {
              if (data.onEditClick) {
                data.onEditClick();
              }
            }
          }}>
            Edit
          </ReadButton>}
        </ButtonsWrapper>
        <IconsWrapper>
          {authContext.user &&
            <>{
              isFavourited ?
                <FavoriteFill onClick={() => {
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
          {(data.isMyBook === true || authContext.user?.role === UserRole.Admin) && <DeleteIcon size={26} onClick={() => {
            if (data.onDeleteClick) {
              data.onDeleteClick();
            }
          }} />}
          <DownloadIcon onClick={downloadBook} />
        </IconsWrapper>
        {downloadPercentage > 0 && <ProgressBar width={200} height={4} percentage={downloadPercentage} dontShowText={true} />}
        <StarRating data={{
          numberOfRatings: data.numberOfRatings,
          alreadyRated: data.alreadyRated,
          averageRating: data.averageRating,
          currentUserRating: data.currentUserRating,
          bookId: data.bookId,
          interactive: data.starsInteractive,
          onStarClick: (rating: number) => {
            if (data.onStarClick) {
              data.onStarClick(rating);
            }
          }
        }} />
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

const DeleteIcon = styled(RiDeleteBin5Fill)`
  cursor: pointer;
`;

const DownloadIcon = styled(Download)`
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  ${({ scaleBook, mediaMaxWidth }: { scaleBook?: boolean, mediaMaxWidth?: number }) => css`
      ${scaleBook ? `
        @media only screen and (max-width: ${mediaMaxWidth ?? defaultMediaMaxWidth}px) {
          flex-direction: column;  
        }
      `: ""}
  `}
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
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