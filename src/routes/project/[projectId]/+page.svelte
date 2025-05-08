<script lang="ts">
  import { onMount } from 'svelte';
  import { getActiveProjectCtx } from '$/lib/context';
  import { page } from '$app/state';
  import type { ActionData, PageData } from './$types';

  interface Props {
    data: PageData;
    form: ActionData;
  }

  const activeProject = getActiveProjectCtx();

  const { data }: Props = $props();

  const owned = $derived(data.user?.id === data.project.ownerId);

  onMount(() => {
    if (page.url.searchParams.has('setActive')) {
      activeProject(page.params.projectId);
    }
  });
</script>

<div class="flex justify-center gap-2">
  <h1 class="text-2xl font-bold">{data.project.name || 'Unnamed Project'}</h1>
  {#if owned}
    <a
      href={`/project/${page.params.projectId}/edit`}
      class={[
        'rounded-md p-2 text-white',
        'bg-green-600 hover:bg-green-500',
      ].join(' ')}
    >
      Edit
    </a>
  {/if}
</div>

<h2 class="flex items-center gap-2">Members</h2>

<div class="flex flex-col gap-2">
  {#if data.project.owner}
    <div class="ml-4">
      {data.project.owner.email}
      <span class="font-bold text-red-500">(Owner)</span>
    </div>
  {:else}
    <div class="font-bold text-red-500">Project has no owner</div>
  {/if}

  {#each data.project.members as member (member.user.id)}
    <div class="ml-4 flex items-center gap-2">
      {member.user.email}
    </div>
  {/each}
</div>
