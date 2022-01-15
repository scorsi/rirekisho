<script context="module">
  import { loadTranslations } from "$lib/translations";

  export const load = async ({ url, params }) => {
    const { pathname } = url;

    const locale = params.lang || "fr";
    await loadTranslations(locale, pathname);

    return {};
  };
</script>

<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { darkModeStore, setDarkMode } from "$lib/darkmode.js";
  import { browser } from "$app/env";
  import { get } from "svelte/store";

  onMount(async () => {
    window.AOS = (await import("aos")).default;
    window.AOS.init();
  });

  if (browser) {
    window.onbeforeprint = function() {
      window.actualDarkMode = get(darkModeStore);
      setDarkMode(false);
    };
    window.onafterprint = function() {
      setDarkMode(window.actualDarkMode);
      delete window.actualDarkMode;
    };
  }
</script>

<slot />
