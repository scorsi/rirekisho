<script>
  import Header from "$lib/blocks/Header.svelte";
  import Footer from "$lib/blocks/Footer.svelte";
  import Body from "$lib/blocks/Body.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet">
</svelte:head>

<div class="container mx-auto sm:px-6 lg:px-8">
  <div class="bg-gray-100 my-12 px-20 py-16 rounded-3xl shadow-2xl print:bg-white print:my-0 print:p-4 print:shadow-none">
    <Header />
    <Body />
    <Footer />
  </div>
</div>
