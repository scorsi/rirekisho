<script>
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Parcours from "$lib/blocks/Parcours.svelte";
  import Competences from "$lib/blocks/Competences.svelte";
  import Hobbies from "$lib/blocks/Hobbies.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css">

  <title>CV de Sylvain Corsini</title>
</svelte:head>

<section class="container mx-auto lg:px-8">
  <div class="bg-gray-100 px-2 py-4 sm:my-12 sm:px-20 sm:py-16 sm:rounded-3xl sm:shadow-2xl print:bg-white print:my-0 print:p-4 print:shadow-none">
    <Header />
    <div class="mt-16 print:mt-8">
      <Parcours />
    </div>
    <div class="grid grid-cols-2 gap-8 mt-8 mb-16 print:mb-2 print:gap-4 print:mt-4">
      <Competences />
      <Hobbies />
    </div>
    <Footer />
  </div>
</section>
