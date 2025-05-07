<script lang="ts">
  import type { Project } from '@prisma-generated';
  import { onMount } from 'svelte';

  interface Props {
    projects: Pick<Project, 'id' | 'name'>[];
    selected: string;
  }

  let {
    projects,
    selected = $bindable(''),
  }: Props = $props();

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
      w-50 h-10 p-2 bg-slate-200 rounded-l-md text-black
    "
  >
    {#each projects as project (project.id)}
      <option value={project.id}>
        {project.name}
      </option>
    {/each}
  </select>
  <button class="
    bg-green-600 text-white font-bold text-3xl px-2 h-10
    hover:bg-green-500 rounded-r-md
  ">+</button>
</div>
