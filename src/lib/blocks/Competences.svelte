<script>
  import BlockContainer from "$lib/components/BlockContainer.svelte";
  import competences from "$lib/data/competences.json";
  import { tooltip } from "$lib/tooltip";
  import { t } from "$lib/translations.js";
</script>

<BlockContainer>
  <h2 slot="title">
    {$t('common.competences_title')}
  </h2>
  <div slot="content">
    <div class="grid grid-rows divide-y gap-2">
      {#each competences as cat, i}
        <div class="grid md:grid-cols-3 print:grid-cols-3 gap-2 md:gap-4 print:gap-4 items-center pt-2 first:pt-0">
          <div class="md:text-right print:text-right text-gray-800 print:text-sm">{$t(`competences.${i}`)}</div>
          <div class="md:text-left print:text-right md:col-span-2 print:col-span-2 flex gap-1">
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