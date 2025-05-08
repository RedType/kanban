<script lang="ts">
  import { onMount } from 'svelte';
  import { publishFloat, setActiveProject } from '$/lib/context';
  import { applyAction, enhance } from '$app/forms';
  import { page } from '$app/state';
  import type { ActionData, PageData, SubmitFunction } from './$types';

  interface Props {
    data: PageData;
    form: ActionData;
  }

  const { data, form }: Props = $props();

  const owned = data.user?.id === data.project.ownerId;

  let showNotification = $state(false);
  let submitting = $state(false);

  const submit: SubmitFunction = () => {
    submitting = true;

    return async ({ result }) => {
      await applyAction(result);
      publishFloat(form?.message ?? 'Huh?');
      showNotification = true;
    };
  };

  onMount(() => {
    if (page.url.searchParams.has('setActive')) {
      setActiveProject(page.params.projectId);
    }
  });
</script>

<div>
  <span>{data.project.name || 'My Project'}</span>

  <a
    href={owned ? './edit' : undefined}
    class={[
      'rounded-md p-2 text-white',
      owned ? 'bg-green-600 hover:bg-green-500' : 'bg-slate-500',
    ].join(' ')}
  >
    Edit
  </a>

  <form method="POST" use:enhance={submit}>
    <table>
      <caption>Members</caption>
      <tbody>
        {#each data.project.members as member (member.user.id)}
          <tr>
            <td class="">
              {member.user.email}
            </td>
            <td>
              <button
                type="submit"
                formAction="?/removeMember"
                class={[
                  'text-bold p-2',
                  owned ? 'bg-red-600 hover:bg-red-500' : 'bg-slate-500',
                ]}
                disabled={!owned}
              >
                Remove member
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </form>
</div>
