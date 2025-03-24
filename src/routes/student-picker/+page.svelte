<script lang="ts">
  import StudentCard from "./StudentCard.svelte";
  import { onMount, onDestroy } from "svelte";

  let mainElement: HTMLElement;
  let studentCardFatherElement: HTMLElement;
  let studentCardFatherZoom: number = $state(1);

  let studentCardFatherObserver: ResizeObserver;

  onMount(() => {
    if (mainElement && studentCardFatherElement) {
      studentCardFatherObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (!entry.contentBoxSize) {continue;}
          console.log(mainElement.clientWidth, studentCardFatherElement.clientWidth)
          if (mainElement.clientWidth / mainElement.clientHeight > studentCardFatherElement.clientWidth / studentCardFatherElement.clientHeight) {
            studentCardFatherZoom = mainElement.clientHeight / studentCardFatherElement.clientHeight;
          } else {
            studentCardFatherZoom = mainElement.clientWidth / studentCardFatherElement.clientWidth;
          }
        }
      });
      studentCardFatherObserver.observe(mainElement);
    }
  });

  onDestroy(() => {
      studentCardFatherObserver.disconnect();
    },
  );

</script>

<main bind:this={mainElement} class="flex size-[98%] mx-auto mb-[2%]">
  <div bind:this={studentCardFatherElement}
       class="inline-grid grid-cols-[repeat(8,minmax(min-content,max-content))] gap-2 m-auto w-auto"
       style="zoom: {studentCardFatherZoom}"
  >
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>
    <StudentCard studentId={1} studentName="张某某"></StudentCard>

  </div>

</main>
