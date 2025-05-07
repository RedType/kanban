<script lang="ts">
  import type { Project } from '@prisma-generated';
  import { onMount } from 'svelte';

  interface Props {
    projects: Pick<Project, 'id' | 'name'>[];
    selected: string;
  }

  let { projects, selected = $bindable('') }: Props = $props();

  onMount(() => {
    selected = localStorage.getItem('activeProject') ?? '';
  });
  $effect(() => {
    localStorage.setItem('activeProject', selected);
  });
</script>

<div class="flex">
  <select
    name="project"
    bind:value={selected}
    class="
      h-10 w-50 rounded-l-md bg-slate-200 p-2 text-black
    "
  >
    {#each projects as project (project.id)}
      <option value={project.id}>
        {project.name}
      </option>
    {/each}
  </select>
  <button
    class="
    h-10 rounded-r-md bg-green-600 px-2 text-3xl font-bold
    text-white hover:bg-green-500
  ">+</button
  >
</div>
