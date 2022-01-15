<script>
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Parcours from "$lib/blocks/Career.svelte";
  import Competences from "$lib/blocks/Competences.svelte";
  import Hobbies from "$lib/blocks/Hobbies.svelte";
  import { t } from "$lib/translations";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { darkModeStore, toggleDarkMode } from "$lib/darkmode.js";
  import { base } from "$app/paths";

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

<section class="container mx-auto lg:px-8 md:mb-10 lg:mb-14">
  <div class="my-3 text-xs text-center lg:text-md lg:text-left sm:my-8 flex gap-8 items-center mx-8 print:hidden">
    <div>
      <button on:click={() => window.print()} class="bg-blue-600 text-white text-sm p-4 rounded-lg">{$t('common.print_text')}</button>
    </div>
    <div class="ml-auto">
      <span class="lg:inline text-sm font-medium text-gray-700 dark:text-white mr-0 lg:mr-2">{$t('common.dark_mode')}</span>
      <button on:click|preventDefault={() => toggleDarkMode()} class:bg-blue-600={$darkModeStore}
              class="bg-gray-200 align-middle relative lg:inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button" role="switch" aria-checked="false">
        <span class="sr-only">Use setting</span>
        <span aria-hidden="true" class:translate-x-5={$darkModeStore}
              class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
      </button>
    </div>
    <div>
      <span class="inline text-sm font-medium text-gray-700 dark:text-white mr-2">Langue</span>
      <select bind:value={selectedLang} on:change={() => {goto(`${base}/${selectedLang}/`)}} id="location" name="location"
              class="mt-1 inline pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option selected={$page.params.lang === "fr"} value="fr">Français</option>
        <option selected={$page.params.lang === "en"} value="en">English</option>
      </select>
    </div>
  </div>

  <div
    class="bg-gray-100 px-2 py-8 pb-36 sm:my-8 sm:px-20 sm:py-16 sm:rounded-3xl sm:shadow-2xl dark:bg-black print:bg-white print:my-0 print:p-4 print:shadow-none">
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
