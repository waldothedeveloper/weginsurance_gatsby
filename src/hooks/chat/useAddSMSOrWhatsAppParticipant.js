/* eslint-disable camelcase */
import useSWR from "swr";

export const useAddSMSOrWhatsAppParticipant = (
  createConversation,
  addSmsOrWhatsAppParticipant,
  chat_mode
) => {
  const {
    data: addSMSorWhatsAppParticipantData,
    error: smsorWhatsAppParticipantError,
  } = useSWR(
    () => {
      if (createConversation && createConversation.sid) {
        return `/api/add_sms_or_whatsapp_participant`;
      }
      return null;
    },
    (url) =>
      addSmsOrWhatsAppParticipant(url, createConversation?.sid, chat_mode),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return { addSMSorWhatsAppParticipantData, smsorWhatsAppParticipantError };
};
