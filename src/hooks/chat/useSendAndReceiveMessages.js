import { $createParagraphNode, $getRoot } from "lexical";
import { useEffect, useState } from "react";

//
export const useSendAndReceiveMessages = (selectedConversation) => {
  const [conversationMessage, setConversationMessage] = useState({
    newMessage: ``,
    messages: [],
    loadingState: `initializing`,
    newMessageSent: false,
  });

  const { newMessage, messages, newMessageSent } = conversationMessage;
  // console.log(`newMessage: `, newMessage);

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

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();

      if (root.getTextContent().length > 0) {
        setConversationMessage((oldData) => {
          return {
            ...oldData,
            newMessage: root.getTextContent(),
          };
        });
      }
    });
  };

  const sendMessage = async () => {
    if (selectedConversation && newMessage && newMessage.length > 0) {
      return await selectedConversation.sendMessage(newMessage);
    }

    return null;
  };

  const handleSubmit = (event, editor) => {
    event.preventDefault();

    sendMessage()
      .then(() => {
        editor.update(() => {
          const root = $getRoot();
          const paragraph = $createParagraphNode();
          root.clear();
          root.append(paragraph);
        });

        //
        setConversationMessage((oldData) => {
          return {
            ...oldData,
            newMessage: ``,
            newMessageSent: true,
          };
        });
      })
      .catch((err) => {
        console.log(`Couldn't send message`, err);
      });
  };

  return { messages, newMessage, newMessageSent, handleChange, handleSubmit };
};
