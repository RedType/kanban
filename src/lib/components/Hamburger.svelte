<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';

  interface Props {
    onclick: MouseEventHandler<HTMLButtonElement>,
  }

  let {
    onclick,
  }: Props = $props();
</script>

<button
  aria-label="Open/Close Sidebar"
  onclick={onclick}
  class="flex flex-col w-6 gap-1"
>
  {#each Array(3) as _}
    <div class="
      bg-black dark:bg-white w-full h-1 rounded-full
    "></div>
  {/each}
</button>
