import Ajv from 'ajv';

export const ajv = new Ajv();

function getRandomElement<T>(array: T[]): T {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
}

export function doSomeHeavyTask() {
  const ms = getRandomElement<number>([
    100, 150, 200, 300, 600, 1000, 1500, 2500,
  ]);

  const shouldTrowError = getRandomElement<number>([1, 2, 3, 4]) === 4;

  if (shouldTrowError) {
    const randomError = getRandomElement<string>([
      'DB Payment Failure',
      'DM Server is Down',
      'Access Denied',
      'Not Found Error',
    ]);

    throw new Error(randomError);
  }

  return new Promise((resolve) => setTimeout(() => resolve(ms), ms));
}

export const strToInt = (s: string) => (isNaN(parseInt(s)) ? 0 : parseInt(s));
