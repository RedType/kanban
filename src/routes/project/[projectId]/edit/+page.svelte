<script lang="ts">
  import { Email } from '$/lib/util';
  import { getPublishFloatCtx } from '$/lib/context';
  import { applyAction, enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import type { ActionData, PageData, SubmitFunction } from './$types';

  interface Props {
    data: PageData;
    form: ActionData;
  }

  const { data, form }: Props = $props();
  const publishFloat = getPublishFloatCtx();

  let submitting = $state(false);
  let projectName = $state(data.project.name);
  const newMemberEmails: Array<Email> = $state([]);
  const removedMemberEmails: Array<Email> = $state(
    new Array(data.project.members.length),
  );

  const submit: SubmitFunction = ({ formData }) => {
    submitting = true;

    for (const e of removedMemberEmails) {
      if (e) {
        formData.append('removedMemberEmails', e);
      }
    }

    return async ({ result }) => {
      submitting = false;
      await applyAction(result);
      if (result.type === 'success') {
        await invalidateAll();
        // reset state
        newMemberEmails.length = 0;
        removedMemberEmails.length = 0;
        removedMemberEmails.length = data.project.members.length;
      }
      publishFloat(form?.message ?? '');
    };
  };
</script>

<form method="POST" use:enhance={submit} class="flex flex-col gap-2">
  <div class="flex justify-center">
    <input
      type="text"
      name="name"
      class="rounded-md bg-slate-200 p-2 text-2xl font-bold"
      bind:value={projectName}
    />
  </div>

  <div class="flex items-center gap-2">
    <h2>Members</h2>
    <button
      onclick={() => newMemberEmails.push('')}
      disabled={submitting}
      class="
        rounded-md bg-green-600 p-2 font-bold
        text-white hover:bg-green-500
      "
      form=""
    >
      Add
    </button>
  </div>

  <div class="flex flex-col gap-2">
    {#if data.project.owner}
      <div class="ml-4">
        {data.project.owner.email}
        <span class="font-bold text-red-500">(Owner)</span>
      </div>
    {:else}
      <div class="font-bold text-red-500">Project has no owner</div>
    {/if}

    {#each data.project.members as member, i (member.user.id)}
      <div class="ml-4 flex items-center gap-2">
        <div>{member.user.email}</div>
        <button
          onclick={() => {
            if (removedMemberEmails[i]) {
              delete removedMemberEmails[i];
            } else {
              removedMemberEmails[i] = member.user.email;
            }
          }}
          form=""
          class={[
            'rounded-md p-2 font-bold text-white',
            'bg-red-600 hover:bg-red-500',
          ].join(' ')}
        >
          {removedMemberEmails[i] ? 'Marked for Removal' : 'Remove'}
        </button>
      </div>
    {/each}

    {#each newMemberEmails as _, i}
      <div class="ml-4 flex items-center gap-2">
        <input
          type="email"
          name="newMemberEmails"
          class="rounded-md bg-slate-200 p-2"
          bind:value={newMemberEmails[i]}
        />
        <button
          onclick={() => newMemberEmails.splice(i, 1)}
          form=""
          class={[
            'rounded-md p-2 font-bold text-white',
            'bg-red-600 hover:bg-red-500',
          ].join(' ')}
        >
          Remove
        </button>
      </div>
    {/each}
  </div>

  <button
    type="submit"
    class="rounded-md bg-green-600 p-2 font-bold text-white hover:bg-green-500"
  >
    Submit
  </button>
</form>
