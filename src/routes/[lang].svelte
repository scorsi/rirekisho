<script>
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Parcours from "$lib/blocks/Career.svelte";
  import Competences from "$lib/blocks/Competences.svelte";
  import Hobbies from "$lib/blocks/Hobbies.svelte";
  import { t } from "$lib/translations";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let selectedLang = $page.params.lang;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css">

  <title>{$t('common.title')}</title>
</svelte:head>

<section class="container mx-auto lg:px-8">
  <div class="sm:my-8 flex flex-row-reverse gap-4 items-center px-4 print:hidden">
    <div>
      <span class="inline text-sm font-medium text-gray-700">Langue</span>
      <select bind:value={selectedLang} on:change={() => {goto(`/${selectedLang}/`)}} id="location" name="location"
              class="mt-1 inline pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option selected={$page.params.lang === "fr"} value="fr">Français</option>
        <option selected={$page.params.lang === "en"} value="en">English</option>
      </select>
    </div>
  </div>

  <div
    class="bg-gray-100 px-2 py-4 sm:my-8 sm:px-20 sm:py-16 sm:rounded-3xl sm:shadow-2xl print:bg-white print:my-0 print:p-4 print:shadow-none">
    <Header />
    <div class="mt-8 md:mt-16 print:mt-8">
      <Parcours />
    </div>
    <div
      class="grid lg:grid-cols-2 print:grid-cols-2 gap-4 lg:gap-8 mt-4 md:mt-8 mb-8 md:mb-16 print:mb-2 print:gap-4 print:mt-4">
      <Competences />
      <Hobbies />
    </div>
    <Footer />
  </div>
</section>
