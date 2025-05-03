import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const { session, user } = event.locals;
  return { session, user };
};
