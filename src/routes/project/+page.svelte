<script lang="ts">
  import { enhance } from '$app/forms';

  let members = $state([]);
</script>

<form method="POST" use:enhance>
  <label for="name">Name</label>
  <input name="name" type="text" />
</form>
