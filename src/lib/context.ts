import { getContext } from 'svelte';

export type ActiveProjectCtx = (project?: string) => string;
export type PublishFloatCtx = (message: string) => void;
export type SidebarCtx = (open?: boolean) => boolean;

export const getActiveProjectCtx = () =>
  getContext('activeProjectCtx') as ActiveProjectCtx;

export const getPublishFloatCtx = () =>
  getContext('publishFloatCtx') as PublishFloatCtx;

export const getSidebarCtx = () => getContext('sidebarCtx') as SidebarCtx;
