export const getRandomNum = (min: number = 0, max: number = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function getKey<T, K extends keyof T>(key: K): K {
  return key;
}