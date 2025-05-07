import type { Project } from '@prisma-generated';
import prisma from '$/lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  let projects: Array<Project> | undefined;
  if (locals.user) {
    projects = await prisma.project.findMany({
      where: {
        OR: [{
          ownerId: locals.user.id,
        }, {
          members: {
            some: {
              userId: locals.user.id,
            },
          },
        }],
      },
    });
  }

  return { projects };
};
