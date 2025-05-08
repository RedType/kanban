import { error, fail } from '@sveltejs/kit';
import { isString, Email } from '$/lib/util';
import prisma from '$/lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
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
          email: true,
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
  default: async ({ locals, params, request }) => {
    // make sure user is logged in
    if (!locals.user) {
      return fail(401, { message: 'Log in first' });
    }

    // retrieve inputs
    const data = await request.formData();
    const name = data.get('name') as string;
    const newMemberEmails = data.getAll('newMemberEmails') as Array<Email>;
    const removedMemberEmails = data.getAll(
      'removedMemberEmails',
    ) as Array<Email>;
    const inputEmails = newMemberEmails.concat(removedMemberEmails);

    // validate name
    if (!name || !isString(name)) {
      return fail(400, { message: 'Name must not be blank' });
    }

    // validate emails
    for (const e of inputEmails) {
      if (!Email.safeParse(e).success) {
        return fail(400, { message: e + ' is not an email address' });
      }
    }

    // fetch project
    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      },
    });
    if (!project) {
      return fail(404, { message: 'No such project' });
    }

    // check that user is project owner
    if (locals.user.id !== project.ownerId) {
      return fail(401, { message: 'Only project owner may do this' });
    }

    // retrieve users
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: inputEmails,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    // check that all given emails refer to existing users
    for (const email of inputEmails) {
      if (!users.find((u) => u.email === email)) {
        return fail(400, { message: email + ' is not a registered user' });
      }
    }

    // separate new/removed users
    const newMembers = [];
    const removedMembers = [];
    for (const user of users) {
      if (newMemberEmails.includes(user.email)) {
        newMembers.push(user);
      } else if (removedMemberEmails.includes(user.email)) {
        removedMembers.push(user);
      }
    }

    // update project
    await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        name,
      },
    });

    // remove members
    await prisma.usersToProjects.deleteMany({
      where: {
        userId: {
          in: removedMembers.map((u) => u.id),
        },
      },
    });

    // add members
    await prisma.usersToProjects.createMany({
      data: newMembers.map((u) => ({
        projectId: project.id,
        userId: u.id,
      })),
      skipDuplicates: true,
    });

    return { message: 'Success' };
  },
};
