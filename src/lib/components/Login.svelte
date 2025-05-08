<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { applyAction, enhance } from '$app/forms';
  import { publishFloat } from '$/lib/context';
  import Spinner from './Spinner.svelte';

  let submitting = $state(false);

  const submit: SubmitFunction = () => {
    submitting = true;

    return async ({ result }) => {
      submitting = false;
      publishFloat('Check your email for a login link');
      await applyAction(result);
    };
  };
</script>

<form method="POST" action="/auth?/login" use:enhance={submit}>
  <div class="flex items-center">
    <div
      class="
      h-10 rounded-l-md bg-slate-200
      p-2 text-black
    "
    >
      <input
        type="email"
        name="email"
        placeholder="email@example.com"
        required
        disabled={submitting}
      />
    </div>
    <button
      type="submit"
      class="
        h-10 rounded-r-md bg-green-600
        p-2 font-bold
        text-white hover:bg-green-500
      "
    >
      {#if submitting}
        <Spinner />
      {:else}
        Login
      {/if}
    </button>
  </div>
</form>
