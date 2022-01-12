<script>
  import BlockContainer from "$lib/components/BlockContainer.svelte";
  import { hobbies } from "$lib/data.js";
  import Fa from "svelte-fa";
  import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

  let openedHobby = null;
  let toggleOpenedHobby = (hobby) => {
    openedHobby = hobby === openedHobby ? null : hobby;
  };
</script>

<BlockContainer>
  <h2 slot="title">
    Mes Hobbies
  </h2>
  <div slot="content">
    <ul class="text-center divide-y">
      {#each hobbies as hobby, i}
        <li class="py-1 print:py-2">
          <a class="text-lg cursor-pointer print:text-sm" on:click={toggleOpenedHobby.bind(null, i)}>
            {hobby.name}
            <Fa class="inline print:hidden" icon={openedHobby !== i ? faChevronDown : faChevronUp} />
          </a>
          <p class:hidden={openedHobby !== i} class="text-gray-600 print:hidden">{hobby.description}</p>
        </li>
      {/each}
    </ul>
  </div>
</BlockContainer>