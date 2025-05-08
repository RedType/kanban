import { getContext, setContext } from 'svelte';

export interface Context {
  activeProject: string;
  floatMessage: string;
  floatOpen: boolean;
  sidebarOpen: boolean;
}

export const initMainContext = (ctx: Context) => {
  setContext('mainContext', ctx);
};

export const mainCtx = () => getContext('mainContext') as Context;

export const publishFloat = (msg: string) => {
  const ctx = mainCtx();
  ctx.floatMessage = msg;
  ctx.floatOpen = true;
};
