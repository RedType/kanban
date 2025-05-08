<script lang="ts">
  interface Props {
    autoclose?: boolean | number;
    message?: string;
    open: boolean;
  }

  let { autoclose = true, message, open = $bindable() }: Props = $props();

  const topClass = $derived(open ? 'top-0' : '-top-20');

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

<div
  class={['absolute top-0 left-0 flex', 'h-0 w-screen justify-center'].join(
    ' ',
  )}
>
  <div
    class={[
      'absolute z-1000 m-2 min-w-100 rounded-md p-2',
      'flex items-center gap-2',
      'bg-yellow-500 text-black',
      'transition-all duration-500',
      topClass,
    ].join(' ')}
  >
    <div
      class={[
        'flex h-[2.3rem]',
        'w-[2.3rem] items-center justify-center rounded-full',
        'border border-5 border-blue-500',
        'font-serif text-[2rem] font-bold',
        'text-blue-500 italic',
      ].join(' ')}
    >
      i
    </div>
    <span>{message || ''}</span>
    <button
      onclick={() => (open = false)}
      class="absolute top-0 right-2 font-bold text-red-700"
    >
      x
    </button>
  </div>
</div>
