import Ajv from 'ajv';

export const ajv = new Ajv();

export const strToInt = (s: string) => (isNaN(parseInt(s)) ? 0 : parseInt(s));
