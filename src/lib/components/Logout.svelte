<script lang="ts">
  import { enhance } from '$app/forms';
  let { email }: { email: string } = $props();
</script>

<form method="POST" action="/auth?/logout" use:enhance>
  <div class="flex">
    <div class="
      rounded-md p-1 h-8 z-10
      dark:bg-slate-300 dark:text-black
    ">
      {email}
    </div>
    <button
      type="submit"
      class="
        relative p-1 pl-3 -left-2 rounded-r-md
        dark:bg-fuchsia-800 dark:text-white
      "
    >
      Logout
    </button>
  </div>
</form>
