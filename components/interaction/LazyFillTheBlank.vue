<template>
  <div
    class="fill-the-blank-quiz mx-auto flex w-3/4 flex-col items-center gap-md rounded-xl border-2 border-text p-8"
  >
    <h2 class="quiz-title text-center text-primary">{{ quiz?.title }}</h2>
    <div class="quiz-text-container flex w-fit flex-col gap-sm text-wrap">
      <slot />
    </div>
    <LazyButton
      content="Antwort bestätigen"
      textStyling="text-fSize-p"
      class="mx-auto"
      @click="confirmAnswers()"
      ref="quizConfirmBtn"
      v-show="!quizBtnConfirmed"
    />
  </div>
</template>

<script setup lang="ts">
import type {
  FillTheBlankInteractionContent,
  FillTheBlankAnswer,
  FillTheBlankAnswerGroup,
  FillTheBlankQuiz,
} from "~/model/interaction-content";
import LazyButton from "../common/LazyButton.vue";
import DropDown from "../ui/dropdown-menu/DropDown.vue";

const props = defineProps<{
  interactionPath: string;
}>();

// current quiz from json
const quiz = ref<FillTheBlankQuiz | null>(null);
const quizTextContainer = ref<HTMLElement | null>(null);
const quizBtnContainer = ref<HTMLElement | null>(null);
const quizConfirmBtn = ref<HTMLElement | null>(null);
const quizBtnConfirmed = ref(false);
// handling of selected user answers
const selected = reactive<Record<number, string>>({});
const correctness = reactive<Record<number, boolean>>({});
// make available to child components
provide("quiz", quiz);
provide("selected", selected);
provide("confirmed", quizBtnConfirmed);

/**
 *  load quiz from JSON
 * @property {string} interactionPath - path to JSON file holding the quiz data
 * @returns quiz.value data
 */
async function loadQuiz() {
  try {
    const response = await fetch(
      `/interaction-content/${props.interactionPath}.json`,
    );
    if (!response.ok)
      throw new Error(
        ` ${response.statusText},
        failed to load quiz JSON at ${props.interactionPath}`,
      );
    quiz.value = (await response.json()) as FillTheBlankQuiz;
    // initialize selected answers
    quiz.value.answers.forEach((a) => {
      selected[a.answerId] = ""; // initialize with empty string
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * compare the correct answers with the user-selected anwers
 * store the correctness state in sessionStorage and deactivate button
 * @async
 * @returns boolean in sessionStorage
 */
async function confirmAnswers() {
  // check if all blanks were answered
  const allAnswersSelected = quiz.value?.answers.every(
    (answer) => selected[answer.answerId] !== "",
  );
  if (!quiz.value || !allAnswersSelected) return;

  // store correct answers
  const correctMap: Record<number, string> = {};
  quiz.value?.answers.forEach((group) => {
    const correct = group.answersArray.find((answer) => answer.correct === 1);
    // assign correct answer
    correctMap[group.answerId] = correct ? correct.singleAnswer : "";
  });

  // compare user answers to correct answers
  const allAnswers = quiz.value?.answers.map((group) => group.answerId);
  const allMatch = allAnswers.every((id) => {
    const correctGiven = selected[id] === correctMap[id];
    correctness[id] = correctGiven;
    return correctGiven;
  });

  // cooldown before check
  await nextTick();

  // show correctness
  allAnswers.forEach((id) => {
    const trigger = document.querySelector<HTMLElement>(
      `[data-blank-id="${id}"]`,
    );
    if (!trigger) return;
    trigger.classList.toggle("correct", correctness[id]);
    trigger.classList.toggle("incorrect", !correctness[id]);
  });

  // store kv pair in sessionStorage
  const key = `${quiz.value?.quizId}:${quiz.value?.title}`;
  const correctCount = Object.values(correctness).filter(Boolean).length;
  const total = quiz.value?.answers.length;
  const scaled = (correctCount / total) * 5;

  sessionStorage.setItem(
    key,
    JSON.stringify({
      title: quiz.value?.title,
      topic: quiz.value?.topic,
      value: scaled,
    }),
  );

  // disable confirm button
  quizBtnConfirmed.value = true;
}

onMounted(() => {
  loadQuiz();
});
</script>

<style scoped>
.correct {
  color: var(--color-accent);
}
.incorrect {
  color: var(--color-red-600);
}
</style>
