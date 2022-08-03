import PropTypes from "prop-types";
import React from "react";
//
export const ModeButtons = ({ person, chooseParticipant }) => (
  <span className="relative z-0 mt-2 inline-flex rounded-md shadow-sm">
    <button
      onClick={() => {
        chooseParticipant({
          phone: person.phone,
          sms_sid: person.sms_sid || null,
          refDocumentId: person.refDocumentId,
          sms_chat_service_sid: person.sms_chat_service_sid || null,
          chat_mode: `sms`,
        });
      }}
      type="button"
      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
    >
      SMS
    </button>

    <button
      onClick={() => {
        chooseParticipant({
          phone: person.phone,
          sms_sid: person.sms_sid || null,
          refDocumentId: person.refDocumentId,
          whatsapp_chat_service_sid: person.whatsapp_chat_service_sid || null,
          chat_mode: `whatsapp`,
        });
      }}
      type="button"
      className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
    >
      WhatsApp
    </button>
  </span>
);

ModeButtons.propTypes = {
  person: PropTypes.object.isRequired,
  chooseParticipant: PropTypes.func.isRequired,
};
