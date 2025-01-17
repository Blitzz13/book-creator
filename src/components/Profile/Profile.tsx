import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import Button from "../Button/Button";
import CustomInput from "../Input/Input";
import Editor from "../Editor/Editor";
import { ORDERED_LIST, BULLET_LIST } from "../../constants/ToolbarConstants";
import { ToolbarTextStyle } from "../../enums/ToolbarTextStyle";
import BookList from "../BookCover/BookList";
import IBookService from "../../interfaces/service/book/IBookService";
import { useState, useEffect } from "react";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { generateId } from "../../helpers/helpFunctions";
import $ from "jquery";
import IUserService from "../../interfaces/service/user/IUserService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IProfileModel } from "../../interfaces/IProfileModel";
import IFavouriteBookIdsResult from "../../interfaces/service/book/IFavouriteBookIdsResult";
import Checkbox from "../Checkbox/Checkbox";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import profilePlaceholder from "../../assets/placeholder-image-portrait.png"
import { CommonContentModalStyle } from "../../commonStyledStyles/CommonContentModalStyle";
import { ProfileBookTabs } from "../../enums/ProfileBookTabs";
import BookWithPercentageList from "../BookWithPercentage/BookWithPercentageList";
import IStartedBookProgressResponse from "../../interfaces/service/user/IStartedBookProgressResponse";
import { UserRole } from "../../enums/UserRole";
import NativeDropdown from "../NativeDropdown/NativeDropdown";
import { ServiceBookState } from "../../enums/ServiceBookState";
import Loader from "../Loader/Loader";
import ImageUploader from "../ImageUploader/ImageUploader";

const textAreaId = generateId(7);

export default function Profile(data: { bookService: IBookService, userService: IUserService }) {
  const bookService = data.bookService;
  const userService = data.userService;
  const [favouriteBooks, setFavouriteBooks] = useState([] as IServiceBook[]);
  const [authoredBooks, setAuthoredBooks] = useState([] as IServiceBook[]);
  const [earlyAcessBooks, setEarlyAcessBooks] = useState([] as IServiceBook[]);
  const params = useParams();
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const [isFavourteOpen, setIsFavouriteOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationExiting, setIsConfirmationExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [currentTab, setCurrentTab] = useState<ProfileBookTabs>(ProfileBookTabs.FavouriteBooks);
  const [startedBooks, setStartedBooks] = useState<IStartedBookProgressResponse[]>([]);
  const [progressBooks, setProgressBooks] = useState<IStartedBookProgressResponse[]>([]);
  const [callDeleteBook, setCallDeleteBook] = useState<boolean>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bookDeleteId, setBookDeleteId] = useState("");
  const [noBooksMessage, setNoBooksMessage] = useState<string>();
  const [profileModel, setProfileModel] = useState<IProfileModel>({
    id: params.userId ?? "",
    displayName: "",
    profileImageUrl: "",
    email: "",
    favouriteBookIds: [],
    intialDisplayName: "",
    role: UserRole.User,
  });

  useEffect(() => {
    loadFavouriteBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileModel.settings]);

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user, params]);

  useEffect(() => {
    async function loadStartedBooks() {
      if (authContext.user) {
        const startedBooks = (await userService.startedBooksProgress(authContext.user.id));

        setStartedBooks(startedBooks);
      }
    }

    loadStartedBooks();
  }, [authContext.user, userService])

  useEffect(() => {
    if (profileModel.id !== "") {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profileModel.id !== "") {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileModel.id]);

  useEffect(() => {
    switch (currentTab) {
      case ProfileBookTabs.CurrentlyReading: {
        const filteredBooks: IStartedBookProgressResponse[] = [];
        for (const book of startedBooks) {
          if (book.currentChapterOrderId >= book.allChaptersCount && book.chapterPercentage > 0.99) {
            continue;
          }
          filteredBooks.push(book)
        }

        setProgressBooks(filteredBooks);
        break;
      }
      case ProfileBookTabs.FinishedReading: {
        const filteredBooks: IStartedBookProgressResponse[] = [];
        for (const book of startedBooks) {
          if (book.currentChapterOrderId >= book.allChaptersCount && book.chapterPercentage > 0.99) {
            filteredBooks.push(book)
          }
        }

        setProgressBooks(filteredBooks);
        break;
      }
      default:
        break;
    }
  }, [currentTab, startedBooks]);

  async function load(): Promise<void> {
    setShowLoader(true);
    await getAuthoredBooks();
    await getEarlyAccessBooks();
    await loadFavouriteBooks();
    setShowLoader(false);
  }

  async function loadFavouriteBooks(): Promise<void> {
    if (profileModel.settings?.hideFavouriteBooks === false || profileModel.id === authContext.user?.id) {
      const favouriteBooks = await bookService.getFavouriteBooks(profileModel.id);
      setFavouriteBooks(favouriteBooks);
    }
  }

  async function loadDetails(): Promise<void> {
    try {
      if (params.userId) {
        const details = await userService.getDetails(params.userId, authContext.user?.id ?? "");
        const result = authContext.user?.id ? await bookService.getFavouriteBooksIds(profileModel.id) : { favouriteBookIds: [] } as IFavouriteBookIdsResult;

        if (details.settings.hideFavouriteBooks && authContext.user?.id !== profileModel.id) {
          setNoBooksMessage("The user has hidden their favourite books");
        } else {
          setNoBooksMessage(undefined);
        }

        setProfileModel({
          ...profileModel,
          id: params.userId,
          initialDescription: details.description,
          intialDisplayName: details.displayName,
          displayName: details.displayName,
          profileImageUrl: details.imageUrl || "",
          email: details.email,
          role: details.role,
          settings: details.settings,
          favouriteBookIds: result.favouriteBookIds,
        });
      }
    } catch (error) {
      navigate("*");
      console.error(error);
    }

  }

  async function deleteBook(): Promise<void> {
    await bookService.deleteBook(bookDeleteId);
  }

  function confirmDeleteBook(): void {
    deleteBook();
    setIsConfirmationExiting(true);
    setAuthoredBooks(authoredBooks.filter(x => x._id !== bookDeleteId));
    setFavouriteBooks(favouriteBooks.filter(x => x._id !== bookDeleteId));
  }

  function confirmDeleteProfile(): void {
  }

  async function getAuthoredBooks(): Promise<void> {
    bookService.searchBooks({ userId: profileModel.id }).then((data: IServiceBook[]) => {
      setAuthoredBooks(data);
    });
  }

  async function getEarlyAccessBooks(): Promise<void> {
    const data = await bookService.searchBooks({ userId: profileModel.id, state: ServiceBookState.InvitesOnly });
    setEarlyAcessBooks(data);
  }

  async function addToFavourites(bookId: string): Promise<void> {
    await data.bookService.addToFavourites({
      bookId: bookId,
      userId: authContext.user?.id || "",
    });

    const index = favouriteBooks.map(x => x._id).indexOf(bookId);

    if (index === -1) {
      const newFavouriteBook = await bookService.fetchBook(bookId);
      setFavouriteBooks([...favouriteBooks, newFavouriteBook])
    }
  }

  async function updateProfile(): Promise<void> {
    setShowLoader(true);
    const displayName = profileModel.intialDisplayName !== profileModel.displayName ? profileModel.displayName : undefined;
    const imageUrl = profileModel.profileImageUrl !== "" ? profileModel.profileImageUrl : undefined;

    await userService.updateUser({
      imageUrl: imageUrl,
      userId: profileModel.id,
      role: profileModel.role,
      description: profileModel.description,
      displayName: displayName,
      settings: profileModel.settings
    });

    setShowLoader(false);
  }

  return (
    <Wrapper>
      <Loader data={{ isLoading: showLoader }}></Loader>
      <DetailsWrapper>
        <ProfileImage src={profileModel.profileImageUrl || profilePlaceholder} />
        {(authContext.user?.id === profileModel.id || authContext.user?.role === UserRole.Admin) &&
          <>
          <TextLabel>Change Profile Image</TextLabel>
            <Uploader data={{
              setImageUrl: (url: string) => {
                setIsUploading(false);
                setProfileModel({ ...profileModel, profileImageUrl: url });
              },
              setPercentage: (percent: number) => {
                if (percent < 100) {
                  setIsUploading(true);
                }
              },
            }} />
          </>
        }
        {/* {needsSlider && <SliderWrapper>
                    <TextLabel>Top:</TextLabel>
                    <Slider type="range" min="1" max="100" onChange={handleSliderChange} value={top} id="myRange" />
                </SliderWrapper>} */}
        <TextLabel>Username:</TextLabel>
        {(authContext.user?.id === profileModel.id || authContext.user?.role === UserRole.Admin) ? <Input value={profileModel.displayName} onValueChange={(value: string) => {
          setProfileModel({ ...profileModel, displayName: value });
        }} /> :
          <Text>{profileModel.displayName}</Text>
        }
        {(!profileModel.settings?.hideEmail || authContext.user?.id === profileModel.id || authContext.user?.role === UserRole.Admin) &&
          <>
            <TextLabel>Email:</TextLabel>
            <Text>{profileModel.email}</Text>
          </>
        }
        {(authContext.user?.role === UserRole.Admin) &&
          <>
            <TextLabel>Role:</TextLabel>
            <EnumDropdown width={400} disableFirstOption={true} initialValue={profileModel.role} onValueChange={(value: string) => setProfileModel({ ...profileModel, role: value as UserRole })} enumType={UserRole} data={{ items: Object.values(UserRole) }} />
          </>
        }
        {(authContext.user?.id === profileModel.id || authContext.user?.role === UserRole.Admin) && <TextArea
          id={textAreaId}
          onLoad={() => {
            setTextAreaCss();
          }}
          data={{
            onValueChange: (value: string) => {
              profileModel.description = value;
            },
            setData: profileModel.initialDescription,
            modules: {
              toolbar: {
                sizes: [{ size: [] }],
                textStyles: [
                  ToolbarTextStyle.BOLD,
                  ToolbarTextStyle.ITALIC,
                  ToolbarTextStyle.UNDERLINE,
                ],
                liststyles: [ORDERED_LIST, BULLET_LIST],
                align: [{ align: [] }],
                removeStylesButton: ["clean"],
              }
            }
          }}></TextArea>}
        {(authContext.user?.id !== profileModel.id && authContext.user?.role !== UserRole.Admin) && <TextArea
          id={textAreaId}
          onLoad={() => {
            setTextAreaCss();
          }}
          data={{
            onValueChange: () => { },
            setData: profileModel.initialDescription,
            theme: "bubble",
            readonly: true,
          }}></TextArea>}
          {isUploading && <Warning>Image is still uploading, please wait.</Warning>}
        {(authContext.user?.id === profileModel.id || authContext.user?.role === UserRole.Admin) &&
          <>
            <ButtonsWrapper>
              <DetailsButton data={{
                color: Colors.ACCENT,
                height: 51,
                width: 180,
                radius: 20,
                textSize: 22,
                type: "submit",
                onClick: () => {
                  updateProfile();
                }
              }}>Save Changes</DetailsButton>
              <DetailsButton data={{
                color: Colors.WARNING,
                height: 51,
                width: 170,
                radius: 20,
                textSize: 22,
                onClick: () => {
                  setConfirmationText(`Are sure you want to delete your profile`);
                  setConfirmationTitle(`Delete Profile`);
                  setCallDeleteBook(false);
                  setIsConfirmationOpen(true);
                }
              }}>Delete Profile</DetailsButton>
            </ButtonsWrapper>
            <Checkbox data={{
              text: "Hide favourite books",
              isChecked: profileModel.settings?.hideFavouriteBooks ?? false,
              setCheck: (checked: boolean) => {
                setProfileModel({
                  ...profileModel,
                  settings: {
                    hideFavouriteBooks: checked,
                    hideEmail: profileModel.settings?.hideEmail ?? false
                  }
                })
              }
            }} />
            <Checkbox data={{
              text: "Hide email",
              isChecked: profileModel.settings?.hideEmail ?? false,
              setCheck: (checked: boolean) => {
                setProfileModel({
                  ...profileModel,
                  settings: {
                    hideFavouriteBooks: profileModel.settings?.hideFavouriteBooks ?? false,
                    hideEmail: checked
                  }
                })
              }
            }} />
          </>
        }
      </DetailsWrapper>
      <BooksWrapper>
        <TabsWrapper>
          <TabTitle onClick={() => {
            setCurrentTab(ProfileBookTabs.FavouriteBooks);
            setIsFavouriteOpen(true);
          }
          } isSelected={currentTab === ProfileBookTabs.FavouriteBooks}>Favourite books</TabTitle>
          <TabTitle onClick={() => {
            setCurrentTab(ProfileBookTabs.AuthoredBooks);
            setIsFavouriteOpen(false);
          }
          } isSelected={currentTab === ProfileBookTabs.AuthoredBooks}>Authored books</TabTitle>
          {authContext.user?.id === profileModel.id &&
            <>
              <TabTitle onClick={() => setCurrentTab(ProfileBookTabs.CurrentlyReading)} isSelected={currentTab === ProfileBookTabs.CurrentlyReading}>Reading</TabTitle>
              <TabTitle onClick={() => setCurrentTab(ProfileBookTabs.FinishedReading)} isSelected={currentTab === ProfileBookTabs.FinishedReading}>Finished</TabTitle>
            </>
          }
          {authContext.user?.id === profileModel.id && <TabTitle onClick={() => {
            setCurrentTab(ProfileBookTabs.EarlyAccess);
            setIsFavouriteOpen(false);
          }} isSelected={currentTab === ProfileBookTabs.EarlyAccess}>Early Access</TabTitle>}
        </TabsWrapper>
        {(currentTab === ProfileBookTabs.FavouriteBooks || currentTab === ProfileBookTabs.AuthoredBooks) &&
          <Books data={{
            addToFavourites: (bookId: string) => {
              addToFavourites(bookId)
            },
            favouriteBooksIds: profileModel.favouriteBookIds,
            books: isFavourteOpen ? favouriteBooks : authoredBooks,
            noBooksMessage: noBooksMessage,
            onClick: () => { },
            scaleBook: true,
            mediaMaxWidth: 945
          }} />}
        {(currentTab === ProfileBookTabs.CurrentlyReading || currentTab === ProfileBookTabs.FinishedReading) &&
          <BookWithPercentageList data={{
            books: progressBooks
          }} />}
        {currentTab === ProfileBookTabs.EarlyAccess &&
          <Books data={{
            addToFavourites: (bookId: string) => {
              addToFavourites(bookId)
            },
            favouriteBooksIds: profileModel.favouriteBookIds,
            books: earlyAcessBooks,
            noBooksMessage: "You are haven't been invited to any early access books",
            scaleBook: true,
            mediaMaxWidth: 945
          }} />}
      </BooksWrapper>
      <ConfirmationModal data={{
        isOpen: isConfirmationOpen,
        isExiting: isConfirmationExiting,
        ContentElement: CommonContentModalStyle,
        contentData: {
          width: "400px",
        },
        setOpen: setIsConfirmationOpen,
        setExiting: setIsConfirmationExiting,
      }}
        confirmationData={{
          text: confirmationText,
          modalTitle: confirmationTitle,
          funcToCall: () => {
            if (callDeleteBook) {
              confirmDeleteBook();
            } else {
              confirmDeleteProfile();
            }
          },
        }}>
      </ConfirmationModal>
    </Wrapper >
  );

  function setTextAreaCss() {
    const textAreaContainer = $(`#${textAreaId}`).find(".ql-container");
    textAreaContainer.css("background-color", Colors.BACKGROUND);
    if (authContext.user?.id !== profileModel.id && authContext.user?.role !== UserRole.Admin) {
      textAreaContainer.css("border-radius", "22px");
    }
  }
}

const DetailsButton = styled(Button)`
  @media only screen and (max-width: 455px) {
    width: auto;
    height: auto;
  }
`;

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

const TabsWrapper = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 10px;
  background-color: ${Colors.ACCENT};
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
  padding: 12px;
  overflow-x: auto;
`;

const TabTitle = styled.span`
  ${({ isSelected }: { isSelected: boolean }) => css`
    font-weight: ${isSelected && "bold"};
  `}
  cursor: pointer;
`

const BooksWrapper = styled.div`
  width: 100%;
  background-color: ${Colors.FOREGROUND};
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
  border-bottom-right-radius: 22px;
  border-bottom-left-radius: 22px;
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

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const TextArea = styled(Editor)`
  display: flex;
  flex-flow: column;
  height: 400px;
  width: 100%;
  @media only screen and (max-width: 888px) {
    height: 400px;
  }
`;

const Input = styled(CustomInput)`
  padding-left: 8px;
  width: 100%;
`;

const ProfileImage = styled.img`
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

const Books = styled(BookList)`
  width: 100%;
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 10px;
  /* margin: 12px; */
`;

const EnumDropdown = styled(NativeDropdown)`
  padding: 6px;
  font-size: ${22 / 16}rem;
  @media only screen and (max-width: 888px) {
    text-align: center;
  }
`

const Uploader = styled(ImageUploader)`
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Warning = styled.span`
  color: ${Colors.WARNING}
`

// const Checkbox = styled.input`
//   text-align: left;
//   width: 25px;
//   height: 25px;
//   &:checked {
//     background-color: ${Colors.ACCENT};
//   }
// `