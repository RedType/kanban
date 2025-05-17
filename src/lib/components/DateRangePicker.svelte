<script lang="ts">
  import {
    undate,
    monthOf,
    weekOf,
    yearOf,
  } from '$/lib/util';
  import DateInput from './DateInput.svelte';

  interface Props {
    start: Date;
    end: Date;
    onchange?: Function;
  }

  let {
    start = $bindable(),
    end = $bindable(),
    onchange,
  }: Props = $props();

  let activeTimeframeButton: 'w' | 'm' | 'y' | null = $derived.by(() => {
    const wk = weekOf(start);
    const mo = monthOf(start);
    const yr = yearOf(start);
    switch (undate(start) + undate(end)) {
    case undate(wk.start) + undate(wk.end):
      return 'w';
    case undate(mo.start) + undate(mo.end):
      return 'm';
    case undate(yr.start) + undate(yr.end):
      return 'y';
    default:
      return null;
    }
  });
</script>

<div class="flex items-center gap-1">
  <span>Show time logs from</span>
  <DateInput
    bind:value={start}
    class="rounded-sm border"
    {onchange}
  />
  <span>to</span>
  <DateInput
    bind:value={end}
    class="rounded-sm border"
    {onchange}
  />
  <button
    onclick={() => {
      const wk = weekOf(start);
      start = wk.start;
      end = wk.end;
      onchange?.();
    }}
    class={[
      'p-1 px-2 rounded-sm font-bold bg-orange-500 hover:bg-orange-400',
      activeTimeframeButton === 'w' ? 'text-white border border-white' : '',
    ]}
  >
    W
  </button>
  <button
    onclick={() => {
      const mo = monthOf(start);
      start = mo.start;
      end = mo.end;
      onchange?.();
    }}
    class={[
      'p-1 px-2 rounded-sm font-bold bg-orange-500 hover:bg-orange-400',
      activeTimeframeButton === 'm' ? 'text-white border border-white' : '',
    ]}
  >
    M
  </button>
  <button
    onclick={() => {
      const yr = yearOf(start);
      start = yr.start;
      end = yr.end;
      onchange?.();
    }}
    class={[
      'p-1 px-2 rounded-sm font-bold bg-orange-500 hover:bg-orange-400',
      activeTimeframeButton === 'y' ? 'text-white border border-white' : '',
    ]}
  >
    Y
  </button>
</div>
