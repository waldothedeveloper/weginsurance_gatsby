/* eslint-disable camelcase */
import { useMemo, useState } from "react";

import { chatFetchers } from "../../utils/chatFetchers";
import { useAddChatParticipant } from "./useAddChatParticipant";
import { useAddSMSOrWhatsAppParticipant } from "./useAddSMSOrWhatsAppParticipant";
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
    smsConversationCreated: false,
    whatsappConversationCreated: false,
  });

  const { smsConversationCreated, whatsappConversationCreated, token } =
    newOrGetConversationData;

  const { refDocumentId, chat_mode } = userInfo || null;

  const {
    createNewConversation,
    addSmsOrWhatsAppParticipant,
    createTokenForChat,
    checkDeliveryReceipt,
    addChatParticipant,
  } = chatFetchers(userInfo);

  /*
  DOWN HERE WE WILL IMPLEMENT NEW CONVERSATIONS LOGIC
  */

  const { createConversation } = useCreateConversation(
    userInfo,
    createNewConversation,
    smsConversationCreated,
    whatsappConversationCreated
  );

  const { addSMSorWhatsAppParticipantData, smsorWhatsAppParticipantError } =
    useAddSMSOrWhatsAppParticipant(
      createConversation,
      addSmsOrWhatsAppParticipant,
      chat_mode
    );

  const { addChatParticipantData, addChatParticipantError } =
    useAddChatParticipant(createConversation, addChatParticipant);

  const { conversationData } = useInitializeConversationClient(token);
  const { client, statusString } = conversationData;

  const { tokenData, tokenError } = useCreateAccessToken(
    createConversation,
    smsConversationCreated,
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
  update the firebase user with the sms_sid & chatServiceSid after creating 
  a new conversation only if a successful new conversation has been created
  */
  useMemo(() => {
    let active = true;
    if (
      active &&
      refDocumentId &&
      createConversation &&
      createConversation.status === 200
    ) {
      if (chat_mode === `sms`) {
        updateUser({
          refDocumentId: refDocumentId,
          sms_sid: createConversation.sid,
          sms_chat_service_sid: createConversation.chatServiceSid,
        })
          .then(() => {
            console.log(`SMS User updated successfully!`);
            setCreateOrGetConversation((oldData) => {
              return {
                ...oldData,
                smsConversationCreated: true,
                // token: tokenData.token,
              };
            });
          })
          .catch((err) =>
            // if the user is NOT updated we have a problem
            // make sure you handle this error
            console.log(`Error trying to update the firebase user`, err)
          );
      }

      if (chat_mode === `whatsapp`) {
        //
        updateUser({
          refDocumentId: refDocumentId,
          whatsapp_sid: createConversation.sid,
          whatsapp_chat_service_sid: createConversation.chatServiceSid,
        })
          .then(() => {
            console.log(`WhatsApp User updated successfully!`);
            setCreateOrGetConversation((oldData) => {
              return {
                ...oldData,
                whatsappConversationCreated: true,
                // token: tokenData.token,
              };
            });
          })
          .catch((err) =>
            // if the user is NOT updated we have a problem
            // make sure you handle this error
            console.log(`Error trying to update the firebase user`, err)
          );
      }
    }

    return () => (active = false);
  }, [createConversation, refDocumentId, updateUser, chat_mode]);

  useMemo(() => {
    let active = true;
    if (userInfo && active) {
      setCreateOrGetConversation((oldData) => {
        return {
          ...oldData,
          smsConversationCreated: false,
          whatsappConversationCreated: false,
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
