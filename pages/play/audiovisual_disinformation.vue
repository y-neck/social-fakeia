<template>
  <div class="flex flex-col gap-md">
    <h1>Audiovisuelle Desinformation</h1>
    <LazyCallout title="Audiovisuelle Desinformation" icon="camera" preload>
      <p>
        Unter (audio-) visueller Desinformation versteht man alle Formen von
        Desinformation, bei welchen desinformierende Bilder (visuell) oder
        Videos (audiovisuell) eingesetzt werden. Dies kann ein Bild oder Video
        für sich sein, oder auch in Verbindung mit einem Begleittext auftauchen.
      </p>
    </LazyCallout>
    <p>
      Meistens handelt es sich bei visueller und audiovisueller Desinformation
      um
      <LazyLinkPreview
        url="https://demtech.oii.ox.ac.uk/wp-content/uploads/sites/12/2021/01/CyberTroop-Report-2020-v.2.pdf"
        class="underline"
        >bearbeitete oder in einem falschen Kontext dargestellte Bilder oder
        Videos.</LazyLinkPreview
      >
      Weitere Formen sind
      <LazyLinkPreview
        url="https://doi.org/10.1177/14614448221141648"
        class="underline"
        >irreführende Grafiken, welche Tatsachen falsch darstellen, sowie in den
        letzten Jahren vermehrt auch KI-generierte Deepfakes,</LazyLinkPreview
      >
      bei welchen Menschen falsch dargestellt werden und ihnen somit falsche
      Aussagen unterstellt werden können.
    </p>
    <section class="examples" loading="lazy">
      <div class="examples-inner bg-background">
        <NuxtImg
          src="img/Ex1.webp"
          alt="Beispiel 1"
          class="example-img"
          format="webp"
          loading="lazy"
          height="300"
        />
        <NuxtImg
          src="img/Ex2.webp"
          alt="Beispiel 2"
          class="example-img"
          format="webp"
          loading="lazy"
          height="300"
        />
        <NuxtImg
          src="img/Ex3.webp"
          alt="Beispiel 3"
          class="example-img"
          format="webp"
          loading="lazy"
          height="300"
        />
        <NuxtImg
          src="img/Ex4.webp"
          alt="Beispiel 4"
          class="example-img"
          format="webp"
          loading="lazy"
          height="300"
        />
      </div>
    </section>
    <p>
      Menschen können sich
      <LazyLinkPreview
        url="https://pnas.org/doi/full/10.1073/pnas.95.5.2703"
        class="underline"
        >oft besser an visuelle Informationen erinnnern als an
        Text.</LazyLinkPreview
      >
      Visuelle Inhalte werden weiter meistens eher als wahr angenommen und es
      wird ihnen eine höhere Glaubwürdigkeit zugeschrieben. <br />
      Ausserdem lösen Bilder und Videos meist eine stärkere emotionale Reaktion
      aus als Text. Die emotionale Reaktion hat einen Einfluss auf die
      <LazyLinkPreview
        url="https://doi.org/10.1207/s15506878jobem4901_3"
        class="underline"
        >Aufmerksamkeit, Wahrnehmung und Erinnerung, und kann die
        Meinungsbildung der Zuschauerinnen und Zuschauer
        beeinflussen.</LazyLinkPreview
      >
      Dadurch stellt visuelle und audiovisuelle Desinformation nochmals eine
      besondere Gefahr dar.
    </p>
    <LazyVideoPlayer
      video-id="s9iYilODevs"
      title="Video: Audiovisuelle Desinformation"
    />
    <LazyRadioQuiz
      interaction-path="audiovisual-disinformation-quiz"
      script-path="/timestamps/audiovisual-disinformation.json"
    />
    <LazyButton
      content="Weiter"
      textStyling="text-fSize-p"
      @click="navigateTo('/play/analysis')"
      class="self-center"
    >
      Weiter
    </LazyButton>
  </div>
</template>

<script setup lang="ts">
import LazyCallout from "~/components/layout/LazyCallout.vue";
import LazyVideoPlayer from "~/components/content/LazyVideoPlayer.vue";
import LazyRadioQuiz from "~/components/interaction/LazyRadioQuiz.vue";
import LazyButton from "~/components/common/LazyButton.vue";
import LazyLinkPreview from "~/components/ui/link-preview/LazyLinkPreview.vue";

useSeoMeta({
  title: "Audiovisuelle Desinformation" /* Page title */,
  ogTitle: "Audiovisuelle Desinformation" /* Page title without branding */,
});
definePageMeta({
  title: "Audiovisuelle Desinformation",
  layout: "game",
});

onMounted(() => {
  // Animate-in images
  const images = document.querySelectorAll(".example-img");
  images.forEach((img) => {
    img.classList.add("animate");
  });
});
</script>

<style scoped>
.examples {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px; /* fixed image height */
  margin: 2rem auto;
}

.examples-inner {
  position: relative; /* moved from .examples */
  width: 100%;
  height: 300px; /* fixed image height */
}

.example-img {
  position: absolute;
  top: 50%;
  transform-origin: center center;
  height: 300px;
  transition:
    transform 0.2s ease-in-out,
    z-index 0s;
}
@keyframes slide-up {
  from {
    transform: translateY(200%) rotate(var(--img-rot));
    opacity: 0;
  }
  to {
    transform: translateY(-50%) rotate(var(--img-rot));
    opacity: 1;
  }
}
.example-img.animate {
  animation: slide-up 0.4s ease-in-out forwards; /* forwards: make sure animation plays only once */
}

/* Position & stack each image */
.example-img:nth-of-type(1) {
  left: 0%;
  z-index: 1;
  --img-rot: -2deg;
  animation-delay: 0s;
}
.example-img:nth-of-type(2) {
  left: 25%;
  z-index: 2;
  --img-rot: 1.5deg;
  animation-delay: 0.1s;
}
.example-img:nth-of-type(3) {
  left: 50%;
  z-index: 3;
  --img-rot: -1.5deg;
  animation-delay: 0.2s;
}
.example-img:nth-of-type(4) {
  left: 75%;
  z-index: 4;
  --img-rot: 2deg;
  animation-delay: 0.3s;
}

@media (max-width: 480px) {
  .example-img:nth-of-type(3) {
    display: none;
  }
}
</style>
