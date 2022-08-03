import { useEffect, useState } from "react";

export const useSelectedConversation = (conversations, participantInfo) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const { sms_id, whatsapp_id } = participantInfo;
    if (conversations && participantInfo) {
      setSelectedConversation(
        conversations.find(
          (it) => it.sms_sid === sms_id || it.whatsapp_id === whatsapp_id
        )
      );
    }

    return () => setSelectedConversation(null);
  }, [conversations, participantInfo]);

  return selectedConversation;
};
