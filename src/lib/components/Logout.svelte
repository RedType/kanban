<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { applyAction, enhance } from '$app/forms';
  import { getActiveProjectCtx } from '$/lib/context';
  import Spinner from './Spinner.svelte';
  let { email }: { email: string } = $props();

  const activeProject = getActiveProjectCtx();

  let submitting = $state(false);

  const submit: SubmitFunction = () => {
    submitting = true;

    return async ({ result }) => {
      submitting = false;
      activeProject('');
      await applyAction(result);
    };
  };
</script>

<form method="POST" action="/auth?/logout" use:enhance={submit}>
  <div class="flex items-center">
    <div
      class="
      h-10 rounded-l-md bg-slate-200
      p-2 text-black
    "
    >
      {email}
    </div>
    <button
      type="submit"
      class="
        h-10 rounded-r-md bg-red-600
        p-2 font-bold
        text-white hover:bg-red-500
      "
    >
      {#if submitting}
        <Spinner />
      {:else}
        Logout
      {/if}
    </button>
  </div>
</form>
