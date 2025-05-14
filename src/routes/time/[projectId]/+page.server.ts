import { error, fail } from '@sveltejs/kit';
import { Prisma } from '@prisma-generated';
import prisma from '$/lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
  if (!locals.user) {
    return error(401, 'Please log in first');
  }

  // parse query
  let after: Date | undefined;
  let before: Date | undefined;
  try {
    const afterTs = url.searchParams.get('after');
    const beforeTs = url.searchParams.get('before');
    if (afterTs) {
      after = new Date(Number(afterTs));
    }
    if (beforeTs) {
      before = new Date(Number(beforeTs));
    }
  } catch (_) { }

  const times = await prisma.timeEntry.findMany({
    where: {
      projectId: params.projectId,
      userId: locals.user.id,
      start: {
        gt: after || Prisma.skip,
        lt: before || Prisma.skip,
      },
    },
  });

  return { times };
};

export const actions: Actions = {
  default: async () => {
  },
};
