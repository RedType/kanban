<script lang="ts">
  interface Props {
    autoclose?: boolean | number;
    message: string;
    open: boolean;
  }

  let {
    autoclose = true,
    message,
    open = $bindable(),
  }: Props = $props();

  const topClass = $derived(open ? "top-0" : "-top-20");

  // autoclose timer
  const timeout = typeof autoclose === 'number' ? autoclose : 5000;
  let timer: number | null = null;
  $effect(() => {
    if (autoclose && open) {
      // cancel old timer
      if (timer !== null) {
        clearTimeout(timer);
      }
      // set new timer
      timer = setTimeout(() => {
        open = false;
      }, timeout);
    }
  });
</script>

<div class="
  absolute w-screen top-0 left-0
  flex justify-center
">
  <div
    class={[
      "relative z-100 m-2 p-2 min-w-100 rounded-md",
      "flex items-center gap-2",
      "bg-yellow-500 text-black",
      "transition-all duration-500",
      topClass,
    ].join(' ')}
  >
    <div class="
      w-[2.3rem] h-[2.3rem]
      text-[2rem] font-bold font-serif italic
      border border-5 rounded-full
      flex justify-center items-center
      border-blue-500 text-blue-500
    ">i</div>
    <span>{message}</span>
    <button
      onclick={() => open = false}
      class="font-bold text-red-700 absolute right-2 top-0"
    >
      x
    </button>
  </div>
</div>
