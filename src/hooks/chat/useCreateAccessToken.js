import useSWR from "swr";

export const useCreateAccessToken = (
  createConversation,
  conversationCreated,
  createTokenForChat,
  userInfo
) => {
  const { sid } = userInfo || null;
  const { data: tokenData, error: tokenError } = useSWR(
    () => {
      if (sid) {
        return `/api/create_access_token`;
      } else if (
        createConversation &&
        createConversation.sid &&
        !conversationCreated
      ) {
        return `/api/create_access_token`;
      }
      return null;
    },
    // the token needs the chat_service_sid. NOT the sid, NEVER the sid
    (url) =>
      createTokenForChat(
        url,
        userInfo.chat_service_sid || createConversation.chatServiceSid,
        `weg_insurance`
      )
  );

  return { tokenData, tokenError };
};
