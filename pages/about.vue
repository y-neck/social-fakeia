<template>
  <div class="flex flex-col gap-md">
    <h1>About</h1>
    <section id="impressum-section">
      <h2>Impressum</h2>
      <p id="impressum-text">
        Yannick Spriessler<br />
        Breitenstrasse 26<br />
        4416 Bubendorf<br />
        Kontakt:
        <a
          href="mailto:yannick@neckxproductions.ch?subject=Website Social Fakeia"
          >yannick@neckxproductions.ch</a
        >
      </p>
    </section>
    <section id="about-section">
      <h2>Projekt</h2>
      <p>
        In meiner Bachelorarbeit habe ich untersucht, welche Merkmale visuelle
        und audiovisuelle Desinformation auf Social-Media-Plattformen in der
        Schweiz aufweist. Hierfür wurde eine quantitative Inhaltsanalyse von
        durch Faktencheck-Plattformen als Desinformation deklarierten Beiträgen
        durchgeführt, welche anschliessend statistisch ausgewertet wurden.
        <br />
        Diese ergab, dass desinformierende Beiträge auf unterschiedlichen
        Plattformen geteilt werden, primär zu aktuellen Vorkommnissen. In
        Zusammenhang mit Bildern und Videos vermitteln sie die Desinformation
        auf emotionale Weise und können oft nur schwer als Desinformation
        erkannt werden.
        <br /><br />
        Die Erkenntnisse aus der Thesis wurden in Zusammenhang mit
        Experteninterviews verwendet, um diese interaktive Webplattform zur
        Aufklärung und Förderung der Medienkompetenz zu gestalten. Sie soll dir
        helfen, visuelle und audiovisuelle Desinformation besser erkennen und
        einordnen zu können. Wenn du Rückmeldungen dazu hast, darfst du dich
        gerne melden.
      </p>
      <LazyVideoPlayer
        video-id="g2P5muIXgNU"
        styling="w-3/4 self-center"
      /><!-- TODO: Replace video id -->
    </section>
    <section id="download-section" class="items-center pb-4">
      <h2>Download</h2>
      <p class="px-16 text-center text-accent">
        Bald kannst du hier die Thesis herunterladen! Wenn du jetzt schon
        Interesse daran hast, schreibe mir gerne eine Email, um sie dann sofort
        zu erhalten, sobald sie fertig ist.
      </p>
      <!--     <p id="download-text">
        Hier kannst du die Thesis als PDF oder Bib-Eintrag herunterladen:
      </p>
       <div id="download-btns" class="flex w-full justify-center gap-md">
        <Button content="PDF" id="download-button" textStyling="text-fsize-p" />
        <Button
          content="Bib-Referenz"
          id="reference-button"
          textStyling="text-fsize-p"
          @click="toggleReference"
        />
        TODO: PDF
      </div> -->
      <div
        v-show="referenceBtnClicked"
        id="reference-section"
        class="flex w-3/4 flex-col gap-2 self-center rounded-lg border-2 border-text bg-secondary-transparent p-8"
      >
        <!-- TODO: Nice to have: Copy fn -->
        <p class="text-text-transparent">BIB</p>
        <div id="reference" class="flex flex-col">
          <span
            ><p class="text-accent">
              @thesis {spriessler_audiovisual_2025,
            </p></span
          >
          <span class="span-indent">location = {Chur},</span>
          <span class="span-indent"
            >title = {(Audio-)visuelle Desinformation auf
            Social-Media-Plattformen in der Schweiz},</span
          >
          <span class="span-indent"
            >institution = {Fachhochschule Graubünden},</span
          >
          <span class="span-indent">type = {Bachelor's Thesis},</span>
          <span class="span-indent">author = {Spriessler, Yannick},</span>
          <span class="span-indent">year = {2025},</span>
          <span class="span-indent">langid = {german},</span>
          <span>}</span>
        </div>
      </div>
    </section>
    <section id="about-me-section">
      <LazyCallout title="Über mich" icon="user">
        <div class="flex gap-md">
          <NuxtImg
            src="/img/yannick_spriessler.webp"
            alt="Portrait von Yannick Spriessler"
            loading="lazy"
            format="webp"
            class="h-30 rounded-lg"
          />
          <p>
            Mein Name ist Yannick Spriessler. Ich habe von 2022 bis 2025 an der
            Fachhochschule Graubünden Multimedia Production studiert. In meiner
            Bachelorarbeit habe ich mich damit auseinandergesetzt, wie visuelle
            und audiovisulle Desinformation auf Social-Media-Plattformen in der
            Schweiz funktioniert.
            <br /><br />
            Schon länger interessiere ich mich für Politik und gesellschaftliche
            Themen, aber auch für die technischen Aspekte von
            Social-Media-Plattformen. Durch meine Tätigkeiten als Leiter in
            diversen Jugendarbeits-Angeboten liegen mir Jugendliche und junge
            Erwachsene am Herzen, gleichzeitig bekomme ich bei ihnen hautnah
            mit, welchen Einfluss Social Media im Alltag hat, und auch ich
            selbst hinterfrage immer wieder meinen Umgang damit. Aus diesem
            Grund möchte ich dazu beitragen, dass Social-Media-Nutzende sich
            besser mit den Inhalten auseinandersetzen und diese besser einordnen
            können.
          </p>
        </div>
      </LazyCallout>
    </section>
    <section id="nerd-stuff-section">
      <LazyCallout title="Nerd Stuff" icon="glasses">
        <p>
          Now this is where the fun starts ;) Wie ich sehe, bist du genau so ein
          Nerd wie ich – also lass uns anschauen, wie diese Website umgesetzt
          wurde:
        </p>
        <h2 class="text-fsize-h3">Verwendete Technologien</h2>
        <ul id="tech-stack">
          <li>
            <NuxtLink to="https://nuxt.com" target="_blank">• Nuxt</NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://tailwindcss.com" target="_blank"
              >• Tailwind CSS</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://d3js.org/api" target="_blank"
              >• D3.js</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://fontawesome.com/" target="_blank"
              >• Font Awesome</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vercel.com" target="_blank"
              >• Vercel (Hosting)</NuxtLink
            >
          </li>
        </ul>
        <h3 class="text-fsize-p">Components</h3>
        <ul id="components">
          <li>
            <NuxtLink to="https://ui.aceternity.com/" target="_blank"
              >• Aceternity UI</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://ui.nuxt.com" target="_blank"
              >• NuxtUI Components</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://inspira-ui.com/" target="_blank"
              >• Inspira UI</NuxtLink
            >
          </li>
        </ul>
      </LazyCallout>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/common/LazyButton.vue";
import LazyCallout from "~/components/layout/LazyCallout.vue";
import LazyVideoPlayer from "~/components/layout/LazyVideoPlayer.vue";

/* Reference btn */
const referenceBtnClicked = ref(false);
function toggleReference() {
  referenceBtnClicked.value = !referenceBtnClicked.value;
}
/* Download btn */
const downloadBtn = () => {
  window.open("/files/thesis.pdf", "_blank");
};

useSeoMeta({
  title: "Social Fakeia – About",
  ogTitle: "About" /* Page title without branding */,
  description:
    "Hier erfährst du mehr über mein Bachelor-Projekt Social Fakeia.",
  ogDescription:
    "Hier erfährst du mehr über mein Bachelor-Projekt Social Fakeia.",
});
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.span-indent {
  padding-left: 2rem;
}
</style>
