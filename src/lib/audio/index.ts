import { browser } from "$app/environment";

const audioElement = browser ? new Audio() : undefined;

export const playAudio = (url: string, rate: number = 1, preservesPitch: boolean = false) => {
  if (!audioElement) return;
  audioElement.pause();
  audioElement.currentTime = 0;
  audioElement.src = url;
  audioElement.playbackRate = rate;
  audioElement.preservesPitch = preservesPitch;
  // noinspection JSIgnoredPromiseFromCall
  audioElement.play();
};



