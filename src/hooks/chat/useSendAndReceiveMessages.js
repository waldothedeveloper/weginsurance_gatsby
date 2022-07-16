import { useEffect, useState } from "react";

export const useSendAndReceiveMessages = (selectedConversation) => {
  const [conversationMessage, setConversationMessage] = useState({
    newMessage: ``,
    messages: [],
    loadingState: `initializing`,
    newMessageSent: false,
  });

  const { newMessage, messages, newMessageSent } = conversationMessage;

  useEffect(() => {
    if (selectedConversation) {
      selectedConversation
        .getMessages()
        .then((messagePaginator) => {
          setConversationMessage((oldData) => {
            return {
              ...oldData,
              messages: messagePaginator.items,
              loadingState: `ready`,
            };
          });
        })
        .catch((err) => {
          console.log(`Couldn't not fetch messages IMPLEMENT RETRY`, err);
          setConversationMessage((oldData) => {
            return {
              ...oldData,
              loadingState: `error`,
            };
          });
        });

      const addMessageToConversation = (message) =>
        setConversationMessage((oldState) => {
          const { messages } = oldState;
          const currMessage = messages.find((m) => m.sid === message.sid);

          if (!currMessage) {
            return {
              ...oldState,
              messages: [...messages, message],
            };
          } else {
            return oldState;
          }
        });

      selectedConversation.on(`messageAdded`, (m) =>
        addMessageToConversation(m)
      );
    }

    return () => {
      // console.log(`unmounting useSendAndReceiveMessages`);
      setConversationMessage((oldData) => {
        return {
          ...oldData,
          newMessage: ``,
          newMessageSent: false,
          messages: [],
          loadingState: `initializing`,
        };
      });
    };
  }, [selectedConversation]);

  const handleChange = (e) => {
    const { value } = e.target;
    setConversationMessage((oldData) => {
      return {
        ...oldData,
        newMessage: value,
      };
    });
  };

  const sendMessage = async () => {
    if (selectedConversation && newMessage) {
      return await selectedConversation.sendMessage(newMessage);
    } else {
      throw new Error(`No new message to send`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage()
      .then(() =>
        setConversationMessage((oldData) => {
          return {
            ...oldData,
            newMessage: ``,
            newMessageSent: true,
          };
        })
      )
      .catch((err) => {
        console.log(`Couldn't send message`, err);
      });
  };

  return { messages, newMessage, newMessageSent, handleChange, handleSubmit };
};
