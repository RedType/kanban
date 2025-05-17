<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { dateFromTsString, weekOf } from '$/lib/util';
  import { DateRangePicker, TimeCard } from '$/lib/components';

  const { data } = $props();

  let start = $state(weekOf().start);
  let end = $state(weekOf().end);

  // set dates according to query params
  onMount(() => {
    const thisWeek = weekOf();
    const startParam = dateFromTsString(page.url.searchParams.get('start'));
    const endParam = dateFromTsString(page.url.searchParams.get('end'));
    start = startParam ?? thisWeek.start;
    end = endParam ?? thisWeek.end;
  });

  $effect(() => {
    page.url.searchParams.set('start', start.getTime().toString());
  });
  $effect(() => {
    page.url.searchParams.set('end', end.getTime().toString());
  });
</script>

<DateRangePicker
  bind:start
  bind:end
  onchange={() => tick().then(() => goto(page.url))}
/>

<form method="POST" class="flex flex-col">
  <!-- New Clock Button -->
  <!-- Selected Times -->
  <TimeCard />
</form>

