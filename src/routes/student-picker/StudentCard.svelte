<script lang="ts">
  import { changeAlreadyChosen, studentsStates, type StudentsStatesRecord } from "./states";
  import { pickerState } from "./config";
  import { studentsInfo } from "$lib/students-info";

  interface Props {
    studentId: keyof StudentsStatesRecord;
  }

  let { studentId }: Props = $props();
</script>

<button
  onclick={$pickerState.configureMode ? undefined : () => changeAlreadyChosen(studentId)}
  class="card border-base-300 h-24 w-32 items-center justify-center transition select-none
  {$pickerState.configureMode
    ? 'cursor-default'
    : $studentsStates[studentId].canChoose
      ? 'cursor-pointer'
      : 'cursor-not-allowed'}
  {$studentsStates[studentId].currentlyChosen
    ? 'bg-success text-success-content z-10 font-bold' +
      (!$pickerState.configureMode ? ' drop-shadow-lg' : '')
    : !$studentsStates[studentId].canChoose
      ? 'bg-base-100 text-base-content/70 border'
      : $studentsStates[studentId].alreadyChosen
        ? 'bg-base-300 text-base-content'
        : 'bg-info text-info-content'}"
>
  {#if $pickerState.configureMode}
    <div class="text-xs">
      <div class="font-bold">{studentId} {$studentsInfo[studentId].name}</div>
      <label class="block">
        权重
        <input
          type="number"
          class="input input-xs text-base-content w-20"
          bind:value={$studentsStates[studentId].weight}
          min="0"
        />
      </label>
      <div class="gap-2">
        <label>
          <input
            type="checkbox"
            class="checkbox checkbox-xs"
            bind:checked={$studentsStates[studentId].canChoose}
          />
          到场
        </label>
        <label>
          <input
            type="checkbox"
            class="checkbox checkbox-xs"
            bind:checked={$studentsStates[studentId].alreadyChosen}
          />
          选过
        </label>
      </div>
      <div>
        <b>统计: </b>
        本轮 {$studentsStates[studentId].roundTimesChosen}
        总计 {$studentsStates[studentId].totalTimesChosen}
      </div>
    </div>
  {:else}
    <span class="text-4xl">{studentId}</span>
    <span class="text-2xl">{$studentsInfo[studentId].name}</span>
  {/if}
</button>
