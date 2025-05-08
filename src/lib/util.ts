import { z } from 'zod';

export const isString = (s: unknown): s is string =>
  typeof s === 'string' || s instanceof String;

export const Email = z.string().email();
export type Email = z.infer<typeof Email>;
