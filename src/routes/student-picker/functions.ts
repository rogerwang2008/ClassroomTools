import { get } from "svelte/store";
import { invalidateAll } from "$app/navigation";
import { studentsInfo } from "$lib/students-info";
import { deselectStudent, resetChosenStates, selectStudent, studentsStates } from "./states";
import { pickerConfig } from "./config";
import { speakStudent, speakStudentPoem } from "$lib/students-speak/tts";

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
    case "ttsPoem":
      speakStudentPoem(
        lastChosenId,
        get(pickerConfig).ttsConfig.voiceName,
        get(pickerConfig).ttsConfig.pitch,
        get(pickerConfig).ttsConfig.rate,
      );
      break;
    case "human":
      console.warn("Human mode not implemented yet. Not speaking")
      break;
    default:
      throw new Error("Invalid speakMode");
  }
};

export const resetStates = async () => {
  resetChosenStates();
  lastChosenId = undefined;
};

export const resetCompletely = async () => {
  studentsInfo.reset();
  pickerConfig.reset();
  await invalidateAll();
  location.reload();
};
