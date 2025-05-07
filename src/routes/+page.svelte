<script lang="ts">
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  const {
    data,
  }: Props = $props();
</script>

<svelte:head>
  <title>Redtype Kanban</title>
</svelte:head>

<div class="w-full mt-10 text-white font-bold text-3xl flex justify-center">
  {#if data.user}
    <p>Pick a project to get started</p>
  {:else}
    <p>Login to get started</p>
  {/if}
</div>
