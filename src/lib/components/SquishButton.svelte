<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    href: string;
  }

  const { children, href }: Props = $props();
</script>

<a
  {href}
  class={[
    'flex w-full items-center gap-2 truncate p-2',
    'font-bold text-white',
    'bg-slate-600 hover:bg-slate-700',
    'rounded-md',
  ].join(' ')}
>
  {@render children?.()}
</a>
