import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import prisma from '$/lib/server/prisma';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ locals, request }) => {
    if (!locals.user) {
      return fail(401, { message: 'You have to log in first' });
    }

    const data = await request.formData();
    const name = data.get('name') as string;
    const members = data.getAll('members')
      .filter(email => !!email) // remove empty strings
      .filter(email => email !== locals.user!.email) as Array<string>;

    const users = await prisma.user.findMany({
      where: {
        email: {
          in: members,
        },
      },
    });

    for (const email of members) {
      if (!email || email === locals.user.email) {
        continue;
      }

      if (!z.string().email().safeParse(email).success) {
        return fail(400, { message: email + ' is not a valid email address' });
      }

      if (!users.find((u) => u.email === email)) {
        return fail(404, { message: email + ' is not a registered user' });
      }
    }

    const project = await prisma.project.create({
      data: {
        name,
        owner: {
          connect: {
            id: locals.user.id,
          },
        },
        members: {
          create: members.map((email) => ({
            user: {
              connect: {
                email,
              },
            },
          })),
        },
      },
    });

    return redirect(303, `/project/${project.id}?setActive=true`);
  },
};
