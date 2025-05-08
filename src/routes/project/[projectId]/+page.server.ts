import { error, fail } from '@sveltejs/kit';
import prisma from '$/lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

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
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    return error(404, 'No such project');
  }

  if (
    !(project.owner?.id === locals.user.id) &&
    !project.members.find((m) => m.user.id === locals.user!.id)
  ) {
    return error(401, 'You are not a member of this project');
  }

  return { project };
};

export const actions: Actions = {
  addMember: async () => {
    //TODO
  },
  removeMember: async ({ locals, params }) => {
    if (!locals.user) {
      return fail(401, { message: 'Log in first' });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      },
    });

    if (!project) {
      return fail(404, { message: 'No such project' });
    }

    if (locals.user.id !== project.ownerId) {
      return fail(401, { message: 'Only project owner may do this' });
    }

    await prisma.usersToProjects.delete({
      where: {
        userId_projectId: {
          userId: locals.user.id,
          projectId: project.id,
        },
      },
    });

    return new Response();
  },
};
