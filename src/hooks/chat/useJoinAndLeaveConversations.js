import { useMemo, useState } from "react";

export const useJoinAndLeaveConversations = (client) => {
  const [conversations, setConversations] = useState([]);

  useMemo(() => {
    let active = true;
    if (client && active) {
      client.on(`connectionError`, (error) => {
        // console.log(`CONVERSATION JOIN & LEAVE ERROR: `, error);
      });

      client.on(`conversationJoined`, (conversation) => {
        setConversations((oldData) => [...oldData, conversation]);
      });

      client.on(`conversationLeft`, (thisConversation) => {
        setConversations((oldData) => [
          oldData.filter((it) => it !== thisConversation),
        ]);
      });
    }

    return () => {
      setConversations([]);
      active = false;
    };
  }, [client]);

  return { conversations };
};
