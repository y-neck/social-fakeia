<template>
  <div id="hero" class="flex max-h-screen flex-col items-center">
    <WorldMap
      :mapColor="'#377466'"
      :mapBgColor="'rgb(2, 11, 7)'"
      :lineColor="'#0EA5E9'"
    />
    <div
      id="hero-text"
      class="absolute inset-0 flex flex-col items-center justify-center gap-md self-center p-24 text-center"
    >
      <h1 class="text-6xl font-bold text-text">Wahr oder falsch?</h1>
      <p class="text-fsize-h2 text-text">
        Auf den sozialen Medien begegnet uns täglich eine Vielzahl von
        Inhalten.<br />
        Ist uns dabei bewusst, das längst nicht alles davon wahr ist?
      </p>
      <p class="text-fsize-h2 text-text">
        Wie funktionieren “Fake News” auf Social Media? Erkennst du sie?
        <br />Und wie kannst du herausfinden, was richtig ist und was nicht?
      </p>
      <Button
        content="Starten"
        textStyling="text-primary text-fsize-h2 font-bold"
        id="start-experience-button"
        class="self-center"
        @click="navigateTo('/play/intro')"
      ></Button>
    </div>
  </div>
  <div id="content-container" class="flex flex-col gap-md bg-background">
    <div id="interview-section" class="mx-16 flex flex-col gap-md text-left">
      <h2 class="text-fsize-h2 text-secondary">Experteninterviews</h2>
      <p class="text-text">
        Für dieses Projekt wurden zwei Experteninterviews zum Thema
        Desinformation auf Social Media geführt. Dies sind die Interview-Gäste:
      </p>
      <div class="interview-container">
        <NuxtImg
          src="/img/marko_kovic.webp"
          alt="Interview-Foto"
          class="interview-photo"
          format="webp"
        />
        <div class="interview-card">
          <h3 class="interviewee-name">Marko Ković</h3>
          <p class="interviewee-desc">
            Marko Ković bezeichnet sich selbst als Gesellschaftskritiker. Der
            Sozialwissenschaftler, Autor und Dozent hat Politikwissenschaft und
            Kommunikationswissenschaft studiert und setzt sich damit
            auseinander, wie die Gesellschaft funktioniert und wie sie
            funktionieren sollte. <br /><br />
            <NuxtLink
              to="https://youtu.be/MTyXPrV_4B0"
              target="_blank"
              class="underline"
              >Hier</NuxtLink
            >
            geht es zum ganzen Interview.
          </p>
        </div>
      </div>
    </div>
    <div id="interview-section" class="m-16 flex flex-col">
      <div class="interview-container">
        <NuxtImg
          src="/img/henriette_engbersen.webp"
          alt="Interview-Foto"
          class="interview-photo"
          format="webp"
        />
        <div class="interview-card">
          <h3 class="interviewee-name">Henriette Engbersen</h3>
          <p class="interviewee-desc">
            Henriette Engbersen ist Bereichsleiterin «Public Value» bei der SRG.
            Sie ist dabei involviert in verschiedenen Aufklärungsprojekten zu
            Desinformation. Davor war sie 20 Jahre als Journalistin tätig.
            <br /><br />
            <NuxtLink to="https://youtu.be/fHrg807W0eA" target="_blank" class="underline">Hier</NuxtLink>
            geht es zum ganzen Interview.
          </p>
        </div>
      </div>
    </div>
    <div id="about-section" class="m-16 flex flex-col">
      <Callout icon="graduation-cap">
        <p>
          Diese Website ist als multimediales Projekt im Rahmen meiner
          Bachelorarbeit zum Thema "(Audio-) visuelle Desinformation auf
          Social-Media-Plattformen in der Schweiz" im Studiengang Multimedia
          Production an der Fachhochschule Graubünden entstanden. Hier findest
          du weitere Informationen dazu.
        </p>
        <Button
          content="Mehr erfahren"
          id="about-button"
          textStyling="text-fsize-p"
          class="self-center"
          @click="navigateTo('about')"
        ></Button>
      </Callout>
    </div>
  </div>
</template>

<script setup lang="ts">
import WorldMap from "~/components/ui/world-map/LazyWorldMap.vue";
import Callout from "~/components/layout/LazyCallout.vue";
import Button from "~/components/common/LazyButton.vue";

useSeoMeta({
  title: "Social Fakeia",
  ogTitle: "Social Fakeia" /* Page title without branding */,
  description: "",
  ogDescription: "",
});

definePageMeta({
  layout: "no-padding",
});
</script>

<style scoped>
.interview-container {
  display: flex;
  gap: var(--gap-md);
}
.interview-card {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}
.interview-photo {
  aspect-ratio: 4/3;
  height: 8rem;
  object-fit: cover;
}
.interviewee-name {
  color: var(--color-accent);
  font-size: var(--text-fsize-h3);
}
.interviewee-desc {
  color: var(--color-text);
}
</style>
