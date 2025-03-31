import { get } from "svelte/store";
import { studentsInfo } from "$lib/students-info";
import { playAudio } from "$lib/audio";

export const playStudentAudio = (id: string, rate: number = 1, preservesPitch: boolean = false, isHumanMachine: boolean = false) => {
  if (!get(studentsInfo)[id]) throw new Error(`Unknown student id: ${id}`);
  const audioList = !get(studentsInfo)[id].audio.humanMachineAudio.length
    ? get(studentsInfo)[id].audio.audio
    : get(studentsInfo)[id].audio[isHumanMachine ? "humanMachineAudio" : "audio"];
  const audioToPlay = audioList[Math.floor(Math.random() * audioList.length)];
  return playAudio(audioToPlay, rate, preservesPitch);
};
