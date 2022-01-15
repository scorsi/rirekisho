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
</script>

<slot />
