import { getRequestEvent } from '$app/server';

export const setSessionTokenCookie = (token: string, expires: Date): void => {
  const event = getRequestEvent();
  event.cookies.set('session', token, {
    expires,
    httpOnly: true, // only accessible by server
    path: '/', // accessible through whole app
    sameSite: 'lax',
    // secure: set by sveltekit
  });
};

export const deleteSessionTokenCookie = () => {
  const event = getRequestEvent();
  event.cookies.set('session', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    // secure: set by sveltekit
  });
};
