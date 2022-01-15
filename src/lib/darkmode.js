import { writable } from "svelte/store";
import { browser } from "$app/env";

const isDarkModeEnabled = () =>
  browser && (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

const darkModeStore = writable(isDarkModeEnabled());

darkModeStore.subscribe(isDarkModeEnabled => {
  if (!browser) return;

  if (isDarkModeEnabled) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
});

const toggleDarkMode = () => darkModeStore.update(isDarkModeEnabled => !isDarkModeEnabled);

export {
  darkModeStore,
  toggleDarkMode
};
