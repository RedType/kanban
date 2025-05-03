import { redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie } from '$/lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
  deleteSessionTokenCookie();
  return redirect(303, '/');
};
