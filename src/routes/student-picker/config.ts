import { type Persisted, persisted } from "svelte-persisted-store";
import { writable, type Writable } from "svelte/store";


export interface PickerConfig {
  disableAfterChosen: boolean;
}

export const pickerConfig: Persisted<PickerConfig> = persisted("student-picker/config", {
  disableAfterChosen: true,
})

export interface PickerState {
  configureMode: boolean;
}

export const pickerState: Writable<PickerState> = writable<PickerState>({
  configureMode: false,
})
