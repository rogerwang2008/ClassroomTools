import { get } from "svelte/store";
import { type Persisted, persisted } from "svelte-persisted-store";
import { readStudentsCsv } from "$lib/students-info/util";

export interface Student {
  name: string;
  gender: "male" | "female";
  canBeHumanMachine: boolean;
  rhymeVerses: string[] | undefined;
  audio: StudentAudioOfReader;
}

export interface StudentAudioOfReader {
  audio: string[];
  humanMachineAudio: string[];
}

export type StudentsRecord = Record<string, Student>;

export const studentsInfo: Persisted<StudentsRecord> = persisted("studentsInfo", {});

export const initStudentsInfo = async () => {
  if (Object.keys(get(studentsInfo)).length === 0) {
    console.log("从 CSV 载入学生列表");
    studentsInfo.set(await readStudentsCsv());
  }
};
