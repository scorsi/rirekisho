<script>
  import BlockContainer from "$lib/components/BlockContainer.svelte";
  import competences from "$lib/data/competences.json";
  import { tooltip } from "$lib/tooltip";
</script>

<BlockContainer>
  <h2 slot="title">
    Mes Compétences
  </h2>
  <div slot="content">
    <div class="grid grid-rows divide-y gap-2">
      {#each competences as cat}
        <div class="grid md:grid-cols-3 gap-2 md:gap-4 items-center pt-2 first:pt-0">
          <div class="md:text-right text-gray-800 print:text-sm">{cat.name}</div>
          <div class="md:text-left md:col-span-2 flex gap-1">
            {#each cat.values as value}
              <a href={value.url} target="_blank">
                <img src={value.img}
                     title={value.name}
                     use:tooltip
                     class="w-8 sm:w-10 print:w-6" />
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</BlockContainer>