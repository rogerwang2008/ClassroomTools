<script lang="ts">
  import StudentCard from "./StudentCard.svelte";
  import { onMount, onDestroy } from "svelte";
  import { initStudentsStates, resetStudentsStates, studentsStates } from "./states";
  import { chooseStudentRandomly } from "./functions";

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
  <div class="navbar flex-none">
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
        resetStudentsStates();
      }}
      >重置
    </button>
  </div>
  <main bind:this={mainElement} class="flex grow">
    <div
      bind:this={studentCardFatherElement}
      class="m-auto inline-grid w-auto grid-cols-[repeat(8,minmax(min-content,max-content))] gap-2 p-4"
      style="zoom: {studentCardFatherZoom}"
    >
      {#if $studentsStates !== undefined}
        {#each Object.entries($studentsStates) as [id, studentState] (id)}
          <StudentCard studentId={id} {studentState}></StudentCard>
        {/each}
      {/if}
    </div>
  </main>
</div>
