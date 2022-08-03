/* eslint-disable camelcase */
import useSWR from "swr";

export const useCreateAccessToken = (
  createConversation,
  smsConversationCreated,
  createTokenForChat,
  userInfo
) => {
  const {
    sms_sid,
    whatsapp_sid,
    sms_chat_service_sid,
    whatsapp_chat_service_sid,
    chat_mode,
  } = userInfo || null;

  const { data: tokenData, error: tokenError } = useSWR(
    () => {
      if (
        createConversation &&
        createConversation.sid &&
        !smsConversationCreated
      ) {
        return `/api/create_access_token`;
      }

      if (sms_sid || whatsapp_sid) {
        return `/api/create_access_token`;
      }
      return null;
    },
    // the token needs the sms_chat_service_sid. NOT the sms_sid, NEVER the sms_sid
    (url) => {
      if (createConversation && createConversation.chatServiceSid) {
        return createTokenForChat(
          url,
          createConversation.chatServiceSid,
          `weg_insurance`
        );
      } else if (chat_mode === `sms`) {
        return createTokenForChat(url, sms_chat_service_sid, `weg_insurance`);
      } else {
        return createTokenForChat(
          url,
          whatsapp_chat_service_sid,
          `weg_insurance`
        );
      }
    }
  );

  return { tokenData, tokenError };
};
