<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { applyAction, enhance } from '$app/forms';
  import Spinner from './Spinner.svelte';
  let { email }: { email: string } = $props();

  let submitting = $state(false);

  const submit: SubmitFunction = () => {
    submitting = true;

    return async ({ result }) => {
      submitting = false;
      await applyAction(result);
    };
  };
</script>

<form method="POST" action="/auth?/logout" use:enhance={submit}>
  <div class="flex items-center">
    <div class="
      h-10 p-2 rounded-l-md
      bg-slate-200 text-black
    ">
      {email}
    </div>
    <button
      type="submit"
      class="
        h-10 p-2 rounded-r-md
        bg-red-600 hover:bg-red-500
        text-white font-bold
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
