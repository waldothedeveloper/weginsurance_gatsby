import { DoubleCheck, SingleCheck } from "./singleAndDoubleCheck";
import React, { useEffect, useRef } from "react";

import { FadeInWhenVisible } from "../shared/fadeInWhenVisible";
import { MessageForm } from "./messageForm";
import PropTypes from "prop-types";
import { ZeroMessages } from "./zeroMessages";

const options = {
  hour: `numeric`,
  minute: `numeric`,
  hour12: true,
  day: `numeric`,
  month: `long`,
  year: `numeric`,
};
export const ChatWall = ({
  handleChange,
  handleSubmit,
  newMessage,
  messages,
  deliveryReceipt,
  allDelivered,
}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: `smooth`,
      block: `end`,
      inline: `nearest`,
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <FadeInWhenVisible>
      <div className="flex flex-col bg-stone-50">
        <div className="h-[77vh] flex-none overflow-y-scroll px-6 py-6">
          <ul>
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((m) => {
                if (m.author === `weg_insurance`) {
                  return (
                    <li key={m.index} className="flex flex-row-reverse">
                      <div className="m-2 flex w-72 flex-col rounded-lg bg-sky-500 px-5 pb-1 pt-3 text-base font-medium text-white">
                        {m.body}
                        <div className="mt-2 flex justify-end text-xs text-stone-100">
                          {m.dateCreated.toLocaleString(`es-ES`, options)}
                        </div>
                        <div className="flex items-center justify-end text-xs font-light text-slate-100">
                          {allDelivered ? (
                            <DoubleCheck />
                          ) : (
                            <span className="flex items-center justify-center">
                              {Array.isArray(deliveryReceipt) &&
                              deliveryReceipt.filter(
                                (elem) => elem.value[0]?.messageSid === m.sid
                              )[0]?.value[0]?.status === `delivered` ? (
                                <DoubleCheck />
                              ) : (
                                <SingleCheck />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                      <div ref={messagesEndRef} />
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={m.index}
                      className="m-2 flex w-72 flex-col rounded-lg bg-stone-400 px-5 pb-1 pt-3 text-base font-medium text-white"
                    >
                      {m.body}

                      <div className="mt-2 flex justify-end text-xs text-stone-100">
                        {m.dateCreated.toLocaleString(`es-ES`, options)}
                      </div>
                      <div ref={messagesEndRef} />
                    </li>
                  );
                }
              })
            ) : (
              <ZeroMessages />
            )}
          </ul>
        </div>
        <MessageForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newMessage={newMessage}
        />
      </div>
    </FadeInWhenVisible>
  );
};

ChatWall.propTypes = {
  messages: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newMessage: PropTypes.string.isRequired,
  deliveryReceipt: PropTypes.oneOfType([PropTypes.array, undefined]),
  allDelivered: PropTypes.bool.isRequired,
};
