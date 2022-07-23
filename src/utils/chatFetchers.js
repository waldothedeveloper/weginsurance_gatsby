export const chatFetchers = (userInfo) => {
  const { phone } = userInfo;

  const createNewConversation = () =>
    fetch(`/api/create_conversation`, {
      method: `POST`,
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": `application/json`,
      },
    }).then((res) => res.json());

  const addSMSParticipant = (url, createConversationSID) =>
    fetch(`/api/add_sms_participant`, {
      method: `POST`,
      body: JSON.stringify({
        phone: phone,
        sid: createConversationSID,
      }),
    }).then((res) => res.json());

  const addChatParticipant = (url, createConversationSID) =>
    fetch(`/api/add_chat_participant`, {
      method: `POST`,
      body: JSON.stringify({ sid: createConversationSID }),
    });

  const createTokenForChat = (url, createConversationSID, identity) =>
    fetch(`/api/create_access_token`, {
      method: `POST`,
      body: JSON.stringify({
        serviceSid: createConversationSID,
        identity: identity,
      }),
    }).then((res) => res.json());

  const checkDeliveryReceipt = (url, messages, userInfo) => {
    const { sid } = userInfo;
    const messageSids = messages
      .filter((m) => m.author === `weg_insurance`)
      .map((m) => m.sid);

    return fetch(`/api/sms_delivery_update`, {
      method: `POST`,
      body: JSON.stringify({ messageSids, userSID: sid }),
    }).then((res) => res.json());
  };

  return {
    createNewConversation,
    addSMSParticipant,
    addChatParticipant,
    createTokenForChat,
    checkDeliveryReceipt,
  };
};
