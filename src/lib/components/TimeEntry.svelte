<script lang="ts">
  import type { TimeEntry } from '@prisma-generated';
  import { onMount } from 'svelte';
  import Spinner from './Spinner.svelte';

  interface Props {
    id: string;
    start: Date;
    duration: number;
  }

  let { id, start, duration = $bindable() }: Props = $props();

  let active = $state(false);

  let timer: number | null = $state(null);
  $effect(() => {
    if (active && timer === null) {
      timer = setInterval(() => {
        duration += 1;
      }, 1000);
    } else if (!active && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  });
</script>

<tr
  ><td
    class="
  flex w-full items-center p-2
"
  >
    <button
      onclick={() => (active = !active)}
      class={[
        'flex items-center gap-2 p-2',
        'rounded-md',
        !active ? 'bg-green-600' : 'bg-red-600',
      ].join(' ')}
    >
      {#if !active}
        Start
      {:else}
        <Spinner />
        <span>Stop</span>
      {/if}
    </button>
  </td></tr
>
