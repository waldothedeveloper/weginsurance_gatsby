// import { EmojiNode } from "./nodes/EmojiNode";
import tailwindTheme from "./themes/tailwindTheme";
const editorConfig = {
  theme: tailwindTheme,
  onError(error) {
    throw error;
  },
  // nodes: [EmojiNode],
};

export default editorConfig;
