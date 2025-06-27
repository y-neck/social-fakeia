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
    <section id="topical-date-dependency">
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
        Desinformation bezieht sich meistens auf aktuelle Ereignisse. Die Themen
        sind deshalb stark abhängig davon, was die Menschen aktuell gerade
        beschäftigt.
      </p>
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
