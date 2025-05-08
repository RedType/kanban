import { getContext, setContext } from 'svelte';

export interface Context {
  activeProject: string;
  floatMessage: string;
  floatOpen: boolean;
  sidebarOpen: boolean;
}

export const initContexts = (ctx: () => Context) => {
  setContext('mainContext', ctx);
};

export const getMainCtx = () => (getContext('mainContext') as () => Context)();

export const publishFloat = (message: string) => {
  getMainCtx().floatMessage = message;
  getMainCtx().floatOpen = true;
};

export const setActiveProject = (id: string) => {
  getMainCtx().activeProject = id;
};

export const toggleSidebar = () => {
  const ctx = getMainCtx();
  ctx.sidebarOpen = !ctx.sidebarOpen;
};
