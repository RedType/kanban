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

  const displayTime = $derived.by(() => {
    const days = Math.floor(duration / (60 * 60 * 24))
      .toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    const hours = Math.floor((duration / (60 * 60)) % 24)
      .toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    const minutes = Math.floor((duration / 60) % 60)
      .toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    const seconds = Math.floor(duration % 60)
      .toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    return [days, hours, minutes, seconds].join(':');
  });

  let timer: number | null = null;
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

<div class="flex w-full items-center p-2 ">
  <button
    onclick={() => (active = !active)}
    class={[
      'flex items-center gap-2 p-2',
      'rounded-md',
      active
        ? 'bg-red-600 hover:bg-red-500'
        : 'bg-green-600 hover:bg-green-500',
    ].join(' ')}
  >
    {#if !active}
      Start =&gt;
    {:else}
      <Spinner />
      <span>Stop</span>
    {/if}
  </button>

  <div>
    {displayTime}
  </div>
</div>
