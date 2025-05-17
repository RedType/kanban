import { error, fail } from '@sveltejs/kit';
import { dateFromTsString, weekOf } from '$/lib/util';
import prisma from '$/lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
  if (!locals.user) {
    return error(401, 'Please log in first');
  }

  // parse query
  const week = weekOf();
  let start: Date =
    dateFromTsString(url.searchParams.get('start')) ?? week.start;
  let end: Date = dateFromTsString(url.searchParams.get('end')) ?? week.end;

  // fetch records
  const times = await prisma.timeEntry.findMany({
    where: {
      projectId: params.projectId,
      userId: locals.user.id,
      start: {
        gt: start,
        lt: end,
      },
    },
  });

  return { times };
};

export const actions: Actions = {
  newTimeEntry: async () => {
  },
};
