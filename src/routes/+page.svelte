<script lang="ts">
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();
</script>

<svelte:head>
  <title>Redtype Kanban</title>
</svelte:head>

<div class="mt-10 flex w-full justify-center text-3xl font-bold text-white">
  {#if data.user}
    <p>Pick a project to get started</p>
  {:else}
    <p>Login to get started</p>
  {/if}
</div>
