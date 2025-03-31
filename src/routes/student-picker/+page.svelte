<script lang="ts">
  import StudentCard from "./StudentCard.svelte";
  import { onMount, onDestroy } from "svelte";
  import { studentsStates } from "./states";
  import { ttsVoices } from "$lib/tts";
  import { initStudentsStates } from "./states";
  import { chooseStudentRandomly, resetCompletely, resetStates } from "./functions";
  import { pickerConfig, pickerState } from "./config";

  let mainElement: HTMLElement;
  let studentCardFatherElement: HTMLElement;
  let studentCardFatherZoom: number = $state(1);

  let studentCardFatherObserver: ResizeObserver;

  let readConfigDialog: HTMLDialogElement | null = $state(null);

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
    <button class="btn btn-primary" onclick={chooseStudentRandomly}>抽取学生</button>
    <label>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        bind:checked={$pickerConfig.disableAfterChosen}
      />
      避免重复
    </label>
    <button class="btn" onclick={() => resetStates($pickerState.resetTotalTimesChosen)}
      >重置
    </button>
    <label>
      <input type="checkbox" class="checkbox" bind:checked={$pickerState.resetTotalTimesChosen} />
      重置统计数据
    </label>
    <div class="flex-1"></div>
    <label>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        bind:checked={$pickerState.configureMode}
      />
      配置
    </label>
    <button
      onclick={() => {
        readConfigDialog?.showModal();
      }}
      class="btn"
      >播报设置
    </button>
    <dialog bind:this={readConfigDialog} class="modal">
      <div class="modal-box flex flex-col gap-4">
        <h3 class="text-lg font-bold">播报设置</h3>
        <select bind:value={$pickerConfig.speakMode} class="select">
          <option value={null}>不播报</option>
          <option value="tts">机器朗读</option>
          <option value="ttsVerse">机器朗读（带诗句）</option>
          <option value="human" disabled>甄仁基朗读（暂未实现）</option>
        </select>
        {#if $pickerConfig.speakMode === "tts" || $pickerConfig.speakMode === "ttsVerse"}
          <label class="flex items-center gap-3">
            <span class="flex-none">朗读者</span>
            <select bind:value={$pickerConfig.ttsConfig.voiceName} class="select flex-1">
              <option value={undefined}>默认</option>
              {#each $ttsVoices.filter( (voice) => voice.lang.startsWith("zh"), ) as voice (voice.name)}
                <option value={voice.name}>{voice.name} ({voice.lang})</option>
              {/each}
            </select>
          </label>
          <label class="flex items-center gap-3">
            <span class="flex-none">语速</span>
            <input
              type="number"
              bind:value={$pickerConfig.ttsConfig.rate}
              min="0"
              step="0.1"
              class="input flex-1/5"
            />
            <input
              type="range"
              bind:value={$pickerConfig.ttsConfig.rate}
              min="0.5"
              max="2"
              step="0.1"
              class="range range-primary flex-4/5"
            />
          </label>
          <label class="flex items-center gap-3">
            <span class="flex-none">语调</span>
            <input
              type="number"
              bind:value={$pickerConfig.ttsConfig.pitch}
              min="0"
              step="0.1"
              class="input flex-1/5"
            />
            <input
              type="range"
              bind:value={$pickerConfig.ttsConfig.pitch}
              min="0.5"
              max="2"
              step="0.1"
              class="range range-primary flex-4/5"
            />
          </label>
        {/if}
        <div class="modal-action">
          <form method="dialog">
            <!-- svelte-ignore a11y_autofocus -->
            <button autofocus class="btn btn-primary">确定</button>
          </form>
        </div>
      </div>
    </dialog>
    <div class="tooltip tooltip-left" data-tip="从 CSV 刷新学生信息并重置所有学生状态">
      <button class="btn btn-warning" onclick={resetCompletely}>完全重置</button>
    </div>
    <button class="btn btn-primary" onclick={chooseStudentRandomly}>抽取学生</button>
  </div>
  <main bind:this={mainElement} class="flex flex-1 overflow-hidden">
    <div
      bind:this={studentCardFatherElement}
      class="m-auto inline-grid w-auto grid-cols-[repeat(8,minmax(min-content,max-content))] gap-2 p-4"
      style:zoom={studentCardFatherZoom}
    >
      {#each Object.keys($studentsStates) as studentId (studentId)}
        <StudentCard {studentId}></StudentCard>
      {/each}
    </div>
  </main>
</div>

<style>
  :global(html, body) {
    overflow: hidden;
    scrollbar-width: none;
  }
</style>
