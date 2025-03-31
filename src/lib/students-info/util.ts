import Papa from "papaparse";
import { base } from "$app/paths";

import type { Student, StudentsRecord } from ".";

export const readStudentsCsv = async () => {
  const response = await fetch(`${base}/students/students.csv`);
  const parsedCsv = Papa.parse(await response.text(), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  const studentsRecord: StudentsRecord = parsedCsv.data.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: Record<string, Student>, row: any) => {
      if (row.rhymeVerses) row.rhymeVerses = row.rhymeVerses.split("|");
      row.audio = {
        audio: Array.from(
          { length: row.audioCount },
          (_, i) => `${base}/students/audio/audio_student_${row.id}_${i + 1}.mp3`,
        ),
        humanMachineAudio: Array.from(
          { length: row.humanMachineAudioCount },
          (_, i) => `${base}/students/audio/audio_student_${row.id}_human_machine_${i + 1}.mp3`,
        ),
      };
      acc[row.id] = row;
      return acc;
    },
    {},
  );
  return studentsRecord;
};

// interface AudioInfo {
//   readerIds: string[];
// }
//
// const audioExtensions = ["mp3"] as const;
//
// let audioInfo: AudioInfo | undefined;
//
// const getAudioInfo = async () => {
//   const infoResponse = await fetch(`${base}/students/audio/info.json`);
//   const info = await infoResponse.json();
//   return info as AudioInfo;
// };
//
// const getStudentReaderAudioList = async (
//   studentId: string,
//   readerId: string,
//   humanMachine: boolean,
// ) => {
//   const audioList: string[] = [];
//   for (
//     let verseId = 1;
//     verseId <= (get(studentsInfo)[studentId].rhymeVerses?.length ?? 0);
//     verseId++
//   ) {
//     let audioExists = false;
//     for (const extension of audioExtensions) {
//       const audioPath =
//         `/students/audio/audio_${readerId}_student_` +
//         `${studentId}${humanMachine ? "_human_machine" : ""}_${verseId}.${extension}`;
//       if (await checkFileExists(audioPath)) {
//         audioList.push(audioPath);
//         audioExists = true;
//         break;
//       }
//     }
//     if (!audioExists) break;
//   }
//   return audioList;
// };
//
// export const setStudentAudioList = async (id: string) => {
//   if (!(id in get(studentsInfo))) throw new Error(`Unknown student id: ${id}`);
//   if (!audioInfo) audioInfo = await getAudioInfo();
//   for (const readerId of audioInfo.readerIds) {
//     const audioLists = await Promise.all([
//       getStudentReaderAudioList(id, readerId, false),
//       getStudentReaderAudioList(id, readerId, true),
//     ]);
//     const thisReaderAudios: StudentAudioOfReader = {
//       audio: audioLists[0],
//       humanMachineAudio: audioLists[1],
//     };
//     studentsInfo.update((students) => {
//       students[id].audio[readerId] = thisReaderAudios;
//       return students;
//     });
//   }
// };
//
// export const getAllStudentsAudioList = async () => {
//   const promises = Object.keys(get(studentsInfo)).map((id) => setStudentAudioList(id));
//   await Promise.all(promises);
// };
