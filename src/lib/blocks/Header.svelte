<script>
  import {base} from "$app/paths";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faAt, faCompass, faPhone } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="flex items-center gap-4">
  <ul class="hidden print:text-xs print:block">
    <li>
      <Fa icon={faAt} class="inline" />
      <a href="mailto:contact@example.com" target="_blank" class="text-blue-400">contact@example.com</a>
    </li>
    <li>
      <Fa icon={faPhone} class="inline" />
      <a href="tel:+33000000000" target="_blank" class="text-blue-400">+33000000000</a>
    </li>
    <li>
      <Fa icon={faCompass} class="inline" />
      <a href="https://www.google.com/maps/place/La%20Madeleine/" target="_blank" class="text-blue-400">La Madeleine, Région de Lille, France</a>
    </li>
  </ul>
  <ul class="text-right ml-auto divide-y-2 divide-gray-300">
    <li class="py-2 text-shadow-lg print:text-shadow-none">
      <h1 class="text-6xl print:text-xl">Sylvain Corsini</h1>
      <p class="text-3xl print:text-lg">Développeur Cloud & Backend</p>
    </li>
    <li class="py-2 print:hidden">
      <ul class="text-gray-600">
        <li>
          <a href="mailto:contact@example.com" target="_blank" class="text-blue-400">contact@example.com</a>
          <Fa icon={faAt} class="inline" />
        </li>
        <li>
          <a href="tel:+33000000000" target="_blank" class="text-blue-400">+33000000000</a>
          <Fa icon={faPhone} class="inline" />
        </li>
        <li>
          <a href="https://www.google.com/maps/place/La%20Madeleine/" target="_blank" class="text-blue-400">La Madeleine, Région de Lille, France</a>
          <Fa icon={faCompass} class="inline" />
        </li>
      </ul>
    </li>
  </ul>
  <img src="{base}/img.png" class="rounded-full h-64 shadow-2xl print:shadow-none print:h-16" />
</div>