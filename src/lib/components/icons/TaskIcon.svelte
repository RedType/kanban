<script lang="ts">
  import { getContext } from 'svelte';
  const dark: () => boolean = getContext('dark');
</script>

<div class="min-w-5 min-h-5">
  <svg
    version="1.1"
    viewBox="0 0 11.365 11.365"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill-opacity="0"
      stroke={dark() ? "#fff" : "#000"}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="0"
      stroke-width="1.365"
    >
      <path d="m0.6825 10.682h10v-7l-3-3h-7z"/>
      <path d="m10.682 3.6825h-3v-3"/>
      <path d="m3.6825 6.6825 1 1 2-2"/>
    </g>
  </svg>
</div>
