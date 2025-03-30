import { type Persisted, persisted } from "svelte-persisted-store";
import { writable, type Writable } from "svelte/store";

export interface PickerConfig {
  disableAfterChosen: boolean;
  speakMode: null | "tts" | "ttsVerse" | "human";
  ttsConfig: {
    voiceName: string | undefined;
    pitch: number;
    rate: number;
  };
}

export const pickerConfig: Persisted<PickerConfig> = persisted("student-picker/config", {
  disableAfterChosen: true,
  speakMode: "ttsVerse",
  ttsConfig: {
    voiceName: undefined,
    pitch: 1,
    rate: 1,
  },
});

export interface PickerState {
  configureMode: boolean;
}

export const pickerState: Writable<PickerState> = writable<PickerState>({
  configureMode: false,
});
