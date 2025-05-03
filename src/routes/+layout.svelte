<script lang="ts">
  import '../app.css';

  let { children, data } = $props();
</script>

<header class="
  flex justify-between items-centercontent-evenly
  w-screen h-32 p-4 dark:bg-slate-50
">
  <h1>page name</h1>
  <form method="POST" action="?/login">
  {#if !data.session}
    <input
      type="email"
      name="email"
      placeholder="email@example.com"
      required
    />
    <button type="submit">Log in</button>
  {:else}
    <div>{data.user.email}</div>
    <button type="submit" formAction="?/logout">Log out</button>
  {/if}
  </form>
</header>

{@render children()}
