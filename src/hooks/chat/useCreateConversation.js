/*  eslint-disable camelcase */
import useSWR from "swr";

export const useCreateConversation = (
  userInfo,
  createNewConversation,
  smsConversationCreated,
  whatsappConversationCreated
) => {
  const { sms_sid, whatsapp_sid, chat_mode } = userInfo;

  const { data: createConversation } = useSWR(() => {
    if (chat_mode === `sms` && !sms_sid && !smsConversationCreated) {
      return `/api/create_conversation`;
    } else if (
      chat_mode === `whatsapp` &&
      !whatsapp_sid &&
      !whatsappConversationCreated
    ) {
      return `/api/create_conversation`;
    }
    return null;
  }, createNewConversation);

  return { createConversation };
};
