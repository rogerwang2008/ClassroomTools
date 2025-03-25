import { initStudentsInfo, type Student, studentsInfo } from "$lib/students-info";
import { persisted, type Persisted } from "svelte-persisted-store";
import { get } from "svelte/store";

export type State = boolean | "disabled" | "unavailable";

export interface StudentState extends Student {
  state: State;
  weight: number;
}

export const studentsStates: Persisted<StudentState[]> = persisted("studentsStates", []);

export const initStudentsStates = async () => {
  await initStudentsInfo();
  if (!get(studentsStates).length) {
    const initStates = get(studentsInfo).map((student: Student) => ({
      ...student,
      state: false,
      weight: 1,
    }));
    studentsStates.set(initStates);
  }
};
