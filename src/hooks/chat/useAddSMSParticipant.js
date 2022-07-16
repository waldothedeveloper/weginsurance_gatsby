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
        createConversation.sid &&
        !conversationCreated
      ) {
        return `/api/add_sms_participant`;
      }
      return null;
    },
    (url) => addSMSParticipant(url, createConversation?.sid),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return { addSMSParticipantData, smsParticipantError };
};
