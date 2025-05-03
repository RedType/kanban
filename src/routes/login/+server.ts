import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { sendLoginEmail } from '$/lib/server/auth';
import type { RequestHandler } from './$types';

const Body = z.object({
  email: z.string().email(),
});
type Body = z.infer<typeof Body>;

export const POST: RequestHandler = async (event) => {
  let email: string;
  try {
    email = Body.parse(await event.request.json()).email;
  } catch (_) {
    return error(400, 'Invalid request');
  }

  await sendLoginEmail(email);
};
