<script lang="ts">
  import StudentCard from "./StudentCard.svelte";
  import { onMount, onDestroy } from "svelte";
  import { initStudentsStates, studentsStates } from "./states";
  import { chooseStudentRandomly, resetCompletely, resetStates } from "./functions";
  import { pickerConfig, pickerState } from "./config";
  import { studentsInfo } from "$lib/students-info";

  let mainElement: HTMLElement;
  let studentCardFatherElement: HTMLElement;
  let studentCardFatherZoom: number = $state(1);

  let studentCardFatherObserver: ResizeObserver;

  onMount(async () => {
    await initStudentsStates();

    if (mainElement && studentCardFatherElement) {
      studentCardFatherObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (!entry.contentBoxSize) {
            continue;
          }
          if (
            mainElement.clientWidth / mainElement.clientHeight >
            studentCardFatherElement.clientWidth / studentCardFatherElement.clientHeight
          ) {
            studentCardFatherZoom =
              mainElement.clientHeight / studentCardFatherElement.clientHeight;
          } else {
            studentCardFatherZoom = mainElement.clientWidth / studentCardFatherElement.clientWidth;
          }
        }
      });
      studentCardFatherObserver.observe(mainElement);
    }
  });

  onDestroy(() => {
    if (studentCardFatherObserver) studentCardFatherObserver.disconnect();
  });
</script>

<div class="flex h-full flex-col">
  <div class="navbar flex-none gap-2">
    <button
      class="btn btn-primary"
      onclick={chooseStudentRandomly}
      >抽取学生
    </button>
    <button class="btn" onclick={resetStates}>重置</button>
    <label>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        bind:checked={$pickerConfig.disableAfterChosen}
      />
      避免重复
    </label>
    <div class="flex-1"></div>
    <label>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        bind:checked={$pickerState.configureMode}
      />
      设置模式
    </label>
    <button class="btn btn-warning" onclick={resetCompletely}>完全重置</button>
  </div>
  <main bind:this={mainElement} class="flex flex-1 overflow-hidden">
    <div
      bind:this={studentCardFatherElement}
      class="m-auto inline-grid w-auto grid-cols-[repeat(8,minmax(min-content,max-content))] gap-2 p-4"
      style="zoom: {studentCardFatherZoom}"
    >
      {#each Object.keys($studentsInfo) as studentId (studentId)}
        <StudentCard {studentId}></StudentCard>
      {/each}
    </div>
  </main>
</div>
