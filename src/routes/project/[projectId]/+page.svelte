<script lang="ts">
  import { onMount } from 'svelte';
  import styles from '$/lib/styles';
  import { mainCtx, publishFloat } from '$/lib/context';
  import { applyAction, enhance } from '$app/forms';
  import { page } from '$app/state';
  import type { ActionData, PageData, SubmitFunction } from './$types';

  interface Props {
    data: PageData;
    form: ActionData;
  }

  const { data, form }: Props = $props();

  let submitting = $state(false);
  let editing = $state(false);
  const newMembers: Array<string> = $state([]);
  const owned = $derived(data.user?.id === data.project.ownerId);

  const submit: SubmitFunction = () => {
    submitting = true;

    return async ({ result }) => {
      submitting = false;
      await applyAction(result);
      publishFloat(form?.message ?? 'Huh?');
    };
  };

  onMount(() => {
    if (page.url.searchParams.has('setActive')) {
      mainCtx().activeProject = page.params.projectId;
    }
  });
</script>

<form method="POST" use:enhance={submit} class="flex flex-col gap-2">
  <div class="flex justify-center gap-2">
    <h1 class="text-2xl font-bold">{data.project.name || 'Unnamed Project'}</h1>
    {#if owned}
      <button
        onclick={() => (editing = !editing)}
        class={[
          'rounded-md p-2 text-white',
          'bg-green-600 hover:bg-green-500',
        ].join(' ')}
        type={editing ? 'submit' : undefined}
        formAction="?/editProject"
      >
        {!editing ? 'Edit' : 'Finish'}
      </button>
    {/if}
  </div>

  <div class="flex items-center gap-2">
    <h2>Members</h2>
    {#if owned}
      <button
        onclick={() => newMembers.push('')}
        disabled={submitting}
        class={styles.greenButton}
      >
        Add
      </button>
    {/if}
  </div>

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
      <div>{member.user.email}</div>
      {#if owned}
        <button
          type="submit"
          formAction="?/removeMember"
          class={[
            'rounded-md p-2 font-bold text-white',
            'bg-red-600 hover:bg-red-500',
          ].join(' ')}
        >
          Remove
        </button>
      {/if}
    </div>
  {/each}
</form>
