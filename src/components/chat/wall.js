import React, { useEffect, useRef } from "react";

import { CheckIcon } from "@heroicons/react/outline";
import { Editor } from "../shared/rich_text_composer/editor";
import { FadeInWhenVisible } from "../shared/fadeInWhenVisible";
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
}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: `smooth` });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <FadeInWhenVisible>
      <div className="flex flex-col">
        <div className="h-[78vh] flex-none overflow-y-scroll px-6">
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
                        <div className="mt-1 flex items-center justify-end text-xs font-light text-slate-100">
                          <CheckIcon className="h-5 w-5 text-slate-100" />
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

        <Editor handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </FadeInWhenVisible>
  );
};

ChatWall.propTypes = {
  messages: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newMessage: PropTypes.string.isRequired,
};
