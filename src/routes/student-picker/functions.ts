import { get } from "svelte/store";
import { invalidateAll } from "$app/navigation";
import { studentsInfo } from "$lib/students-info";
import { deselectStudent, resetChosenStates, selectStudent, studentsStates } from "./states";
import { pickerConfig } from "./config";
import { speakStudent, speakStudentVerse } from "$lib/students-speak/tts";
import { playStudentAudio } from "$lib/students-speak/audio";

let lastChosenId: string | undefined;

const isHumanMachine = (id: string) => {
  if (!get(studentsInfo)[id]) throw new Error(`Unknown student id: ${id}`);
  return (
    get(studentsInfo)[id].canBeHumanMachine &&
    (get(studentsStates)[id].totalTimesChosen > 1 || Math.random() <= 0.03)
  );
};

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
      break;
    }
  }
  if (lastChosenId === undefined)
    throw new Error("chooseStudentRandomly reached its end. This should never happen");
  switch (get(pickerConfig).speakMode) {
    case null:
      break;
    case "tts":
      speakStudent(
        lastChosenId,
        get(pickerConfig).ttsConfig.voiceName,
        get(pickerConfig).ttsConfig.pitch,
        get(pickerConfig).ttsConfig.rate,
      );
      break;
    case "ttsVerse":
      speakStudentVerse(
        lastChosenId,
        get(pickerConfig).ttsConfig.voiceName,
        get(pickerConfig).ttsConfig.pitch,
        get(pickerConfig).ttsConfig.rate,
        isHumanMachine(lastChosenId),
      );
      break;
    case "audio":
      playStudentAudio(
        lastChosenId,
        get(pickerConfig).audioConfig.rate,
        get(pickerConfig).audioConfig.preservesPitch,
        isHumanMachine(lastChosenId),
      );
      break;
    default:
      throw new Error("Invalid speakMode");
  }
};

export const resetStates = async (
  resetCanChoose: boolean = false,
  resetTotalTimesChosen: boolean = false,
) => {
  resetChosenStates(resetCanChoose, resetTotalTimesChosen);
  lastChosenId = undefined;
};

export const resetCompletely = async () => {
  studentsInfo.reset();
  studentsStates.reset();
  pickerConfig.reset();
  await invalidateAll();
  location.reload();
};
