import { getRandomProperty } from "../../utils/getRandomProperty";
import { useState } from "react";
export const useRandomColor = () => {
  const [color, setColor] = useState(getRandomProperty());

  const handleFocus = () => setColor(getRandomProperty());

  return { color, handleFocus };
};
