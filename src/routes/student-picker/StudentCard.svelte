<script lang="ts">
  import type { StudentState } from "./states";

  interface Props {
    studentId: string;
    studentState: StudentState;
  }

  let { studentId, studentState }: Props = $props();
</script>

<div
  class="card h-24 w-32 items-center justify-center select-none
  {studentState.state === true
    ? 'bg-success text-success-content'
    : studentState.state === 'disabled'
      ? 'bg-base-300 text-base-content'
      : studentState.state === 'unavailable'
        ? 'bg-base-100 text-base-content/80'
        : 'bg-info text-info-content'}"
>
  <span class="text-3xl">{studentId}</span>
  <span class="text-xl">{studentState.name}</span>
</div>
