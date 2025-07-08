<template>
  <div class="flex flex-col gap-md">
    <h1>Aktuelle Desinformation</h1>
    <section id="definition-section">
      <LazyCallout
        title="«Aktuelle Desinformation» – Häääää?!"
        icon="clipboard-question"
      >
        <p>
          Vielleicht fragst du dich, was mit diesem Begriff gemeint ist?
          Wesentlich gängiger ist der Begriff Fake News –
          <LinkPreview
            url="https://doi.org/10.1080/0020174X.2018.1508363"
            class="underline"
            >Dieser wird jedoch in der Wissenschaft seltener
            verwendet</LinkPreview
          >, da er oft als politisches Schlagwort genutzt wird. Auf dieser
          Website wird deshalb der Begriff der aktuellen Desinformation
          gebraucht.
        </p>
      </LazyCallout>
      <Quote
        id="definition-quote"
        src="https://doi.org/10.1515/9783110679885-008"
        src-name="Kohring & Zimmermann (2020, S. 1)"
      >
        [Desinformation ist] Kommunikation wissentlich und empirisch falscher
        Informationen zu neuen und relevanten Sachverhalten mit dem Anspruch auf
        Wahrheit.
      </Quote>
      <p>
        Für den Begriff der (audiovisuellen) Desinformation gibt es verschiedene
        Definitionen, welche in der Wissenschaft bisher noch nicht einstimmig
        geklärt sind. Die folgenden Kriterien,
        <LinkPreview
          url="https://doi.org/10.1515/9783110679885-008"
          class="underline"
        >
          basierend auf Kohring und Zimmermann (2020),
        </LinkPreview>
        helfen, aktuelle Desinformation einzuordnen:
      </p>
      <ul id="definition-criteria">
        <li>
          <font-awesome-icon icon="newspaper" class="fa-icon" />
          <span class="list-span">
            <b>(Visuelle) Kommunikation: </b>Es wird auf visuelle oder andere
            Weise über ein Thema berichtet. Diese Mitteilung ist potentiell
            glaubwürdig.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="fire" class="fa-icon" />
          <span class="list-span">
            <b>Aktualitätsbezug: </b>Es handelt sich um ein brisantes und
            überraschendes Thema, welches grosse Auswirkungen auf die
            Gesellschaft haben kann.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="hand-peace" class="fa-icon" />
          <span class="list-span">
            <b>Wahrheitsanspruch: </b>Die Nachricht vermittelt, dass ihr Inhalt
            wahr ist und stellt einen Anspruch an die Zuschauenden, so
            aufgenommen zu werden.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="magnifying-glass" class="fa-icon" />
          <span class="list-span">
            <b>Unwahrheit: </b>Der Inhalt der Mitteilung ist überprüfbar falsch,
            löst den eigenen Wahrheitsanspruch nicht ein und ist somit
            irreführend.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="square-xmark" class="fa-icon" />
          <span class="list-span">
            <b>Unwahrhaftigkeit: </b>Die Produzierenden und Verbreitenden des
            Inhalts sind sich bewusst, dass die Mitteilung nicht stimmt.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="user-secret" class="fa-icon" />
          <span class="list-span">
            <b>Täuschungsabsicht: </b>Die falschen Informationen werden bewusst
            und absichtlich verbreitet.
          </span>
        </li>
      </ul>
    </section>
    <ClientOnly
      ><LazyVideoPlayer
        video-id="mUZj5iC0YoA"
        script-path="/timestamps/definition-comment.json"
    /></ClientOnly>
    <section id="definition-quiz-section">
      <LazyRadioQuiz interaction-path="definition-quiz" />
    </section>
    <LazyButton
      content="Weiter"
      textStyling="text-fSize-p"
      class="mx-auto"
      @click="navigateTo('/play/current_disinformation')"
    />
  </div>
</template>

<script setup lang="ts">
import ProgressBar from "~/components/layout/ProgressBar.vue";
import LazyCallout from "~/components/layout/LazyCallout.vue";
import LinkPreview from "~/components/ui/link-preview/LazyLinkPreview.vue";
import Quote from "~/components/Other/Quote.vue";
import LazyVideoPlayer from "~/components/content/LazyVideoPlayer.vue";
import LazyRadioQuiz from "~/components/interaction/LazyRadioQuiz.vue";
import LazyButton from "~/components/common/LazyButton.vue";

useSeoMeta({
  title: "Was ist aktuelle Desinformation?" /* Page title */,
  ogTitle: "Was ist aktuelle Desinformation?" /* Page title without branding */,
  description: "",
  ogDescription: "",
});
definePageMeta({
  title: "Definition",
  layout: "game",
});

onMounted(() => {
  // Animate-in list items
  document.querySelectorAll("#definition-criteria li").forEach((item) => {
    item.classList.add("animate");
  });
});
</script>

<style scoped>
ul {
  margin-inline: auto;
}
li {
  list-style-type: disc;
  margin-inline: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-block: calc(var(--spacing) * 2) /* 0.5rem = 8px */;
  align-items: center;
  /* initial state for animation */
  opacity: 0;
  transform: translateX(-10%);
}

/* staggered animation */
li:nth-of-type(1) {
  animation-delay: 0s;
}
li:nth-of-type(2) {
  animation-delay: 0.1s;
}
li:nth-of-type(3) {
  animation-delay: 0.2s;
}
li:nth-of-type(4) {
  animation-delay: 0.3s;
}
li:nth-of-type(5) {
  animation-delay: 0.4s;
}
li:nth-of-type(6) {
  animation-delay: 0.5s;
}

@keyframes slide-in {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

li.animate {
  animation-name: slide-in;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
.list-span {
  width: calc(3 / 4 * 100%) /* 75% */;
  text-align: center;
}

.fa-icon {
  font-size: var(--text-fsize-h1) /* 2rem = 32px */;
  color: var(--color-accent);
}

@media (width >= 48rem /* 768px -> md */) {
  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    display: flex;
    flex-direction: row;
    align-items: left;
    gap: 1rem;
  }
  .list-span {
    width: 100%;
    text-align: left;
  }
}
</style>
