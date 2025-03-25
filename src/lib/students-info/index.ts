import { get } from "svelte/store";
import { type Persisted, persisted } from "svelte-persisted-store";
import { readStudentsCsv } from "$lib/students-info/util";

export interface Student {
  id: number;
  name: string;
}

export const studentsInfo: Persisted<Student[]> = persisted("studentsInfo", []);

export const initStudentsInfo = async () => {
  if (!get(studentsInfo).length) {
    studentsInfo.set(await readStudentsCsv());
  }
};
