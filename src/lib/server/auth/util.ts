import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';

export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const FIFTEEN_DAYS = ONE_DAY * 15;
export const THIRTY_DAYS = ONE_DAY * 30;

export function generateSecureToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}
