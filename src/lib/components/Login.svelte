<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { applyAction, enhance } from '$app/forms';
  import Floatification from './Floatification.svelte';
  import Spinner from './Spinner.svelte';

  let openFloat = $state(false);
  let submitting = $state(false);

  const submit: SubmitFunction = ({ cancel }) => {
    submitting = true;

    return async ({ result }) => {
      submitting = false;
      openFloat = true;
      await applyAction(result);
    };
  };
</script>

<Floatification
  message="Check your email for a login link"
  bind:open={openFloat}
  autoclose
/>
<form method="POST" action="/auth?/login" use:enhance={submit}>
  <div class="flex items-center">
    <div class="
      rounded-md p-1 h-8 z-10
      dark:bg-slate-300 dark:text-black
    ">
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
        relative p-1 pl-3 -left-2 rounded-r-md
        dark:bg-fuchsia-800 dark:text-white
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
