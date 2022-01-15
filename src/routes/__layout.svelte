<script context="module">
  import { loadTranslations } from "$lib/translations";

  export const load = async ({ url }) => {
    const { pathname } = url;

    const locale = "fr";
    await loadTranslations(locale, pathname);

    return {};
  };
</script>

<script>
  import "../app.css";
</script>

<slot />
