import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Splits an array into smaller chunks of a specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to be chunked.
 * @param {number} size - The size of each chunk.
 * @returns {T[][]} - An array of chunks, where each chunk is an array of size `size`.
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export const getAveragePrice = (prices: number[]) => {
  const sum = prices.reduce((acc, curr) => acc + curr, 0);
  return (sum / prices.length).toFixed(2);
};

export const getHighestPrice = (prices: number[]) => {
  return prices.reduce((acc, curr) => (acc > curr ? acc : curr));
};

export const getLowestPrice = (prices: number[]) => {
  return prices.reduce((acc, curr) => (acc < curr ? acc : curr));
};
