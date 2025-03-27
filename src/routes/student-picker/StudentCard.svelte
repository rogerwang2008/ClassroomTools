<script lang="ts">
  import { studentsStates, type StudentState, type StudentsStatesRecord } from "./states";
  import { pickerState } from "./config";

  interface Props {
    studentId: keyof StudentsStatesRecord;
    studentState: StudentState;
  }

  let { studentId, studentState }: Props = $props();
</script>

<div
  class="card h-24 w-32 items-center justify-center select-none
  {studentState.state === true
    ? 'bg-success text-success-content font-bold'
    : studentState.state === 'disabled'
      ? 'bg-base-300 text-base-content'
      : studentState.state === 'unavailable'
        ? 'bg-base-100 text-base-content/80'
        : 'bg-info text-info-content'}"
>
  {#if $pickerState.configureMode}
    <div class="text-xs">
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
    <span class="text-xl">{studentState.name}</span>
  {/if}
</div>
