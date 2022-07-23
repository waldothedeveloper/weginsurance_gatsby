import {
  ArrowCircleRightIcon,
  EmojiHappyIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";

import ProTypes from "prop-types";
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

//
export const MessageEnhancements = ({ handleSubmit }) => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="inline-flex items-center px-2 text-sm font-medium text-gray-400">
      <button
        className="group sticky top-0 h-10 w-10 self-stretch rounded-full p-2 text-gray-400 hover:text-red-600 focus:outline-none"
        onClick={(event) => handleSubmit(event, editor)}
      >
        <ArrowCircleRightIcon className="h-6 w-6 text-gray-400" />
      </button>
      <button
        className="group sticky top-0 h-10 w-10 self-stretch rounded-full p-2 text-gray-400 hover:text-blue-600 focus:outline-none"
        type="button"
        // onClick={handleEmojiToggle}
      >
        <EmojiHappyIcon className="h-6 w-6 text-gray-400" />
      </button>
      <button
        className="group sticky top-0 h-10 w-10 self-stretch rounded-full p-2 text-gray-400 hover:text-blue-600 focus:outline-none"
        type="button"
        // onClick={handleGIFtoggle}
      >
        <PaperClipIcon className="h-6 w-6 text-gray-400" />
      </button>
    </div>
  );
};

MessageEnhancements.propTypes = {
  handleSubmit: ProTypes.func.isRequired,
};
