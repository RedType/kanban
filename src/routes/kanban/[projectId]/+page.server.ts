import prisma from '$/lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, locals }) => {
  const project = prisma.project.findUnique({
    where: {
      id: params.projectId,
    },
  });
};
