const colors = {
  cyan: `focus:border-cyan-500 focus:ring-cyan-500`,
  sky: `focus:border-sky-500 focus:ring-sky-500`,
  blue: `focus:border-blue-500 focus:ring-blue-500`,
};

export const getRandomProperty = () => {
  const keys = Object.keys(colors);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return colors[randomKey];
};
