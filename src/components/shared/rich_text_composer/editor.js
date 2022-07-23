import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { MessageEnhancements } from "./messageEnhancements";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import PropTypes from "prop-types";
import React from "react";
import editorConfig from "./editorConfig";

export const Editor = ({ handleChange, handleSubmit }) => (
  <div className="relative mt-1">
    <LexicalComposer initialConfig={editorConfig}>
      <div className="absolute right-0 flex items-center">
        <MessageEnhancements handleSubmit={handleSubmit} />
      </div>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="outline-none" />}
      />

      <OnChangePlugin onChange={handleChange} />

      <HistoryPlugin />
    </LexicalComposer>
  </div>
);

Editor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
