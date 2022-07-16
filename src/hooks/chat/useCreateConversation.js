import useSWR from "swr";

export const useCreateConversation = (
  userInfo,
  createNewConversation,
  conversationCreated
) => {
  const { sid, requestConversation } = userInfo;
  const { data: createConversation } = useSWR(() => {
    if (requestConversation && sid === null && !conversationCreated) {
      return `/api/create_conversation`;
    }
    return null;
  }, createNewConversation);

  return { createConversation };
};
