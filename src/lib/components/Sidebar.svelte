<script lang="ts">
  let {
    children,
    open,
  } = $props();
</script>

<nav class={[
  "h-full flex flex-col gap-2 p-2",
  "dark:bg-slate-500",
  "transition-all duration-500",
  open ? "w-50" : "w-13",
].join(' ')}>
  {@render children()}
</nav>
