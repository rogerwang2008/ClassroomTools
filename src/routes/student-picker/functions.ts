import { deselectStudent, resetStudentsStates, selectStudent, type StudentsStatesRecord } from "./states";

let lastChosenId: string | undefined;

export const chooseStudentRandomly = (studentsStates: StudentsStatesRecord) => {
  if (lastChosenId !== undefined) deselectStudent(lastChosenId);
  const selectableIds = Object.keys(studentsStates).filter(
    (id) => studentsStates[id].state === false,
  );
  const totalWeight = selectableIds.reduce((acc, id) => acc + studentsStates[id].weight, 0);
  if (selectableIds.length === 0 || totalWeight === 0) return undefined;
  const randomWeight = Math.random() * totalWeight;
  let cumulatedWeight = 0;
  for (const id of selectableIds) {
    cumulatedWeight += studentsStates[id].weight;
    if (cumulatedWeight >= randomWeight) {
      lastChosenId = id;
      selectStudent(id);
      return id;
    }
  }
  return selectableIds[selectableIds.length - 1];
};


export const resetPicker = () => {
  resetStudentsStates();
  lastChosenId = undefined;
}
