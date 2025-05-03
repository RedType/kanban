import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { deleteSessionTokenCookie, sendLoginEmail } from '$/lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async event => {
  const { session, user } = event.locals;
  return { session, user };
};

export const actions: Actions = {
  login: async event => {
    const email = event.formData.get('email');
    try {
      z.string().email().parse(email);
    } catch (_) {
      return fail(400, { field: 'email', message: 'Invalid email' });
    }

    await sendLoginEmail(email);

    return redirect(301, '/');
  },
  logout: async event => {
    deleteSessionTokenCookie();
    return redirect(301, '/');
  },
};
