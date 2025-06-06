<template>
  <div id="hero" class="flex flex-col items-center">
    <WorldMap :mapColor="'#377466'" :mapBgColor="'rgb(2, 11, 7)'" />
    <div
      class="absolute inset-0 flex flex-col items-center justify-center gap-md self-center p-24 text-center"
    >
      <h1 class="text-6xl font-bold text-text">Wahr oder falsch?</h1>
      <p class="text-fsize-h2 text-text">
        Auf den sozialen Medien begegnet uns täglich eine Vielzahl von Inhalten.
        Ist uns dabei bewusst, das längst nicht alles davon wahr ist?
      </p>
      <p class="text-fsize-h2 text-text">
        Wie funktionieren “Fake News” auf Social Media? Erkennst du sie? Und wie
        kannst du herausfinden, was richtig ist und was nicht?
      </p>
    </div>
  </div>
  <div id="content-container" class="flex flex-col items-center bg-background">
    <div id="interview-section" class="m-16 flex flex-col"></div>
    <div id="about-section" class="m-16 flex flex-col"></div>
  </div>
</template>

<script setup lang="ts">
import WorldMap from "~/components/ui/world-map/WorldMap.vue";

useSeoMeta({
  title: "Social Fakeia",
  ogTitle: "" /* Page title without branding */,
  ogSiteName: "Social Fakeia",
  ogType: "website",
  description: "",
  ogDescription: "",
  creator: "Yannick Spriessler",
  robots: "index, follow",
  ogImage: "" /* Image for sharing */,
});

definePageMeta({
  layout: "no-padding",
});
</script>

<style scoped></style>
