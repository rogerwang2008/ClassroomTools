import { persisted, type Persisted } from "svelte-persisted-store";
import { get } from "svelte/store";
import { initStudentsInfo, type Student, studentsInfo } from "$lib/students-info";
import { pickerConfig } from "./config";

export type State = boolean | "disabled" | "unavailable";

export interface StudentState extends Student {
  state: State;
  weight: number;
}

export type StudentsStatesRecord = Record<string, StudentState>;

export const studentsStates: Persisted<StudentsStatesRecord> = persisted(
  "student-picker/studentsStates",
  {},
);

export const initStudentsStates = async () => {
  await initStudentsInfo();
  if (Object.keys(get(studentsStates)).length === 0) {
    const initStates = get(studentsInfo)!;
    // @ts-expect-error: TS2345
    Object.values(initStates).forEach((student: StudentState) => {
      student.state = false;
      student.weight = 1;
    });
    studentsStates.set(initStates as StudentsStatesRecord);
    return;
  }
  for (const [key, student] of Object.entries(get(studentsStates)!)) {
    if (student.state === true) {
      deselectStudent(key);
    }
  }
};

export const deselectStudent = (id: string) => {
  studentsStates.update((states) => {
    states![id].state = get(pickerConfig).disableAfterChosen ? "disabled" : false;
    return states;
  });
};

export const selectStudent = (id: string) => {
  studentsStates.update((states) => {
    states![id].state = true;
    return states;
  });
};

export const resetStudentsStates = (resetUnavailable: boolean = false) => {
  studentsStates.update((states) => {
    Object.values(states!).forEach((student: StudentState) => {
      if (resetUnavailable || student.state !== "unavailable") {
        student.state = false;
      }
    });
    return states;
  });
};
