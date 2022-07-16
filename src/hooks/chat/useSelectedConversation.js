import { useEffect, useState } from "react";

export const useSelectedConversation = (conversations, participantInfo) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    if (conversations && participantInfo) {
      setSelectedConversation(
        conversations.find((it) => it.sid === participantInfo.sid)
      );
    }

    return () => setSelectedConversation(null);
  }, [conversations, participantInfo]);

  return selectedConversation;
};
