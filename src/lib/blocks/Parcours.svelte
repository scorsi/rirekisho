<script>
  import BlockContainer from "$lib/components/BlockContainer.svelte";
  import parcours from "$lib/data/parcours.json";
  import { faCheck, faChevronDown, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";

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
    Mon Parcours
  </h2>
  <ul class="-mb-8 print:-mb-4" slot="content">
    {#each parcours as e, i}
      <li>
        <div class="relative pb-8 print:pb-4">
          {#if i + 1 !== parcours.length}
            <span class="absolute top-4 left-4 -ml-px h-full w-px bg-gray-200 print:left-3" aria-hidden="true"></span>
          {/if}
          <div class="relative flex space-x-3 print:space-x-2">
            <div>
              <span
                class={`h-8 w-8 rounded-full ${e.type === "success" ? "bg-green-500" : "bg-blue-500"} flex items-center justify-center ring-8 ring-white text-white print:h-6 print:w-6 print:text-xs`}>
                <Fa icon={e.type === "success" ? faCheck : faChevronRight} />
              </span>
            </div>
            <div class="min-w-0 flex-1 flex flex-col pt-1.5">
              <div class="flex justify-between space-x-4">
                <div class="-mt-1 print:-mt-2">
                  <h3 class="text-lg text-gray-800 print:text-md print:inline">
                    {e.title}
                  </h3>
                  {#if e.company}
                    <h4 class="text-md print:text-xs print:inline">
                      <a href="{e.companyLink}" target="_blank" class="text-blue-400">{e.company}</a>
                      <span class="text-gray-500">{e.location}</span>
                    </h4>
                  {/if}
                </div>
                <div class="text-right text-sm whitespace-nowrap text-gray-600 print:text-xs">
                  {#if typeof e.date === "object"}
                    {e.date.from} <span class="text-gray-400">—</span> {e.date.to}
                    <span class="text-gray-400">({e.date.duration})</span>
                  {:else }
                    {e.date}
                  {/if}
                </div>
              </div>
              <div class="w-full text-sm text-gray-500 print:text-xs print:-mt-2">
                <p class="mt-2">{@html e.shortDescription}</p>
                <div class="print:hidden">
                  {#if e.longDescription}
                    <hr class="mt-2" />
                    <p class:hidden={openedExp !== i} class="mt-2">{@html e.longDescription}</p>
                    <a class="mt-4 block cursor-pointer" on:click={toggleOpenedExp.bind(null, i)}>
                      En voir {openedExp === i ? "moins" : "plus"}
                      <Fa class="inline" icon={openedExp === i ? faChevronUp : faChevronDown} />
                    </a>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</BlockContainer>