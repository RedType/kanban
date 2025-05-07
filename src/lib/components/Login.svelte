<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { applyAction, enhance } from '$app/forms';
  import Floatification from './Floatification.svelte';
  import Spinner from './Spinner.svelte';

  let openFloat = $state(false);
  let submitting = $state(false);

  const submit: SubmitFunction = () => {
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
      rounded-l-md h-10 p-2
      bg-slate-200 text-black
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
        h-10 p-2 rounded-r-md
        bg-green-600 hover:bg-green-500
        text-white font-bold
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
