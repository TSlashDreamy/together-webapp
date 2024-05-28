import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { BsPeopleFill as FriendsIcon } from "react-icons/bs";
import { IoIosLink as CopyIcon } from "react-icons/io";
import { TbMoodSadSquint as NoFriendsIcon } from "react-icons/tb";

import AddFriendModal from "~/containers/add-friend-modal";
import Button from "~/components/button";
import FriendItem from "~/components/friend-item";
import PageWrapper from "~/components/page-wrapper";
import SectionHeading from "~/components/section-heading";
import Typography from "~/components/typography";
import SectionDescription from "~/components/section-description";
import CardWrapper from "~/components/card-wrapper";
import Modal from "~/components/modal";

import { useAppDispatch } from "~/hooks/useRedux";
import { useUser } from "~/hooks/useUser";
import { useModal } from "~/hooks/useModal";

import { showNotification } from "~/redux/slices/notificationSlice";

import { FriendStatus, IPerson, NotificationType } from "~/types";
import { ModalType } from "~/constants";
import * as S from "./styles";

const FriendsPage: FC = () => {
  const [processedFriend, setProcessedFriend] = useState<IPerson | null>(null);
  const { isOpen, showModal, hideModal } = useModal();
  const { isOpen: isRemoveOpen, showModal: showRemoveModal, hideModal: hideRemoveModal } = useModal();
  const { uid, friends, friendsRequest, outFriendsRequest, isProcessing, doFriendRequest, removeFriend } = useUser();
  const dispatch = useAppDispatch();

  const copyInviteId = () => {
    navigator.clipboard.writeText(`fid:${uid}`);
    dispatch(
      showNotification({
        content: "Your invite id was copied to clipboard",
        type: NotificationType.Success,
      })
    );
  };

  const handleFriendRequest = async (fid: string) => {
    const isSuccessful = await doFriendRequest(fid);
    isSuccessful && hideModal();
  };

  const handleRemoveFriend = (friend: IPerson) => {
    setProcessedFriend(friend);
    showRemoveModal();
  };

  const confirmRemoveFriend = async () => {
    await removeFriend(processedFriend as IPerson);
    hideRemoveModal();
    setTimeout(() => setProcessedFriend(null), 500);
  };

  return (
    <PageWrapper>
      <Modal
        isOpen={isRemoveOpen}
        modalType={ModalType.CONFIRM}
        modalProps={{
          isInProgress: isProcessing,
          message: `Do you really want to remove ${processedFriend?.name || "friend"} from your friend list?`,
          onCancel: hideRemoveModal,
          onConfirm: confirmRemoveFriend,
        }}
      />
      <AddFriendModal isOpen={isOpen} isLoading={isProcessing} modalProps={{ onCancel: hideModal }} doAddFriend={handleFriendRequest} />
      <SectionHeading headingClassNames="font-normal" title="Your friends list" Icon={FriendsIcon}>
        <Button primary onClick={showModal}>
          Add new friend
        </Button>
        <Button primary outline Icon={CopyIcon} onClick={copyInviteId}>
          Copy my invite id
        </Button>
      </SectionHeading>
      <div className={S.listWrapper}>
        {!outFriendsRequest?.length &&
          !friendsRequest?.length &&
          !friends?.length &&
          createPortal(
            <SectionDescription
              Icon={NoFriendsIcon}
              title="You don't have friends (YET!)"
              description="Looks like it's time to add a lot of your friends here!"
            />,
            document.getElementById("portal") as HTMLElement
          )}
        {outFriendsRequest && (
          <div className={S.sectionWrapper}>
            <Typography.SPAN className={S.sectionTitle}>Your requests (Waiting for response)</Typography.SPAN>
            <div className="flex items-center justify-center gap-[10px]">
              {outFriendsRequest.map((outRequest) => (
                <CardWrapper key={outRequest.id} className="p-[30px]">
                  <Typography.SPAN>User: {outRequest.name}</Typography.SPAN>
                </CardWrapper>
              ))}
            </div>
          </div>
        )}
        {friendsRequest && (
          <div className={S.sectionWrapper}>
            <Typography.SPAN className={S.sectionTitle}>Friend requests</Typography.SPAN>
            {friendsRequest.map((friendRequest) => (
              <FriendItem key={friendRequest.id} status={FriendStatus.Pending} user={friendRequest} removeFriend={handleRemoveFriend} />
            ))}
          </div>
        )}
        {friends && (
          <div className={S.sectionWrapper}>
            <Typography.SPAN className={S.sectionTitle}>Friends</Typography.SPAN>
            {friends.map((friend) => (
              <FriendItem key={friend.id} status={FriendStatus.Online} user={friend} removeFriend={handleRemoveFriend} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default FriendsPage;
