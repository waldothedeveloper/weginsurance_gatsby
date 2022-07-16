import { useMemo, useState } from "react";

import { chatFetchers } from "../../utils/chatFetchers";
import { useAddSMSParticipant } from "./useAddSMSParticipant";
import { useCreateAccessToken } from "./useCreateAccessToken";
import { useCreateConversation } from "./useCreateConversation";
import { useDeliveryReceipt } from "./useDeliveryReceipt";
import { useInitializeConversationClient } from "./useInitializeConversationClient";
import { useJoinAndLeaveConversations } from "./useJoinAndLeaveConversations";
import { useSelectedConversation } from "./useSelectedConversation";
import { useSendAndReceiveMessages } from "./useSendAndReceiveMessages";
import { useUpdateUser } from "../../utils/fireStoreMethods";

export const useConfigureChat = (userInfo) => {
  const { updateUser } = useUpdateUser();
  const [newOrGetConversationData, setCreateOrGetConversation] = useState({
    token: null,
    selectedConversationSid: null,
    conversationCreated: false,
  });

  const { conversationCreated, token } = newOrGetConversationData;

  const { refDocumentId } = userInfo || null;

  const {
    createNewConversation,
    addSMSParticipant,
    createTokenForChat,
    checkDeliveryReceipt,
  } = chatFetchers(userInfo);

  /*
  DOWN HERE WE WILL IMPLEMENT NEW CONVERSATIONS LOGIC
  */

  const { createConversation } = useCreateConversation(
    userInfo,
    createNewConversation,
    conversationCreated
  );

  const { addSMSParticipantData } = useAddSMSParticipant(
    createConversation,
    conversationCreated,
    addSMSParticipant
  );

  /*
  we are getting the token from state instead of the tokenData hook, but this is on purpose to be able to refresh the token on the useCreateAccessToken hook when is about to expire or it already expired
  */

  const { conversationData } = useInitializeConversationClient(token);
  const { client, statusString } = conversationData;

  const { tokenData } = useCreateAccessToken(
    createConversation,
    conversationCreated,
    createTokenForChat,
    userInfo
  );

  /*
  SOME ADDITIONAL HOOKS NEEDED TO IMPLEMENT THE CHAT
  */
  const { conversations } = useJoinAndLeaveConversations(client);
  const selectedConversation = useSelectedConversation(conversations, userInfo);

  const { messages, newMessage, handleChange, handleSubmit, newMessageSent } =
    useSendAndReceiveMessages(selectedConversation);

  const { deliveryReceipt, allDelivered } = useDeliveryReceipt(
    messages,
    userInfo,
    checkDeliveryReceipt,
    newMessageSent
  );

  /*
  update the firebase user with the sid & chatServiceSid after creating 
  a new conversation only if a successful new conversation has been created
  */
  useMemo(() => {
    let active = true;
    if (
      active &&
      refDocumentId &&
      createConversation &&
      createConversation.status === 200 &&
      tokenData &&
      tokenData.status === 200
    ) {
      updateUser({
        refDocumentId: refDocumentId,
        sid: createConversation.sid,
        chat_service_sid: createConversation.chatServiceSid,
      })
        .then(() => {
          // console.log(`User updated successfully!`);
          setCreateOrGetConversation((oldData) => {
            return {
              ...oldData,
              conversationCreated: true,
              token: tokenData.token,
            };
          });
        })
        .catch((err) =>
          // if the user is NOT updated we have a problem
          // make sure you handle this error
          console.log(`Error trying to update the firebase user`, err)
        );
    }

    return () => (active = false);
  }, [createConversation, refDocumentId, tokenData, updateUser]);

  useMemo(() => {
    let active = true;
    if (userInfo && active) {
      setCreateOrGetConversation((oldData) => {
        return {
          ...oldData,
          conversationCreated: false,
        };
      });
    }

    return () => (active = false);
  }, [userInfo]);

  useMemo(() => {
    if (tokenData && tokenData.status === 200) {
      setCreateOrGetConversation((oldData) => {
        return {
          ...oldData,
          token: tokenData.token,
        };
      });
    }
  }, [tokenData]);

  //
  return {
    statusString,
    conversations,
    messages,
    newMessage,
    handleChange,
    handleSubmit,
    deliveryReceipt,
    allDelivered,
  };
};
