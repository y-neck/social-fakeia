<template>
  <div
    class="radio-quiz mx-auto flex w-3/4 flex-col items-center gap-md rounded-xl border-2 border-text p-8"
  >
    <h2 class="quiz-title text-primary">{{ quiz?.title }}</h2>
    <div class="quiz-btn-container flex flex-col gap-xs" ref="quizBtnContainer">
      <button
        v-for="a in quiz?.answers"
        :key="a.answer"
        class="quiz-button"
        @click="select(a)"
        v-show="!answered"
      >
        {{ a.answer }}
      </button>
      <p v-if="answered" class="mt-4 text-center text-fsize-h3 text-accent">
        {{ selectedAnswer?.correctAnswer }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  SelectInteractionContent,
  SelectQuizAnswer,
  RadioQuiz,
} from "~/model/interaction-content";

const props = defineProps<{
  interactionPath: string;
}>();

// current quiz from JSON
const quiz = ref<RadioQuiz | null>(null);
const answered = ref(false);
const selectedAnswer = ref<SelectQuizAnswer | null>(null);

/**
 *  Load quiz from JSON
 * @property {string} interactionPath - path to JSON file holding the quiz data
 * @returns quiz data
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
    quiz.value = (await response.json()) as RadioQuiz;
  } catch (error) {
    console.error(error);
  }
}

const quizBtnContainer = ref<HTMLElement | null>(null);

/**
 * Store selection in sessionStorage
 * @var {string} key - key to store answers in sessionStorage
 * @var {string} value - store if the quiz was answered correctly
 */
function select(a: SelectQuizAnswer) {
  const key = `${quiz.value?.quizId ?? "quiz"}:${quiz.value?.title}`;
  const value = JSON.stringify(a.correct);
  // store kv pair
  sessionStorage.setItem(key, value);
  // set state and show correct answer
  selectedAnswer.value = a;
  answered.value = true;
  // DEBUG:
  console.log(`Stored selection for ${key}:`, a);
}

onMounted(() => {
  loadQuiz();
});
</script>

<style scoped>
.quiz-button {
  padding: 0.5rem 1rem;
  width: 100%;
  color: var(--color-text-invert);
  background-color: var(--color-secondary);
  border-radius: 0.5rem;
  text-align: left;
  border-radius: 1rem;
}
.quiz-button:hover {
  background-color: var(--color-accent);
}
</style>
