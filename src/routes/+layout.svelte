<script lang="ts">
  import '../app.css';
  import { onMount, setContext } from 'svelte';
  import {
    Hamburger,
    Login, Logout,
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

  let sidebarOpen = $state(false);

  // detect dark mode
  let dark = $state(false);
  setContext('dark', () => dark);
  onMount(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    dark = media.matches;
    media.addEventListener("change", e => dark = e.matches);
  });
</script>

<header class="
  flex justify-between items-center content-evenly
  w-screen p-4
  dark:text-white dark:bg-slate-600
">
  <div class="flex items-center gap-3">
    <Hamburger onclick={() => { sidebarOpen = !sidebarOpen; }} />
    <h1 class="font-bold">Redtype Kanban</h1>
  </div>

  {#if !data.session}
    <Login />
  {:else}
    <Logout email={data.user?.email ?? 'You'} />
  {/if}
</header>

<div class="absolute flex h-full">
  <Sidebar open={sidebarOpen}>
    <SquishButton href="/">
      <ProjectIcon />
      Projects
    </SquishButton>

    <SquishButton href="/time">
      <ClockIcon />
      Time Clock
    </SquishButton>

    <SquishButton href="/kanban">
      <TaskIcon />
      Kanban
    </SquishButton>

    <SquishButton href="/profile">
      <ProfileIcon />
      Profile
    </SquishButton>
  </Sidebar>

  <div class="p-2">
    {@render children?.()}
  </div>
</div>
