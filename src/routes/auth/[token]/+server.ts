import { error, redirect } from '@sveltejs/kit';
import {
  createSession,
  generateSecureToken,
  setSessionTokenCookie,
  validateLoginToken,
} from '$/lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
  const { result, user } = await validateLoginToken(event.params.token);
  if (result === 'missing') {
    return error(404, 'Invalid link');
  } else if (result === 'expired') {
    return error(401, 'Link has expired, please try again');
  }

  // create session
  const sessionToken = generateSecureToken();
  const session = await createSession(sessionToken, user.id);

  setSessionTokenCookie(sessionToken, session.expires);

  return redirect(303, '/');
};
