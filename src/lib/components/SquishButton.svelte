<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';

  interface Props {
    children?: Snippet;
    href: string;
  }

  const { children, href }: Props = $props();

  const active = $derived(page.url.pathname === href);
</script>

<a
  {href}
  class={[
    'flex w-full items-center gap-2 truncate p-2',
    'font-bold text-white',
    'rounded-md border border-4 border-slate-600 hover:border-slate-400',
    active
      ? 'bg-slate-500 hover:bg-slate-400'
      : 'bg-slate-600 hover:bg-slate-400',
  ].join(' ')}
>
  {@render children?.()}
</a>
