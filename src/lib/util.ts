import { z } from 'zod';

export const isString = (s: unknown): s is string =>
  typeof s === 'string' || s instanceof String;

export const Email = z.string().email();
export type Email = z.infer<typeof Email>;

export const weekOf = (base: Date = new Date()) => {
  const start = new Date(base);
  // go to last sunday
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return { start, end };
};

export const monthOf = (base: Date = new Date()) => {
  const year = base.getFullYear();
  const month = base.getMonth();
  const start = new Date(year, month, 1);
  const endMonth = (month + 1) % 12;
  const endYear = endMonth === 0 ? year + 1 : year;
  const end = new Date(endYear, endMonth, 1);

  return { start, end };
};

export const yearOf = (base: Date = new Date()) => {
  const year = base.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  return { start, end };
};

export const dateFromTsString = (ts: string | null): Date | null => {
  if (ts === null) {
    return null;
  }

  let ms: number | null = null;
  try {
    ms = Number(ts);
  } catch (_) {
    return null;
  }

  return new Date(ms);
};

export const undate = (d: Date): string => d.toISOString().split('T')[0];
