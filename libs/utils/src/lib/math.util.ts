/** Clamps a value to be between two numbers, by default 0 and 100. */
export const clamp = (v: number, min = 0, max = 100): number => {
  return Math.max(min, Math.min(max, v));
};

/** Returns the sum of all `numbers`. */
export const sum = (...numbers: number[]): number => {
  return numbers.reduce((x, y) => x + y, 0);
};
