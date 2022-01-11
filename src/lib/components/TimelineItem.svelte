<script>
  import Fa from "svelte-fa";
  import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

  export let icon = faChevronRight;
  export let iconColor = "bg-blue-500";
  export let displayLateralBar = true;
</script>

<li>
  <div class="relative pb-8 print:pb-4">
    {#if displayLateralBar}
      <span class="absolute top-4 left-4 -ml-px h-full w-px bg-gray-200 print:left-3" aria-hidden="true"></span>
    {/if}
    <div class="relative flex space-x-3 print:space-x-2">
      <div>
        <span
          class="h-8 w-8 rounded-full {iconColor} flex items-center justify-center ring-8 ring-white text-white print:h-6 print:w-6 print:text-xs">
          <Fa icon={icon} />
        </span>
      </div>
      <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
        <div>
          <p class="text-lg text-gray-800 -mt-1 print:text-md print:-mt-2">
            <slot name="title" />
          </p>
          <div class="text-sm text-gray-500 print:text-xs">
            <slot name="description"></slot>
          </div>
        </div>
        <div class="text-right text-sm whitespace-nowrap text-gray-600 print:text-xs">
          <slot name="date" />
        </div>
      </div>
    </div>
  </div>
</li>