import useSWR from "swr";

export const useAddChatParticipant = (
  createConversation,
  addChatParticipant
) => {
  const { data: addChatParticipantData, error: addChatParticipantError } =
    useSWR(
      () => {
        if (createConversation && createConversation.sid) {
          return `/api/add_chat_participant`;
        }
        return null;
      },
      (url) => addChatParticipant(url, createConversation?.sid),
      { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

  return { addChatParticipantData, addChatParticipantError };
};
