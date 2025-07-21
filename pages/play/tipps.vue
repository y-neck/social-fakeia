<template>
  <div class="flex flex-col gap-md">
    <section id="tips-section">
      <h1 class="text-fsize-h1">Tipps zum Umgang mit Desinformation</h1>
      <p>
        Du solltest nun wissen, was Desinformation ist und wie sie verbreitet
        wird. Du hast ausserdem gelernt, wie visuelle und audiovisuelle
        Desinformation auf Social Media-Plattformen in der Schweiz
        funktionieren. <br />
        Nun sollen dir hier noch ein paar Hinweise an die Hand gegeben werden,
        wie du mit desinformierenden Inhalten umgehen und ihre Verbreitung
        begrenzen kannst:
      </p>
      <LazyVideoPlayer
        video-id="rtS9B-Y3mLk"
        title="Video: Tipps gegen Desinformation"
      />
      <ul id="definition-criteria">
        <li>
          <font-awesome-icon icon="share-nodes" class="fa-icon" />
          <span class="list-span">
            Teile niemals Inhalte, bei welchen du nicht sicher bist, ob sie echt
            sind oder nicht.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="handshake" class="fa-icon" />
          <span class="list-span">
            Ist der Inhalt respektvoll oder beleidigend und abwertend? Dann
            teile ihn nicht.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="face-meh-blank" class="fa-icon" />
          <span class="list-span">
            Wird sehr emotional über ein Thema berichtet? Fühlst du dich sogar
            zu irgendwas gedrängt? Dann passe auf und informiere dich weiter.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="user-shield" class="fa-icon" />
          <span class="list-span">
            Wer verbreitet die Nachricht? Stammt sie von einer seriösen Quelle?
          </span>
        </li>
        <li>
          <font-awesome-icon icon="circle-exclamation" class="fa-icon" />
          <span class="list-span">
            Wird ein Problem differenziert betrachtet? Oder wird nur eine Lösung
            präsentiert? Dann solltest du vorsichtig sein.
          </span>
        </li>
        <li>
          <font-awesome-icon icon="user-secret" class="fa-icon" />
          <span class="list-span">
            Stell dir vor, du würdest Desinformation zu diesem Thema verbreiten
            wollen. Wie sähe das aus? Weist der Beitrag möglicherweise ähnliche
            Muster auf?
          </span>
        </li>
        <li>
          <font-awesome-icon icon="magnifying-glass-chart" class="fa-icon" />
          <span class="list-span">
            Gibt es stichhaltige Beweise, welche die Information unterstreichen?
            Oder handelt es sich lediglich um eine Behauptung?
          </span>
        </li>
      </ul>
      <p>
        Mit diesen Hinweisen kannst du in Zukunft entsprechende Inhalte prüfen
        und hast somit Anhaltspunkte, wie du damit umgehen kannst.
      </p>
    </section>
    <LazyButton
      content="Weiter"
      textStyling="text-fSize-p"
      class="mx-auto"
      @click="navigateTo('/conclusion')"
    />
  </div>
</template>

<script setup lang="ts">
import LazyVideoPlayer from "~/components/content/LazyVideoPlayer.vue";
import LazyButton from "~/components/common/LazyButton.vue";

useSeoMeta({
  title: "Tipps" /* Page title */,
  ogTitle: "Tipps" /* Page title without branding */,
  description:
    "Tipps zur Erkennung und Vermeidung von Desinformation auf Social Media.",
  ogDescription:
    "Tipps zur Erkennung und Vermeidung von Desinformation auf Social Media.",
});
definePageMeta({
  title: "Tipps",
  layout: "game",
});

onMounted(() => {
  // Animate-in list items
  document.querySelectorAll("li").forEach((item) => {
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
li:nth-of-type(7) {
  animation-delay: 0.6s;
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
    margin-inline: 1rem;
    gap: 1rem;
  }
  .list-span {
    width: 100%;
    text-align: left;
  }
}
</style>
