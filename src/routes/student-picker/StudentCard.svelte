<script lang="ts">
  import type { State } from "./states";

  interface Props {
    studentId: number,
    studentName: string,
    state?: State,
  }

  let { studentId, studentName, state = false }: Props = $props();
</script>

<div
  class='card w-32 h-24 items-center justify-center select-none
  {state === true ? "bg-success text-success-content"
    : state === "disabled" ? "bg-base-300 text-base-content"
    : state === "unavailable" ? "bg-base-100 text-base-content/80"
    : "bg-info text-info-content"}'>
  <span class="text-3xl">{studentId}</span>
  <span class="text-xl">{studentName}</span>
</div>

