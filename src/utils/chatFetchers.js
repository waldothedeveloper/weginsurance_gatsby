export const chatFetchers = (userInfo) => {
  const { phone, chat_mode } = userInfo;

  const createNewConversation = () =>
    fetch(`/api/create_conversation`, {
      method: `POST`,
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": `application/json`,
      },
    }).then((res) => res.json());

  const addSmsOrWhatsAppParticipant = (url, createConversationSID) =>
    fetch(`/api/add_sms_or_whatsapp_participant`, {
      method: `POST`,
      body: JSON.stringify({
        phone: phone,
        sid: createConversationSID,
        chat_mode: chat_mode,
      }),
    }).then((res) => res.json());

  const addChatParticipant = (url, createConversationSID) =>
    fetch(`/api/add_chat_participant`, {
      method: `POST`,
      body: JSON.stringify({
        identity: `weginsurance_agent`,
        sms_sid: createConversationSID,
      }),
    }).then((res) => res.json());

  const createTokenForChat = (url, createConversationSID, identity) =>
    fetch(`/api/create_access_token`, {
      method: `POST`,
      body: JSON.stringify({
        serviceSid: createConversationSID,
        identity,
      }),
    }).then((res) => res.json());

  const checkDeliveryReceipt = (url, messages, userInfo) => {
    const { sms_sid } = userInfo;
    const messageSids = messages
      .filter((m) => m.author === `weg_insurance`)
      .map((m) => m.sms_sid);

    return fetch(`/api/sms_delivery_update`, {
      method: `POST`,
      body: JSON.stringify({ messageSids, userSID: sms_sid }),
    }).then((res) => res.json());
  };

  return {
    createNewConversation,
    addSmsOrWhatsAppParticipant,
    createTokenForChat,
    checkDeliveryReceipt,
    addChatParticipant,
  };
};
