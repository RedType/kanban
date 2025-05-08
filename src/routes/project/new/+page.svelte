<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { applyAction, enhance } from '$app/forms';
  import { publishFloat } from '$/lib/context';
  import styles from '$/lib/styles';
  import type { PageProps } from './$types';

  const { form }: PageProps = $props();

  const members: Array<string> = $state(['']);
  let submitting = $state(false);

  const submit: SubmitFunction = () => {
    submitting = true;

    return async ({ result }) => {
      submitting = false;
      await applyAction(result);
      publishFloat(form?.message || '');
    };
  };
</script>

<h1 class="text-2xl font-bold">New Project</h1>

<form
  method="POST"
  use:enhance={submit}
  class="flex flex-col place-items-start gap-2"
>
  <div class="flex items-center gap-2">
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      class="rounded-l-md bg-slate-200 p-2"
      disabled={submitting}
      required
    />
  </div>

  <div class="flex items-center gap-2">
    <h2>Members</h2>
    <button
      onclick={() => members.push('')}
      disabled={submitting}
      class={styles.greenButton}
    >
      Add
    </button>
  </div>

  {#each members as _, i}
    <div class="ml-4 flex">
      <input
        type="email"
        name="members"
        bind:value={members[i]}
        placeholder="email@example.com"
        class="rounded-l-md bg-slate-200 p-2"
      />
      <button
        onclick={() => members.splice(i, 1)}
        disabled={submitting}
        class="rounded-r-md bg-red-600 p-2 text-white hover:bg-red-500"
      >
        Remove
      </button>
    </div>
  {/each}

  <button type="submit" disabled={submitting} class={styles.greenButton}>
    Submit
  </button>
</form>
