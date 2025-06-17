<template>
  <div class="flex flex-col gap-md">
    <Alert
      v-show="!alertClosed"
      ref="start-alert"
      alert-description="Mit der Nutzung dieser Website stimmst du zu, dass die Seite für die volle Funktionalität Daten lokal auf deinem Gerät speichert. Mit dem Schliessen dieses Browser-Tabs werden diese wieder gelöscht."
      cancel-btn-text="Abbrechen"
      confirm-btn-text="Weiter"
      :cancel-btn-action="navigateHome"
      :confirm-btn-action="closeAlert"
    />
    <ProgressBar />
    <section id="msg-section" class="flex flex-col gap-xl">
      <h1 class="sr-only">Intro</h1>
      <span class="msg-bubble animation-target"
        >Stelle dir vor, du sitzt gedankenverloren im Zug und scrollst durch
        deinen Instagram-Feed.</span
      >
      <span class="msg-bubble animation-target"
        >Katzenvideos, Memes, ein Post von deiner Schule oder deiner
        Arbeitsstelle...</span
      >
      <span class="msg-bubble animation-target"
        >Jeden davon schaust du dir nur kurz an.</span
      ><span class="msg-bubble animation-target"
        >Da erscheint plötzlich ein Video, welches deine Aufmerksamkeit auf sich
        zieht: </span
      >
      <span class="msg-bubble animation-target">
        Im Video wird behauptet, dass 5G-Strahlung von Funkantennen Krebs
        verursache.</span
      ><span class="msg-bubble animation-target">
        Du bist dir unsicher; eigentlich hältst du es nicht für wahr... aber
        was, wenn es vielleicht doch stimmt?
      </span>
    </section>
    <section
      id="intro-quiz-section"
      class="animation-target flex w-full flex-col items-center justify-center gap-md"
    >
      <RadioQuiz interaction-path="/interaction-content/intro-quiz.json" />
      <LazyButton
        v-if="!proceedBtnClicked"
        content="Ich möchte mehr über Desinformation erfahren"
        id="proceed-button"
        text-styling="text-fSize-p"
        @click="proceed"
      />
    </section>
    <div id="part-two" v-show="proceedBtnClicked">
      <section id="self-assessment-section fit-content">
        <h2 class="text-center">
          Wie schätzt du deine Kenntnis bezüglich Desinformation ein?
        </h2>
        <input
          id="self-assessment-slider"
          class="accent-accent"
          type="range"
          name="self-assessment"
          min="1"
          max="5"
          v-model="selfAssessmentSliderValue"
          @change="storeSelfAssessmentValue(selfAssessmentSliderValue)"
        />
        <span
          id="self-assessment-value"
          class="mb-4 text-center text-fsize-h1 text-accent"
        >
          {{ selfAssessmentSliderValue }}</span
        >
      </section>
      <section id="relevance-section" class="flex flex-col">
        <p>
          Warum solltest du dich überhaupt mit Desinformation auseinandersetzen?
          Soll doch jeder und jede glauben, was er oder sie will, oder nicht?
          <br />
          Nun, nicht ganz. Desinformation kann gravierende Folgen haben; für
          dich, die Gesellschaft und unser generelles Miteinander.
        </p>
        <LazyVideoPlayer video-id="" />
        <p>
          Auf den nächsten Seiten erfährst du mehr über Desinformation auf
          Social-Media-Plattformen in der Schweiz.
        </p>
        <LazyButton
          content="Weiter"
          textStyling="text-fSize-p"
          class="self-center"
          @click="navigateTo('/play/current_disinformation')"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Alert from "~/components/common/Alert.vue";
import { useRouter } from "vue-router";
import ProgressBar from "~/components/layout/ProgressBar.vue";
import LazyButton from "~/components/common/LazyButton.vue";
import RadioQuiz from "~/components/interaction/LazyRadioQuiz.vue";
import LazyVideoPlayer from "~/components/layout/LazyVideoPlayer.vue";

/* TODO: Animation */

/* Alert */
const router = useRouter();
const alertClosed = ref(false);

function closeAlert() {
  alertClosed.value = true;
}
function navigateHome() {
  router.push("/");
}

/* proceed button */
const proceedBtnClicked = ref(false);
function proceed() {
  proceedBtnClicked.value = true;
}

/* self assessment slider */
const selfAssessmentSliderValue = ref(3);
/* store self assessment value */
function storeSelfAssessmentValue(value: number) {
  sessionStorage.setItem("selfAssessment", value.toString());
}

useSeoMeta({
  title: "Intro",
  ogTitle: "Intro" /* Page title without branding */,
});
definePageMeta({
  title: "Intro",
});
</script>

<style scoped>
.msg-bubble {
  margin-inline: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  color: var(--color-text-invert);
  width: fit-content;
}
</style>
