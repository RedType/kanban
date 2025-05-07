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
  href={href}
  class={[
    "w-full p-2 flex items-center gap-2 truncate",
    "font-bold",
    "dark:bg-slate-600 dark:text-white",
    "dark:hover:bg-slate-700",
    "rounded-md",
  ].join(' ')}
>
  {@render children?.()}
</a>
