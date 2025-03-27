import { persisted, type Persisted } from "svelte-persisted-store";
import { get } from "svelte/store";
import { initStudentsInfo, studentsInfo, type StudentsRecord } from "$lib/students-info";
import { pickerConfig } from "./config";

export type State = boolean | "disabled" | "unavailable";

export interface StudentState {
  currentlyChosen: boolean;
  alreadyChosen: boolean;
  canChoose: boolean;
  weight: number;
}

export type StudentsStatesRecord = Record<keyof StudentsRecord, StudentState>;

export const studentsStates: Persisted<StudentsStatesRecord> = persisted(
  "student-picker/studentsStates",
  {},
);

export const initStudentsStates = async () => {
  if (Object.keys(get(studentsInfo)).length === 0) {
    await initStudentsInfo();
    studentsStates.reset();
  }
  if (Object.keys(get(studentsStates)).length === 0) {
    const initStates: StudentsStatesRecord = {};
    Object.keys(get(studentsInfo)).forEach((id) => {
      initStates[id] = {
        currentlyChosen: false,
        alreadyChosen: false,
        canChoose: true,
        weight: 1,
      };
    });
    studentsStates.set(initStates);
    return;
  }
  for (const [key, student] of Object.entries(get(studentsStates)!)) {
    if (student.currentlyChosen) {
      deselectStudent(key);
    }
  }
};

export const deselectStudent = (id: string) => {
  studentsStates.update((states) => {
    if (states[id].currentlyChosen && get(pickerConfig).disableAfterChosen)
      states[id].alreadyChosen = true;
    states[id].currentlyChosen = false;
    return states;
  });
};

export const selectStudent = (id: string) => {
  studentsStates.update((states) => {
    if (!states[id].currentlyChosen && get(pickerConfig).disableAfterChosen)
      states[id].alreadyChosen = true;
    states[id].currentlyChosen = true;
    return states;
  });
};

export const resetChosenStates = (resetCanChoose: boolean = false) => {
  studentsStates.update((states) => {
    Object.values(states!).forEach((student: StudentState) => {
      if (resetCanChoose) student.canChoose = true;
      student.currentlyChosen = false;
      student.alreadyChosen = false;
    });
    return states;
  });
};
