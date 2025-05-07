<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';

  interface Props {
    onclick: MouseEventHandler<HTMLButtonElement>;
  }

  let { onclick }: Props = $props();
</script>

<button
  aria-label="Open/Close Sidebar"
  {onclick}
  class="flex w-6 flex-col gap-1"
>
  {#each Array(3) as _}
    <div
      class="
      h-1 w-full rounded-full bg-white
    "
    ></div>
  {/each}
</button>
