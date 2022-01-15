<script>
  import BlockContainer from "$lib/components/BlockContainer.svelte";
  import { numbers } from "$lib/data/hobbies.json";
  import Fa from "svelte-fa";
  import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
  import { t } from "$lib/translations.js";

  let openedHobby = null;
  let toggleOpenedHobby = (hobby) => {
    openedHobby = hobby === openedHobby ? null : hobby;
  };
</script>

<BlockContainer>
  <h2 slot="title">
    {$t('common.hobbies_title')}
  </h2>
  <div slot="content">
    <ul class="md:text-center divide-y">
      {#each Array(numbers) as _, i}
        <li class="py-1 print:py-2">
          <a class="sm:text-lg cursor-pointer print:text-sm" on:click={toggleOpenedHobby.bind(null, i)}>
            {$t(`hobbies.${i}.title`)}
            <Fa class="inline print:hidden" icon={openedHobby !== i ? faChevronDown : faChevronUp} />
          </a>
          <p class:hidden={openedHobby !== i} class="text-gray-600 print:hidden">{$t(`hobbies.${i}.description`)}</p>
        </li>
      {/each}
    </ul>
  </div>
</BlockContainer>