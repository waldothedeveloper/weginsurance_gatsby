import { e164PhoneNumber } from "../../utils/e164phoneNumberFormat";
/* eslint-disable camelcase */
import { useState } from "react";

export const useSelectUserToChat = () => {
  const [participantInfo, setParticipantInfo] = useState({
    requestConversation: false,
  });

  const handleParticipantInfo = ({
    phone,
    sid,
    refDocumentId,
    chat_service_sid,
  }) => {
    const oldSID = participantInfo.sid || null;

    if (oldSID && sid && oldSID !== sid) {
      setParticipantInfo({
        requestConversation: true,
        phone: e164PhoneNumber(phone),
        sid,
        refDocumentId,
        chat_service_sid,
      });
    } else {
      setParticipantInfo({
        requestConversation: false,
        phone: e164PhoneNumber(phone),
        sid,
        refDocumentId,
        chat_service_sid,
      });
    }
  };

  return { participantInfo, handleParticipantInfo };
};
