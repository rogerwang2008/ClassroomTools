import { get } from "svelte/store";
import { studentsInfo } from "$lib/students-info";
import { ttsSpeak } from "$lib/tts";
import { namePronunciationFix, numberToChineseChars, versePronunciationFix } from "$lib/tts/converters";

export const speakStudent = (
  id: string,
  voice: SpeechSynthesisVoice | string | undefined,
  pitch: number = 1,
  rate: number = 1,
) => {
  if (!get(studentsInfo)[id]) throw new Error(`Unknown student id: ${id}`);
  ttsSpeak(`${id}，${namePronunciationFix(get(studentsInfo)[id].name)}`, voice, pitch, rate);
};

export const speakStudentVerse = (
  id: string,
  voice: SpeechSynthesisVoice | string | undefined,
  pitch: number = 1,
  rate: number = 1,
) => {
  if (!get(studentsInfo)[id]) throw new Error(`Unknown student id: ${id}`);
  const rhymeVerses = get(studentsInfo)[id].rhymeVerses;
  if (rhymeVerses === undefined || !rhymeVerses.length) return speakStudent(id, voice, pitch, rate);
  const verse = rhymeVerses[Math.floor(Math.random() * rhymeVerses.length)];
  ttsSpeak(
    versePronunciationFix(verse) +
      "，" +
      numberToChineseChars(parseInt(id), 7 - get(studentsInfo)[id].name.length) +
      namePronunciationFix(get(studentsInfo)[id].name),
    voice,
    pitch,
    rate,
  );
};
