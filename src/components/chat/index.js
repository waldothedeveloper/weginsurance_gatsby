import { ChatWall } from "./wall";
import { Error } from "./error";
import { NoUserSelected } from "./noUserSelected";
import React from "react";
import { SharedScreen } from "../shared/screen";
import { Spinner } from "../shared/spinner";
import { Transition } from "@headlessui/react";
import { UserScreenLoader } from "../shared/loaders/usersScreenLoader";
import { UsersList } from "./usersList";
import { useConfigureChat } from "../../hooks/chat/useConfigureChat";
import { useReadUsers } from "../../hooks/user/useReadUsers";
import { useSelectUserToChat } from "../../hooks/chat/useSelectUserToChat";

//
export const Chat = () => {
  const { users } = useReadUsers();
  const { participantInfo, handleParticipantInfo } = useSelectUserToChat();

  const { statusString, messages, newMessage, handleChange, handleSubmit } =
    useConfigureChat(participantInfo);

  return (
    <SharedScreen
      leftPanel={
        <Transition
          show={true}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {users && users.length > 0 ? (
            <div className="flex flex-1 flex-col overflow-hidden">
              <UsersList
                users={users}
                chooseParticipant={handleParticipantInfo}
              />
            </div>
          ) : users && users.length === 0 ? (
            <div>WE NEED SOMETHING HERE</div>
          ) : (
            <UserScreenLoader chat={true} />
          )}
        </Transition>
      }
      rightPanel={
        statusString === `You are connected.` ? (
          <ChatWall
            messages={messages}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            newMessage={newMessage}
          />
        ) : statusString === `Connecting to Twilio…` ? (
          <Spinner>Conectando el chat...</Spinner>
        ) : statusString === `Failed to connect.` ? (
          <Error />
        ) : statusString === `Disconnecting from Twilio…` ? (
          <Spinner>Desconectando el chat...</Spinner>
        ) : (
          <NoUserSelected />
        )
      }
    />
  );
};
