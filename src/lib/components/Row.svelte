<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  const { children }: Props = $props();
</script>

<tr
  ><td
    class="
"
  >
    {@render children?.()}
  </td></tr
>
