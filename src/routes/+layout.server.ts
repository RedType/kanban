import type { Project, User } from '@prisma-generated';
import prisma from '$/lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const { user: fullUser } = event.locals;

  let user: Pick<User, 'id' | 'email'> | null = null;
  if (fullUser) {
    user = {
      id: fullUser.id,
      email: fullUser.email,
    };
  }

  let projects: Array<{ name: string; id: string }> = [];

  if (user) {
    projects = await prisma.project.findMany({
      where: {
        OR: [
          {
            ownerId: user.id,
          },
          {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  return { projects, user };
};
