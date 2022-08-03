import { useEffect, useState } from "react";

export const useJoinAndLeaveConversations = (client) => {
  const [conversations, setConversations] = useState([]);
  // console.log(`conversations: `, conversations);

  useEffect(() => {
    if (client) {
      client.on(`connectionError`, (error) => {
        console.log(`CONVERSATION JOIN & LEAVE ERROR: `, error);
      });

      // client.on(`conversationJoined`, (conversation) => {
      //   console.log(`do I EVER GET HERE?`, conversation);
      //   setConversations((oldData) => [...oldData, conversation]);
      // });

      client.on(`conversationLeft`, (thisConversation) => {
        setConversations((oldData) => [
          oldData.filter((it) => it !== thisConversation),
        ]);
      });
    }

    return () => {
      setConversations([]);
    };
  }, [client]);

  return { conversations };
};
