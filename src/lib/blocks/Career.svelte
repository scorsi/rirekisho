<script>
  import BlockContainer from "$lib/components/BlockContainer.svelte";
  import career from "$lib/data/career.json";
  import { faCheck, faChevronDown, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import { t } from "$lib/translations.js";

  let openedExp = null;

  let toggleOpenedExp = (exp) => {
    if (openedExp === exp) {
      openedExp = null;
    } else {
      openedExp = exp;
    }
  };
</script>

<BlockContainer>
  <h2 slot="title">
    {$t('common.career_title')}
  </h2>
  <ul class="-mb-8 print:-mb-4" slot="content">
    {#each career as e, i}
      <li data-aos="fade-up" data-aos-offset="250">
        <div class="relative pb-8 print:pb-4">
          {#if i + 1 !== career.length}
            <span class="absolute top-4 left-4 -ml-px h-full w-px bg-gray-200 print:left-3" aria-hidden="true"></span>
          {/if}
          <div class="relative flex space-x-3 print:space-x-2">
            <div>
              <span
                class={`h-8 w-8 rounded-full ${e.type === "success" ? "bg-green-500" : "bg-blue-500"} flex items-center justify-center ring-8 ring-white dark:ring-gray-900 text-white print:h-6 print:w-6 print:text-xs`}>
                <Fa icon={e.type === "success" ? faCheck : faChevronRight} />
              </span>
            </div>
            <div class="min-w-0 flex-1 flex flex-col pt-1.5">
              <div class="md:flex justify-between md:space-x-4">
                <div class="-mt-1 print:-mt-2">
                  <h3 class="sm:text-lg md:text-xl text-gray-800 print:text-md print:inline dark:text-gray-200">
                    {$t(`career.${i}.title`)}
                  </h3>
                  {#if e.company}
                    <h4 class="print:text-xs print:inline">
                      <a href="{e.companyLink}" target="_blank" class="text-blue-400">{e.company}</a>
                      <span class="text-gray-500 dark:text-gray-400">{e.location}</span>
                    </h4>
                  {/if}
                </div>
                <div class="md:text-right text-xs md:text-sm whitespace-nowrap text-gray-600 dark:text-gray-300 print:text-xs">
                  {#if typeof e.date === "object"}
                    {e.date.from} <span class="text-gray-400">—</span> {e.date.to}
                    <span class="text-gray-400">({e.date.duration})</span>
                  {:else }
                    {e.date}
                  {/if}
                </div>
              </div>
              <div class="w-full text-sm text-gray-500 dark:text-gray-300 print:text-xs print:-mt-2">
                <p class="mt-2">{$t(`career.${i}.shortDescription`)}</p>
                <div class="print:hidden">
                  <hr class="mt-2" />
                  <p class:hidden={openedExp !== i} class="mt-2">{@html $t(`career.${i}.longDescription`)}</p>
                  <a class="mt-4 block cursor-pointer" on:click={toggleOpenedExp.bind(null, i)}>
                    {openedExp === i ? $t('common.see_less') : $t('common.see_more')}
                    <Fa class="inline" icon={openedExp === i ? faChevronUp : faChevronDown} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</BlockContainer>