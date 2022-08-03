import { useEffect, useState } from "react";

import { Client as ConversationsClient } from "@twilio/conversations";

export const useInitializeConversationClient = (token) => {
  const [conversationData, setConversationData] = useState({
    statusString: null,
    conversationsReady: false,
    client: null,
    tokenAboutToExpire: false,
    tokenExpired: false,
  });

  useEffect(() => {
    let active = true;
    const initializeConversation = () => {
      const client = new ConversationsClient(token);

      setConversationData((oldData) => {
        return {
          ...oldData,
          client,
          tokenAboutToExpire: false,
          tokenExpired: false,
        };
      });

      //
      client.on(`connectionStateChanged`, (state) => {
        if (state === `connecting`)
          setConversationData((oldData) => {
            return {
              ...oldData,
              statusString: `Connecting to Twilio…`,
              status: `default`,
            };
          });
        if (state === `connected`) {
          setConversationData((oldData) => {
            return {
              ...oldData,
              statusString: `You are connected.`,
              status: `success`,
            };
          });
        }
        if (state === `disconnecting`)
          setConversationData((oldData) => {
            return {
              ...oldData,
              statusString: `Disconnecting from Twilio…`,
              conversationsReady: false,
              status: `default`,
            };
          });
        if (state === `disconnected`)
          setConversationData((oldData) => {
            return {
              ...oldData,
              statusString: `Disconnected.`,
              conversationsReady: false,
              status: `warning`,
            };
          });
        if (state === `denied`)
          setConversationData((oldData) => {
            return {
              ...oldData,
              statusString: `Failed to connect.`,
              conversationsReady: false,
              status: `error`,
            };
          });
      });

      client.on(`conversationJoined`, (conversation) => {
        console.log(`do I EVER GET HERE?`, conversation);
        // setConversations((oldData) => [...oldData, conversation]);
      });

      /*
      NEED TO LEARN HOW TO DO THIS PROPERLY
      */
      // client.on(`tokenAboutToExpire`, () => {
      //   console.log(`Token about to expire`);
      //   setConversationData((oldData) => {
      //     return {
      //       ...oldData,
      //       tokenAboutToExpire: true,
      //     };
      //   });
      // });

      // client.on(`tokenExpired`, () => {
      //   console.log(`Token expired`);
      //   setConversationData((oldData) => {
      //     return {
      //       ...oldData,
      //       tokenExpired: true,
      //     };
      //   });
      // });
    };

    if (token && active) initializeConversation();

    return () => {
      setConversationData({
        statusString: null,
        conversationsReady: false,
        client: null,
        tokenAboutToExpire: false,
        tokenExpired: false,
      });
      active = false;
    };
  }, [token]);

  return { conversationData };
};
