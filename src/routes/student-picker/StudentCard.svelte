<script lang="ts">
  import { studentsStates, type StudentsStatesRecord } from "./states";
  import { pickerState } from "./config";
  import { studentsInfo } from "$lib/students-info";

  interface Props {
    studentId: keyof StudentsStatesRecord;
  }

  let { studentId }: Props = $props();
</script>

<div
  class="card h-24 w-32 items-center justify-center transition select-none
  {$studentsStates[studentId].currentlyChosen
    ? 'bg-success text-success-content z-10 font-bold' +
      (!$pickerState.configureMode ? ' scale-110' : '')
    : !$studentsStates[studentId].canChoose
      ? 'bg-base-100 text-base-content/80'
      : $studentsStates[studentId].alreadyChosen
        ? 'bg-base-300 text-base-content'
        : 'bg-info text-info-content'}"
>
  {#if $pickerState.configureMode}
    <div class="text-xs">
      <div class="font-bold">{studentId} {$studentsInfo[studentId].name}</div>
      <label>
        权重
        <input
          type="number"
          class="input input-xs w-20"
          bind:value={$studentsStates[studentId].weight}
          min="0"
        />
      </label>
    </div>
  {:else}
    <span class="text-3xl">{studentId}</span>
    <span class="text-xl">{$studentsInfo[studentId].name}</span>
  {/if}
</div>
