<script lang="ts">
  import '../app.css';
  import { Floatification, Login, Logout } from '$/lib/components';

  let { children, data } = $props();
</script>

<header class="
  flex justify-between items-center content-evenly
  w-screen p-4
  dark:text-white dark:bg-slate-500
">
  <h1 class="font-bold">page name</h1>
  {#if !data.session}
    <Login />
  {:else}
    <Logout email={data.user?.email ?? 'You'} />
  {/if}
</header>

{@render children()}
