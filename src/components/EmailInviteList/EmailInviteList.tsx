
import 'react-quill/dist/quill.snow.css';
import { CommonContentModalStyle } from '../../commonStyledStyles/CommonContentModalStyle';
import Modal from '../Modal/Modal';
import ICommonContentModalStyle from '../../interfaces/modal/ICommonContentModalStyle';
import Button from '../Button/Button';
import { Colors } from '../../Colors';
import styled, { css } from 'styled-components';
import { XCircle } from 'react-feather';
import IOverlayStyleData from '../../interfaces/modal/IOverlayStyleData';
import ICommonModalData from '../../interfaces/modal/ICommonModalData';
import CustomInput from '../Input/Input';
import { IoMdClose } from 'react-icons/io';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FcInvite } from 'react-icons/fc';
import { FormEvent, useEffect, useState } from 'react';
import { SearchEmailTabs } from '../../enums/SearchEmailTabs';
import { useUserService } from '../../hooks/useUserServiceContext';
import ISearchUserResponse from '../../interfaces/service/user/ISearchUserResponse';
import { useBookService } from '../../hooks/useBookServiceContext';
import { useParams } from 'react-router-dom';

export default function EmailInviteList({ data, ...delegated }: ICommonModalData<ICommonContentModalStyle, IOverlayStyleData>) {
  const [selectedTab, setSelectedTab] = useState<SearchEmailTabs>(SearchEmailTabs.Search);
  const [searchString, setSearchString] = useState("");
  const [foundUsers, setFoundUsers] = useState<ISearchUserResponse[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<ISearchUserResponse[]>([]);
  const userService = useUserService();
  const bookService = useBookService();
  const params = useParams();

  useEffect(() => {
    async function getInvitedUsers(): Promise<void> {
      if (params.bookId) {
        const book = await bookService.fetchBook(params.bookId);
        const users = await userService.searchUserIds({ userIds: book.inviteList });
        setInvitedUsers(users);
      }
    }

    getInvitedUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function findUsers(): Promise<void> {
    const users = await userService.searchUsers({
      email: searchString,
    });
    const filteredUser = users.filter(x => invitedUsers.findIndex(y => x.userId === y.userId) <= -1);
    setFoundUsers(filteredUser);
  }

  return (
    <InviteModal {...delegated} data={{
      isOpen: data.isOpen,
      isExiting: data.isExiting,
      ContentElement: CommonContentModalStyle,
      willPlayCloseAnimation: data.willPlayCloseAnimation,
      height: data.height,
      contentData: {
        width: data.contentData.width,
        maxScreenHeight: 580,
      },
      setOpen: data.setOpen,
      setExiting: data.setExiting,
    }}>
      <Wrapper>
        <HeaderWrapper>
          <Header>{data.modalTitle}</Header>
          <CloseIcon onClick={() => { data.setExiting(true) }}></CloseIcon>
        </HeaderWrapper>
        <span>Search email</span>
        <ItemWrapper onSubmit={(event: FormEvent) => {
          event.preventDefault();
          findUsers();
        }}>
          <CustomInput placeholder="carl@gmail.com" onValueChange={(value: string) => setSearchString(value)} />
          <AddArrow onClick={findUsers} size={30} />
        </ItemWrapper>
        <HideOverFlow>
          <TabsItemWrapper>
            <TabItem onClick={() => setSelectedTab(SearchEmailTabs.Search)} isSelected={selectedTab === SearchEmailTabs.Search}>Search</TabItem>
            <TabItem onClick={() => setSelectedTab(SearchEmailTabs.Invited)} isSelected={selectedTab === SearchEmailTabs.Invited}>Invited</TabItem>
          </TabsItemWrapper>
          <EmailListWrapper>
            {selectedTab === SearchEmailTabs.Search && foundUsers.map((user: ISearchUserResponse) => (
              <>
                <ItemWrapper key={user.userId}>
                  <span>{user.email}</span>
                  <CheckIcon onClick={() => {
                    setFoundUsers(foundUsers.filter(x => x.userId !== user.userId));
                    setInvitedUsers([...invitedUsers, user]);
                  }} size={20} />
                </ItemWrapper>
              </>
            ))}
            {(foundUsers.length <= 0 && selectedTab === SearchEmailTabs.Search) && <span>No users found</span>}

            {selectedTab === SearchEmailTabs.Invited && invitedUsers.map((user: ISearchUserResponse) => (
              <>
                <ItemWrapper key={user.userId}>
                  <span>{user.email}</span>
                  <XIcon onClick={() => {
                    setFoundUsers([...foundUsers, user]);
                    setInvitedUsers(invitedUsers.filter(x => x.userId !== user.userId));
                  }} size={20} />
                </ItemWrapper>
              </>
            ))}
            {(invitedUsers.length <= 0 && selectedTab === SearchEmailTabs.Invited) && <span>No invited users</span>}
          </EmailListWrapper>
        </HideOverFlow>
        <ButtonWrapper>
          <Button data={{
            color: Colors.ACCENT,
            height: 51,
            width: 100,
            radius: 20,
            textSize: 22,
            onClick: async () => {
              if (params.bookId) {
                await bookService.updateBook(params.bookId, {
                  userIds: invitedUsers.map(user => user.userId)
                });

                data.setExiting(true);
              }
            }
          }}>Save</Button>
          <Button data={{
            color: Colors.WARNING,
            height: 51,
            width: 100,
            radius: 20,
            textSize: 22,
            onClick: () => { data.setExiting(true) }
          }}>Close</Button>
        </ButtonWrapper>
      </Wrapper>
    </InviteModal>
  );
}

const InviteModal = styled(Modal<ICommonContentModalStyle, IOverlayStyleData>)`
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: 500px;
  @media only screen and (max-height: 580px) {
    height: 100%;
  }
`

const XIcon = styled(IoMdClose)`
  cursor: pointer;
  color: ${Colors.WARNING};
`

const CheckIcon = styled(FcInvite)`
  cursor: pointer;
  color: ${Colors.ACCENT};
`

const AddArrow = styled(BsFillArrowRightCircleFill)`
  cursor: pointer;
  color: ${Colors.ACCENT};
`

const EmailListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  overflow: auto;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${Colors.FOREGROUND};
  border-radius: 20px;
  margin-right: 10px;
`;

const ItemWrapper = styled.form`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const TabItem = styled.span`
  cursor: pointer;
  ${({ isSelected }: { isSelected: boolean }) => css`
    font-weight: ${isSelected && "bold"};
  `}
`;

const TabsItemWrapper = styled(ItemWrapper)`
  background-color: ${Colors.ACCENT};
  border-top-left-radius:20px;
  border-top-right-radius:20px;
  width: 100%;
  justify-content: center;
  gap: 18px;
  height: 30px;
`

const HideOverFlow = styled.div`
  background-color: ${Colors.FOREGROUND};
  border-radius: 20px;
  width: 80%;
  height: 100%;
  overflow: hidden;
`

const HeaderWrapper = styled.div`
  background-color: ${Colors.ACCENT};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;

  @media only screen and (max-width: 220px) {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
`

const Header = styled.h2`
    font-size: ${32 / 16}rem;
    margin: auto;
`

const CloseIcon = styled(XCircle)`
  color: ${Colors.WARNING};
  
  width: 36px;
  height: 36px;
  margin-right: 4px;
  cursor: pointer;
  position: absolute;
  @media only screen and (max-width: 220px) {
    position: revert;
    min-width: 36px;
  }
`;


const ButtonWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
    gap: 24px;
`