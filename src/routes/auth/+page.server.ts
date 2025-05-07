import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { deleteSessionTokenCookie, sendLoginEmail } from '$/lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
  login: async (event) => {
    let email;
    try {
      const data = (await event.request.formData()).get('email');
      email = z.string().email().parse(data);
    } catch (_) {
      return fail(400, { field: 'email', message: 'Invalid email' });
    }

    await sendLoginEmail(email);

    return redirect(301, '/');
  },
  logout: async () => {
    deleteSessionTokenCookie();
    return redirect(301, '/');
  },
};
