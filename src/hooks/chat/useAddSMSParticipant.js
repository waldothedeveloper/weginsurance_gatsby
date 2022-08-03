import useSWR from "swr";

export const useAddSMSParticipant = (
  createConversation,
  conversationCreated,
  addSMSParticipant
) => {
  const { data: addSMSParticipantData, error: smsParticipantError } = useSWR(
    () => {
      if (
        createConversation &&
        createConversation.sms_sid &&
        !conversationCreated
      ) {
        return `/api/add_sms_or_whatsapp_participant`;
      }
      return null;
    },
    (url) => addSMSParticipant(url, createConversation?.sms_sid),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return { addSMSParticipantData, smsParticipantError };
};
