<script lang="ts">
  import '../app.css';
  import {
    Hamburger,
    Login,
    Logout,
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

<header
  class="
  flex w-screen content-evenly items-center
  justify-between p-4
  dark:bg-slate-600 dark:text-white
"
>
  <div class="flex items-center gap-3">
    <Hamburger onclick={() => (sidebarOpen = !sidebarOpen)} />
    <h1 class="text-xl font-bold">Redtype Kanban</h1>
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
