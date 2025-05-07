<script lang="ts">
  import '../app.css';
  import {
    Hamburger,
    Login, Logout,
    ProjectPicker,
    Sidebar,
    SquishButton,
  } from '$/lib/components';
  import {
    ClockIcon,
    ProfileIcon,
    ProjectIcon,
    TaskIcon,
  } from '$/lib/components/icons';

  let { children, data } = $props();

  let activeProject = $state('');
  let sidebarOpen = $state(false);

  const projectUrl = $derived(`/${activeProject}/`);
  const timeUrl = $derived(`/${activeProject}/time`);
  const kanbanUrl = $derived(`/${activeProject}/kanban`);
  const profileUrl = $derived(`/profile/${data.user?.id}`);
</script>

<header class="
  flex justify-between items-center content-evenly
  w-screen p-4
  dark:text-white dark:bg-slate-600
">
  <div class="flex items-center gap-3">
    <Hamburger onclick={() => sidebarOpen = !sidebarOpen} />
    <h1 class="font-bold text-xl">Redtype Kanban</h1>
  </div>

  <div class="flex items-center gap-3">
    <ProjectPicker projects={data.projects} bind:selected={activeProject} />
    {#if !data.user}
      <Login />
    {:else}
      <Logout email={data.user?.email ?? 'You'} />
    {/if}
  </div>
</header>

<div class="absolute flex w-full h-full">
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

  <div class="p-2 w-full h-full">
    {@render children?.()}
  </div>
</div>
