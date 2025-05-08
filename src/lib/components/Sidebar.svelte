<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    hide: boolean;
    open: boolean;
  }

  let { children, hide, open }: Props = $props();
</script>

<nav
  class={[
    hide ? 'hidden' : 'flex',
    'h-full flex-col gap-2 p-2',
    'bg-slate-500',
    'transition-all duration-500',
    open ? 'w-50' : 'w-15',
  ].join(' ')}
>
  {@render children?.()}
</nav>
