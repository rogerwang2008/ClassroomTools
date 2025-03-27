import { type Persisted, persisted } from "svelte-persisted-store";


export interface PickerConfig {
  disableAfterChosen: boolean;
}

export const pickerConfig: Persisted<PickerConfig> = persisted("student-picker/config", {
  disableAfterChosen: true,
})
