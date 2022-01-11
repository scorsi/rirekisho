<script>
  import { base } from "$app/paths";
  import Fa from "svelte-fa/src/fa.svelte";
  import QRCode from "qrcode-svg";
  import { faAt, faCompass, faPhone, faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

  const qrcode = new QRCode({
    content: "https://scorsi.github.io/resume/",
    padding: 0,
    width: 64,
    height: 64,
    ecl: "H",
    join: true,
    color: "white",
    background: "transparent"
  });
</script>

<div class="flex items-center gap-4">
  <img src="{base}/img.png" class="rounded-full h-64 shadow-2xl print:shadow-none print:h-16" />
  <ul class="divide-y-2 divide-gray-300">
    <li class="py-2 font-light text-shadow-lg print:text-shadow-none">
      <h1 class="text-7xl print:text-xl">Sylvain Corsini</h1>
      <p class="text-5xl text-gray-600 print:text-lg">Développeur Cloud & Fullstack</p>
    </li>
    <li class="py-2 print:hidden">
      <ul class="text-gray-600">
        <li>
          <Fa icon={faAt} class="inline" />
          <a href="mailto:contact@example.com" target="_blank" class="text-blue-400 ml-1">
            contact@example.com
          </a>
        </li>
        <li>
          <Fa icon={faPhone} class="inline" />
          <a href="tel:+33000000000" target="_blank" class="text-blue-400 ml-1">
            +33000000000
          </a>
        </li>
        <li>
          <Fa icon={faCompass} class="inline" />
          <a href="https://www.google.com/maps/place/La%20Madeleine/" target="_blank" class="text-blue-400 ml-1">
            La Madeleine, Région de Lille, France
          </a>
        </li>
      </ul>
    </li>
  </ul>
  <ul class="ml-auto place-self-start rounded-lg bg-blue-600 text-white p-3 print:hidden">
    <li class="flex items-center p-1 rounded hover:bg-blue-400">
      <i class="devicon-github-plain text-2xl"></i>
      <a href="https://github.com/scorsi" target="_blank" class="ml-2">scorsi</a>
    </li>
    <li class="flex items-center mt-1 p-1 rounded hover:bg-blue-400">
      <i class="devicon-linkedin-plain text-2xl"></i>
      <a href="https://www.linkedin.com/in/dev-scorsi/" target="_blank" class="ml-2">dev-scorsi</a>
    </li>
  </ul>
  <ul class="text-gray-600 text-xs text-right hidden ml-auto print:block">
    <li>
      <a href="mailto:contact@example.com" target="_blank" class="text-blue-400 mr-1">
        contact@example.com
      </a>
      <Fa icon={faAt} class="inline" />
    </li>
    <li>
      <a href="tel:+33000000000" target="_blank" class="text-blue-400 mr-1">
        +33000000000
      </a>
      <Fa icon={faPhone} class="inline" />
    </li>
    <li>
      <a href="https://www.google.com/maps/place/La%20Madeleine/" target="_blank" class="text-blue-400 mr-1">
        La Madeleine, Région de Lille, France
      </a>
      <Fa icon={faCompass} class="inline" />
    </li>
  </ul>
  <div class="hidden rounded px-1 pb-1 text-center flex flex-col bg-blue-500 text-white print:block">
    <span class="text-xs">version en ligne</span>
    <div class="px-1 py-0.5">
      {@html qrcode.svg()}
    </div>
  </div>
</div>
<hr class="hidden mt-2 print:block" />
<div class="flex mt-16 print:mt-6">
  <div class="text-center text-md text-gray-600 relative mx-auto print:text-xs print:text-left print:ml-20">
    <span class="absolute -left-3 -top-3 text-blue-200 text-2xl z-0 print:text-xl"><Fa icon={faQuoteLeft} /></span>
    <span class="absolute -right-3 -bottom-3 text-blue-200 text-2xl z-0 print:hidden"><Fa icon={faQuoteRight} /></span>
    <p class="relative z-1">
      Après 4 ans chez Adfinitas, d'abord comme Développeur puis comme Lead Développeur,
      j'ai décidé de vivre de nouvelles expériences.
    </p>
    <p class="relative z-1">
      Passionné, depuis tout jeune, par les nouvelles technologies et le développement,
      j'ai suivi mes études à Epitech.
    </p>
    <p class="relative z-1">
      Je reste toujours à l'affût des nouveautés et je participe régulièrement à
      des projets open-source.
    </p>
    <p class="relative z-1 font-bold">
      Je suis disponible dès le 8 avril, partout en France.
    </p>
  </div>
</div>