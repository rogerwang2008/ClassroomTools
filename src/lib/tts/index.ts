import { derived, get, readable } from "svelte/store";
import { browser } from "$app/environment";

const synth = browser ? window.speechSynthesis : undefined;

export const ttsVoices = readable([] as SpeechSynthesisVoice[], (set) => {
  if (!synth) return;
  console.log("ttsVoices");
  set(synth.getVoices());
  synth.onvoiceschanged = () => {
    set(synth.getVoices());
  };
});

export const defaultVoice = derived(
  ttsVoices,
  (voices) => voices.find((voice) => voice.default) || voices[0],
);

export const ttsSpeak = (
  text: string,
  voice: SpeechSynthesisVoice | string | undefined,
  pitch: number = 1,
  rate: number = 1,
) => {
  if (!synth) return;
  if (typeof voice === "string") voice = getTtsVoiceByName(voice);
  if (!voice) voice = get(defaultVoice);
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voice;
  utter.pitch = pitch;
  utter.rate = rate;
  synth.cancel();
  synth.speak(utter);
};

export const getTtsVoiceByName = (name: string) => {
  const voices = get(ttsVoices);
  return voices.find((voice) => voice.name === name);
};
