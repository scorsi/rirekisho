<script context="module">
  import { base } from "$app/paths";

  export const load = async () => {
    return {
      status: 301,
      redirect: `${base}/fr/`
    };
  };
</script>