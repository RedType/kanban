<script lang="ts">
  import DateInput from './DateInput.svelte';

  interface Props {
    start?: Date;
    length?: number;
    running?: boolean;
  }

  let {
    start = $bindable(new Date()),
    length = $bindable(0),
    running = $bindable(false),
  }: Props = $props();

  const durationDisplay = $derived.by(() => {
    const seconds = length % 60;
    const minutes = Math.floor(length / 60) % 60;
    const hours = Math.floor(length / 3600);

    let time = '';
    // push hours
    if (hours > 0) {
      time += `${hours}:`;
    }
    // push minutes
    if (hours > 0 && minutes < 10) {
      time += `0${minutes}:`;
    } else {
      time += `${minutes}:`;
    }
    // push seconds
    if (seconds < 10) {
      time += `0${seconds}`;
    } else {
      time += seconds;
    }

    return time;
  });

  // timer
  let intervalId: number | null = null;
  $effect(() => {
    if (running && !intervalId) {
      intervalId = setInterval(() => {
        length += 1;
      }, 1000);
    } else if (!running && intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });
</script>

<div class="flex items-center gap-2">
  <!-- Start date -->
  <DateInput
    type="datetime-local"
    bind:value={start}
    class="border rounded-sm"
  />
  <span>
    {durationDisplay}
  </span>
  <button
    form=""
    onclick={() => running = !running}
    class={[
      'rounded-md text-white font-bold p-1 px-2',
      running
        ? 'bg-red-500 hover:bg-red-400'
        : 'bg-green-500 hover:bg-green-400',
    ]}
  >
    {running ? 'Stop' : 'Start'}
  </button>
</div>
