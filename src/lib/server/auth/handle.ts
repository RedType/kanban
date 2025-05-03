import type { Handle } from '@sveltejs/kit';
import { setSessionTokenCookie, deleteSessionTokenCookie } from './cookie';
import { validateSessionToken } from './session';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session') ?? null;
  if (token === null) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(token);
  if (session !== null) {
    setSessionTokenCookie(token, session.expires);
  } else {
    deleteSessionTokenCookie();
  }

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};
