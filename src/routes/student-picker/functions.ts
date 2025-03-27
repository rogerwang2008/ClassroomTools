import { get } from "svelte/store";
import { invalidateAll } from "$app/navigation";
import { studentsInfo } from "$lib/students-info";
import { deselectStudent, resetChosenStates, selectStudent, studentsStates } from "./states";

let lastChosenId: string | undefined;

export const chooseStudentRandomly = async () => {
  if (lastChosenId !== undefined) deselectStudent(lastChosenId);
  const selectableIds = Object.keys(get(studentsStates)).filter(
    (id) => get(studentsStates)[id].canChoose && !get(studentsStates)[id].alreadyChosen,
  );
  const totalWeight = selectableIds.reduce((acc, id) => acc + get(studentsStates)[id].weight, 0);
  if (selectableIds.length === 0 || totalWeight === 0) return undefined;
  const randomWeight = Math.random() * totalWeight;
  let cumulatedWeight = 0;
  for (const id of selectableIds) {
    cumulatedWeight += get(studentsStates)[id].weight;
    if (cumulatedWeight >= randomWeight) {
      lastChosenId = id;
      selectStudent(id);
      return id;
    }
  }
  return selectableIds[selectableIds.length - 1];
};

export const resetStates = async () => {
  resetChosenStates();
  lastChosenId = undefined;
};

export const resetCompletely = async () => {
  studentsInfo.reset();
  await invalidateAll();
  location.reload();
};
