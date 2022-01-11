<script>
  import { faCheck } from "@fortawesome/free-solid-svg-icons";
  import TimelineItem from "$lib/components/TimelineItem.svelte";
</script>

<ul class="-mb-8 print:-mb-4">
  <TimelineItem>
    <svelte:fragment slot="title">
      Lead Developer / Tech Lead chez
      <a href="https://adfinitas.fr" target="_blank" class="text-blue-400">Adfinitas</a>
    </svelte:fragment>
    <ul slot="description">
      <li>Manager du pôle technique/dév, d'une équipe de 5 développeurs et des freelances en missions.</li>
      <li>Accompagnement des équipes marketings et des clients sur leurs projets.</li>
      <li>Développement et architecture de différents projets internes comme externes pour les clients.</li>
    </ul>
    <svelte:fragment slot="date">
      <time datetime="2020-08-01">Oct 20</time>
      <strong class="text-gray-200">—</strong>
      <time datetime="2022-04-08">Avr 22</time>
      <span class="text-gray-400">(1 an 6 mois)</span>
    </svelte:fragment>
  </TimelineItem>
  <TimelineItem icon={faCheck} iconColor="bg-green-500">
    <svelte:fragment slot="title">
      Obtention de mon diplôme Architecte Développeur Logiciel à
      <a href="https://epitech.eu" target="_blank" class="text-blue-400">Epitech</a>
    </svelte:fragment>
    <p slot="description">
      Après 5 ans d'études et un cumul de plus de 3 ans d'expériences professionnelles.
    </p>
    <time datetime="2020-09-01" slot="date">Sep 20</time>
  </TimelineItem>
  <TimelineItem>
    <svelte:fragment slot="title">
      Développeur Fullstack et Data Engineer chez
      <a href="https://adfinitas.fr" target="_blank" class="text-blue-400">Adfinitas</a>
    </svelte:fragment>
    <p slot="description">Réalisation de divers outils internes.</p>
    <svelte:fragment slot="date">
      <time datetime="2018-04-01">Avr 18</time>
      <strong class="text-gray-200">—</strong>
      <time datetime="2020-09-01">Sep 20</time>
      <span class="text-gray-400">(2 ans 6 mois)</span>
    </svelte:fragment>
  </TimelineItem>
  <TimelineItem>
    <svelte:fragment slot="title">
      Data Engineer chez
      <a href="https://laredoute.fr" target="_blank" class="text-blue-400">La Redoute</a>
    </svelte:fragment>
    <p slot="description">Aide à la mise en place du système de recommendation de produits personnalisées.</p>
    <svelte:fragment slot="date">
      <time datetime="2017-11-01">Nov 17</time>
      <strong class="text-gray-200">—</strong>
      <time datetime="2018-04-01">Avr 18</time>
      <span class="text-gray-400">(6 mois)</span>
    </svelte:fragment>
  </TimelineItem>
  <TimelineItem>
    <svelte:fragment slot="title">
      Formateur au développement web pour
      <a href="https://epitech.eu" target="_blank" class="text-blue-400">Epitech</a>
    </svelte:fragment>
    <p slot="description">Formation à la programmation web : HTML, CSS, PHP et WordPress à des étudiants.</p>
    <time datetime="2017-11-01" slot="date">Juil 17</time>
  </TimelineItem>
  <TimelineItem>
    <svelte:fragment slot="title">
      Développeur Fullstack chez
      <a href="https://www.nuukik.com/" target="_blank" class="text-blue-400">Nuukik</a>
    </svelte:fragment>
    <ul slot="description">
      <li>Développement de plugins pour Magento, Prestashop et Drupal pour l'intégration à la platforme
        Nuukik.
      </li>
      <li>Aide à la réalisation du système de recommendation de produits personnalisées.</li>
    </ul>
    <svelte:fragment slot="date">
      <time datetime="2017-07-01">Juil 16</time>
      <strong class="text-gray-200">—</strong>
      <time datetime="2017-12-01">Dec 16</time>
      <span class="text-gray-400">(6 mois)</span>
    </svelte:fragment>
  </TimelineItem>
  <TimelineItem displayLateralBar={false}>
    <svelte:fragment slot="title">
      Création de mon auto-entreprise comme développeur fullstack
    </svelte:fragment>
    <p slot="description">Pendant plus d'un 1 an et demi et un total de 5 projets pour divers clients. </p>
    <svelte:fragment slot="date">
      <time datetime="2016-05-01">Mai 16</time>
      <strong class="text-gray-200">—</strong>
      <time datetime="2017-11-01">Nov 17</time>
      <span class="text-gray-400">(1 an 7 mois)</span>
    </svelte:fragment>
  </TimelineItem>
</ul>