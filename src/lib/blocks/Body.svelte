<script>
  import TimelineList from "$lib/components/TimelineList.svelte";
  import BlockContainer from "$lib/components/BlockContainer.svelte";
  import { tooltip } from "$lib/tooltip.js";
  import { competences } from "$lib/data.js";
</script>

<div class="">

</div>

<div class="mt-16 print:mt-8">
  <BlockContainer>
    <h2 slot="title">
      Mon Parcours
    </h2>
    <TimelineList slot="content" />
  </BlockContainer>
</div>
<div class="grid grid-cols-2 gap-8 mt-8 mb-16 print:mb-2 print:gap-4 print:mt-4">
  <BlockContainer>
    <h2 slot="title">
      Mes Compétences
    </h2>
    <div slot="content">
      <div class="grid grid-rows divide-y gap-2">
        {#each competences as categorie}
          <div class="grid grid-cols-3 gap-4 items-center pt-2 first:pt-0">
            <div class="text-right text-gray-800 print:text-sm">{categorie.name}</div>
            <div class="text-left col-span-2 flex gap-1">
              {#each categorie.values as value}
                <a href={value.url} target="_blank">
                  <img src={value.img}
                       title={value.name}
                       use:tooltip
                       class="w-10 print:w-6" />
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </BlockContainer>
  <BlockContainer>
    <h2 slot="title">
      Mes Hobbies
    </h2>
    <div slot="content">
      <ul class="text-gray-600">
        <li><span class="text-black">Sport</span>: Vélo et course à pied.</li>
        <li><span class="text-black">Littérature</span>: Romans et mangas dans le thème fantastique et science fiction.
        </li>
        <li><span class="text-black">Dessin:</span> Avec tablette graphique.</li>
      </ul>
    </div>
  </BlockContainer>
</div>
