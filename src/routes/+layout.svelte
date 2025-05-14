<script lang="ts">
  import '../app.css';
  import { setContext } from 'svelte';
  import type {
    ActiveProjectCtx,
    PublishFloatCtx,
    SidebarCtx,
  } from '$lib/context';
  import {
    Floatification,
    Hamburger,
    Login,
    Logout,
    ProjectPicker,
    Sidebar,
    SquishButton,
  } from '$com';
  import { ClockIcon, ProfileIcon, ProjectIcon, TaskIcon } from '$com/icons';

  // set up contexts
  let floatMessage = $state('');
  let floatOpen = $state(false);
  let activeProject = $state('');
  let sidebarOpen = $state(false);

  const publishFloatCtx: PublishFloatCtx = (message: string) => {
    floatMessage = message;
    floatOpen = true;
  };
  setContext('publishFloatCtx', publishFloatCtx);

  const activeProjectCtx: ActiveProjectCtx = (project) => {
    if (project !== undefined) {
      activeProject = project;
    }
    return activeProject;
  };
  setContext('activeProjectCtx', activeProjectCtx);

  const sidebarCtx: SidebarCtx = (open) => {
    if (open !== undefined) {
      sidebarOpen = open;
    }
    return sidebarOpen;
  };
  setContext('sidebarCtx', sidebarCtx);

  let { children, data } = $props();

  const kanbanUrl = $derived(`/kanban/${activeProject}`);
  const profileUrl = $derived(`/profile/${data.user?.id}`);
  const projectUrl = $derived(`/project/${activeProject}`);
  const timeUrl = $derived(`/time/${activeProject}`);
</script>

<Floatification message={floatMessage} bind:open={floatOpen} />

<header
  class="
  flex w-full content-evenly items-center
  justify-between p-4
  dark:bg-slate-600 dark:text-white
"
>
  <div class="flex items-center gap-3">
    <Hamburger onclick={() => (sidebarOpen = !sidebarOpen)} />
    <h1 class="text-xl font-bold">Redtype Kanban</h1>
  </div>

  <div class="flex items-center gap-3">
    {#if !data.user}
      <Login />
    {:else}
      <ProjectPicker projects={data.projects} bind:selected={activeProject} />
      <Logout email={data.user?.email ?? 'You'} />
    {/if}
  </div>
</header>

<div class="absolute flex h-full w-full">
  <Sidebar open={sidebarOpen} hide={!data.user || !activeProject}>
    {#if data.user && activeProject}
      <SquishButton href={projectUrl}>
        <ProjectIcon />
        Project
      </SquishButton>

      <SquishButton href={timeUrl}>
        <ClockIcon />
        Time Clock
      </SquishButton>

      <SquishButton href={kanbanUrl}>
        <TaskIcon />
        Kanban
      </SquishButton>

      <SquishButton href={profileUrl}>
        <ProfileIcon />
        Profile
      </SquishButton>
    {/if}
  </Sidebar>

  <div class="h-full w-full p-2">
    {@render children?.()}
  </div>
</div>
