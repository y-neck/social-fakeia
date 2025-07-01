<template>
  <div class="flex flex-col gap-md">
    <h1>
      Audiovisuelle Desinformation auf Social-Media-Plattformen in der Schweiz
    </h1>
    <p>
      Ich habe in meiner Bachelorarbeit untersucht, wie visuelle und
      audiovisuelle Desinformation auf Social-Media-Plattformen in der Schweiz
      produziert und verbreitet werden. Die Erkenntnisse sind beschränkt auf den
      Zeitbereich von 2020 bis 2025, sowie auf die Schweiz. Mehr Informationen
      findest du in der Thesis.
      <br />Im Folgenden sind nun die wichtigsten Erkenntnisse dargestellt:
    </p>
    <section id="general-section">
      <h2>Allgemeine Erkenntnisse</h2>
      <h3>Ursprungsplattform und Themen</h3>
      <p>
        Desinformation wird auf allen möglichen Social-Media-Plattformen
        verbreitet. Insbesondere stechen jedoch Facebook, Telegram und Twitter/X
        hervor.
      </p>
      <p>
        Thematisch wird ebenfalls zu sehr vielen Themen Desinformation
        verbreitet. Jedoch zeichnet sich ein besonders hoher Anteil an politik-
        und gesundheitsbezogenen Themen ab, auch Wissenschafts- und Klimathemen
        leisten einen grossen Beitrag. Dies ist kein Zufall:
      </p>
      <LazyVideoPlayer video-id="" />
      <!-- TODO: Video topics -->
      <p>
        Bei einem Grossteil der Beiträge handelt es sich um statische Bilder und
        Grafiken, Videos werden nur in etwa 20% der Fälle verwendet. Meistens
        bezieht sich Schweizer Desinformation auf Schweizer Themen.
      </p>
    </section>
    <section id="topic-date-dependency">
      <h2>Themen in Abhängigkeit vom Datum</h2>
      <p>
        Hier ist dargestellt, über welche Themen zu welchem Zeitpunkt
        desinformierend berichtet wurde. Die Grösse der Kreise entspricht der
        Anzahl der Beiträge:
      </p>
      <LazyGraph
        src="/data/dataset.json"
        chart-path="topic-date-dependency"
        title="Themen in Abhängigkeit vom Datum"
        :height="350"
      />
      <p>
        Desinformation bezieht sich meistens auf aktuelle Ereignisse. Die
        Themen, über welche berichtet wird,
        <LinkPreview
          url="https://doi.org/10.4324/9781003111474-4"
          class="underline"
          >sind deshalb stark abhängig davon, was die Menschen aktuell gerade
          beschäftigt.</LinkPreview
        >
      </p>
    </section>
    <section id="emotionality">
      <h2>Emotionalisierung</h2>
      <p>
        <LinkPreview url="https://hrcak.srce.hr/250787" class="underline"
          >Beiträge werden oft emotionalisierend gestaltet,</LinkPreview
        >
        um so mehr Aufmerksamkeit zu erregen. Dabei spielen vor allem Wut/Ärger
        und Angst eine Rolle. Aber auch Humor oder Satire wird oft eingesetzt
        für desinformierende Beiträge.<br />
        Die folgende Grafik zeigt dir die Verteilung der Emotionen pro
        Medientyp:
      </p>
      <LazyGraph
        src="/data/dataset.json"
        chart-path="emotionality"
        title="Emotionalisierung der Beiträge"
        :height="350"
      />
      <p>
        Oft fallen die vermittelte Emotionalität des Beitrags und des visuellen
        Begleitmediums zusammen, jedoch nicht in jedem Fall. Oft werden
        humoristische oder sarkastische Beiträge mit visuellen Artefakten
        kombiniert, welche Wut vermitteln.
      </p>
    </section>
    <section id="distribution">
      <h2>Verbreitung</h2>
      <p>
        <LinkPreview
          url="https://doi.org/10.1108/JPBM-12-2018-2155"
          class="underline"
        >
          Desinformation wird durch verschiedene Personengruppen</LinkPreview
        >
        verbreitet. Diese lassen sich einteilen in Einzelpersonen und
        Kollektivakteure, wie beispielsweise Organisationen oder Institutionen.
        <br />
        In den meisten Fällen handelt es sich bei den verbreitenden Accounts um
        Einzelpersonen. Diese gehören unterschiedlichen gesellschaftlichen
        Gruppen an. Besonders Akteure aus Politik, Kultur (unter anderem auch
        Influencerinnen und Influencer) und Journalismus verbreiten
        Desinformation.
      </p>
      <LazyGraph
        src="/data/dataset.json"
        chart-path="distribution"
        title="Verbreitende Akteure"
        :height="350"
      />
    </section>
    <section id="technical-complexity">
      <h2>Technische Komplexität</h2>
      Desinformation beinhaltet oft eigens erstellte Grafiken wie Memes oder
      Bilder mit visuellem Begleittext. Auch unbearbeitete Bilder werden oft
      geteilt, zumeist, indem in einem falschen Kontext über sie berichtet
      wird.<br />
      Desinformierende Videos tauchen in rund 20 % der Fälle auf. Sie sind in
      der Regel unbearbeitet oder beinhalten lediglich einfache Schnitte und
      Grafikeinblendungen.
      <LazyGraph
        src="/data/dataset.json"
        chart-path="technical-complexity"
        title="Technische Komplexität"
        :height="350"
      />
    </section>
    <section id="visual-coherence">
      <h2>Inhaltlicher Zusammenhang</h2>
      Meistens werden entweder wahre visuelle Inhalte durch desinformierenden
      Begleittext aus dem Kontext gerissen und falsch dargestellt, oder sowohl
      das visuelle Artefakt als auch der Begleittext verbreiten Desinformation.
      Über falsche Darstellungen wird selten wahrheitsgemäss berichtet.
      <p>
        Weiter wurde untersucht, in welchem Zusammenhang der Beitragstext zur
        jeweiligen Darstellung steht. Zu erwarten wäre hier, dass diese jeweils
        thematisch zusammenpassen, also beispielsweise zu einem Gesundheitsthema
        eine gesundheitsbezogene Abbildung beigefügt ist:
      </p>
      <LazyGraph
        src="/data/dataset.json"
        chart-path="visual-coherence"
        title="Inhaltlicher Zusammenhang zwischen Beitragstext und visuellem Medium"
        :height="350"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import LazyVideoPlayer from "~/components/content/LazyVideoPlayer.vue";
import LazyGraph from "~/components/content/LazyGraph.vue";

useSeoMeta({
  title: "Untersuchung" /* Page title */,
  ogTitle: "Untersuchung" /* Page title without branding */,
  description: "",
  ogDescription: "",
});
definePageMeta({
  title: "Untersuchung",
  layout: "game-nav",
});
</script>

<style scoped></style>
