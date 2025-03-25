<script lang="ts">
  import StudentCard from "./StudentCard.svelte";
  import { onMount, onDestroy } from "svelte";
  import { initStudentsStates, studentsStates } from "./states";

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
          if (mainElement.clientWidth / mainElement.clientHeight > studentCardFatherElement.clientWidth / studentCardFatherElement.clientHeight) {
            studentCardFatherZoom = mainElement.clientHeight / studentCardFatherElement.clientHeight;
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
    },
  );

</script>
<div class="flex flex-col h-full">
  <div class="navbar flex-none"></div>
  <main bind:this={mainElement} class="flex grow">
    <div bind:this={studentCardFatherElement}
         class="inline-grid grid-cols-[repeat(8,minmax(min-content,max-content))] gap-2 m-auto p-2 w-auto"
         style="zoom: {studentCardFatherZoom}"
    >
      {#each $studentsStates as studentState (studentState.id)}
        <StudentCard studentId={studentState.id} studentName={studentState.name}
                     state={studentState.state}></StudentCard>
      {/each}
    </div>
  </main>

</div>
