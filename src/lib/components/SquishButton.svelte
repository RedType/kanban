<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    href: string;
  }

  const {
    children,
    href,
  }: Props = $props();
</script>

<a
  {href}
  class={[
    "w-full p-2 flex items-center gap-2 truncate",
    "font-bold text-white",
    "bg-slate-600 hover:bg-slate-700",
    "rounded-md",
  ].join(' ')}
>
  {@render children?.()}
</a>
