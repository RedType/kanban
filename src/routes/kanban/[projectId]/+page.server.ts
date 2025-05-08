import { error } from '@sveltejs/kit';
import prisma from '$/lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    return error(401, 'Please log in first');
  }

  const project = await prisma.project.findUnique({
    where: {
      id: params.projectId,
    },
    include: {
      owner: {
        select: {
          id: true,
        },
      },
      members: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!project) {
    return error(404, 'No such project');
  }

  if (
    !(project.owner?.id === locals.user.id) &&
    !project.members.find((m) => m.userId === locals.user!.id)
  ) {
    return error(401, 'You are not a member of this project');
  }

  return { project };
};
