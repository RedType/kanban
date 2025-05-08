<script lang="ts">
  import type { Project } from '@prisma-generated';
  import { onMount, tick } from 'svelte';
  import { goto } from '$app/navigation';

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

  const onchange = () =>
    tick().then(() => {
      if (selected) {
        goto(`/project/${selected}`);
      } else {
        goto('/');
      }
    });
</script>

<div class="flex">
  <select
    name="project"
    bind:value={selected}
    {onchange}
    class="
      h-10 w-50 rounded-l-md bg-slate-200 p-2 text-black
    "
  >
    <option value="">-- Select Project --</option>
    {#each projects as project (project.id)}
      <option value={project.id}>
        {project.name}
      </option>
    {/each}
  </select>
  <a
    href="/project/new"
    class="
    h-10 rounded-r-md bg-green-600 px-2 text-3xl font-bold
    text-white hover:bg-green-500
  "
  >
    +
  </a>
</div>
