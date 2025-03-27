<script lang="ts">
  import StudentCard from "./StudentCard.svelte";
  import { onMount, onDestroy } from "svelte";
  import { initStudentsStates, studentsStates } from "./states";
  import { chooseStudentRandomly, resetPicker } from "./functions";
  import { pickerConfig, pickerState } from "./config";

  let mainElement: HTMLElement;
  let studentCardFatherElement: HTMLElement;
  let studentCardFatherZoom: number = $state(1);

  let studentCardFatherObserver: ResizeObserver;

  onMount(async () => {
    if (mainElement && studentCardFatherElement) {
      studentCardFatherObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (!entry.contentBoxSize) {
            continue;
          }
          console.log(mainElement.clientWidth, studentCardFatherElement.clientWidth);
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

    await initStudentsStates();
    console.log($studentsStates);
  });

  onDestroy(() => {
    if (studentCardFatherObserver) studentCardFatherObserver.disconnect();
  });
</script>

<div class="flex h-full flex-col">
  <div class="navbar flex-none gap-2">
    <button
      class="btn btn-primary"
      onclick={() => {
        chooseStudentRandomly($studentsStates);
      }}
      >抽取学生
    </button>
    <button
      class="btn"
      onclick={() => {
        resetPicker();
      }}
      >重置
    </button>
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
  </div>
  <main bind:this={mainElement} class="flex flex-1 overflow-hidden">
    <div
      bind:this={studentCardFatherElement}
      class="m-auto inline-grid w-auto grid-cols-[repeat(8,minmax(min-content,max-content))] gap-2 p-4"
      style="zoom: {studentCardFatherZoom}"
    >
      {#each Object.entries($studentsStates) as [id, studentState] (id)}
        <StudentCard studentId={id} {studentState}></StudentCard>
      {/each}
    </div>
  </main>
</div>
