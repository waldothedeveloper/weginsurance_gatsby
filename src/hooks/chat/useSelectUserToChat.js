import { e164PhoneNumber } from "../../utils/e164phoneNumberFormat";
/* eslint-disable camelcase */
import { useState } from "react";

export const useSelectUserToChat = () => {
  const [participantInfo, setParticipantInfo] = useState({});

  const handleParticipantInfo = ({
    phone,
    sms_sid,
    refDocumentId,
    sms_chat_service_sid,
    chat_mode,
  }) => {
    {
      setParticipantInfo({
        // requestConversation: false,
        phone: e164PhoneNumber(phone),
        sms_sid,
        refDocumentId,
        sms_chat_service_sid,
        chat_mode,
      });
    }
  };

  return { participantInfo, handleParticipantInfo };
};
