<script lang="ts">
  import '../app.css';
  import { initContexts, toggleSidebar } from '$lib/context';
  import {
    Floatification,
    Hamburger,
    Login,
    Logout,
    ProjectPicker,
    Sidebar,
    SquishButton,
  } from '$com';
  import {
    ClockIcon,
    ProfileIcon,
    ProjectIcon,
    TaskIcon,
  } from '$com/icons';

  let { children, data } = $props();

  const mainContext = $state({
    activeProject: '',
    floatMessage: '',
    floatOpen: false,
    sidebarOpen: false,
  });
  initContexts(() => mainContext);

  const projectUrl = $derived(`/project/${mainContext.activeProject}`);
  const timeUrl = $derived(`/project/${mainContext.activeProject}/time`);
  const kanbanUrl = $derived(`/project/${mainContext.activeProject}/kanban`);
  const profileUrl = $derived(`/profile/${data.user?.id}`);
</script>

<svelte:head>
  <title>Redtype Kanban</title>
</svelte:head>

<Floatification
  message={mainContext.floatMessage}
  bind:open={mainContext.floatOpen}
/>

<header
  class="
  flex w-full content-evenly items-center
  justify-between p-4
  dark:bg-slate-600 dark:text-white
"
>
  <div class="flex items-center gap-3">
    <Hamburger onclick={toggleSidebar} />
    <h1 class="text-xl font-bold">Redtype Kanban</h1>
  </div>

  <div class="flex items-center gap-3">
    {#if !data.user}
      <Login />
    {:else}
      <ProjectPicker
        projects={data.projects}
        bind:selected={mainContext.activeProject}
      />
      <Logout email={data.user?.email ?? 'You'} />
    {/if}
  </div>
</header>

<div class="absolute flex h-full w-full">
  <Sidebar
    open={mainContext.sidebarOpen}
    hide={!data.user || !mainContext.activeProject}
  >
    {#if data.user && mainContext.activeProject}
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
