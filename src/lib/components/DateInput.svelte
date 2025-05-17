<script lang="ts">
  import { undate } from '$/lib/util';

  let {
    value = $bindable(new Date()),
    ...props
  } = $props();

  const get = () => undate(value);
  const set = (s: string) => {
    if (s) {
      value = new Date(s);
    } else {
      value = new Date();
    }
  }
</script>

<input
  type="date"
  bind:value={get, set}
  {...props}
/>
