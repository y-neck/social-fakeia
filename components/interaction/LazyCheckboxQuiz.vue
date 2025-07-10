<template>
  <div
    class="checkbox-quiz mx-auto flex w-3/4 flex-col items-center gap-md rounded-xl border-2 border-text p-8"
  >
    <h2 class="quiz-title text-center text-primary">{{ quiz?.title }}</h2>
    <div
      class="quiz-checkbox-container flex w-fit flex-col gap-xs"
      ref="quizCheckboxContainer"
    >
      <div
        class="answer flex w-fit gap-md"
        v-for="a in quiz?.answers"
        :key="a.answer"
      >
        <input
          :name="a.answer"
          type="checkbox"
          :id="a.answer"
          class="quiz-checkbox text-left"
        />
        <label :for="a.answer" class="quiz-checkbox-label">{{
          a.answer
        }}</label>
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
  </div>
</template>

<script setup lang="ts">
import type {
  SelectInteractionContent,
  CheckboxQuizAnswer,
  CheckboxQuiz,
} from "~/model/interaction-content";
import LazyButton from "../common/LazyButton.vue";
const props = defineProps<{
  interactionPath: string;
}>();
// current quiz from JSON
const quiz = ref<CheckboxQuiz | null>(null);
const quizCheckboxContainer = ref<HTMLElement | null>(null);
const quizConfirmBtn = ref<HTMLElement | null>(null);
const quizBtnConfirmed = ref(false);
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
    quiz.value = (await response.json()) as CheckboxQuiz;
  } catch (error) {
    console.error(error);
  }
}
/**
 * store answers in sessionStorage and deactivate button
 * @property {Array<QuizAnswer>} answers - user answers
 * @property {Array<QuizAnswer>} correctAnswers - correct answers
 * @property {string} key - key to store answers in sessionStorage
 * @property {boolean} matchingAnswers - store if the quiz was answered correctly
 */
function confirmAnswers() {
  if (!quiz.value || !quizCheckboxContainer.value) return;
  // retrieve user answers
  const correctAnswers = quiz.value?.answers.map((a) => a.correct);
  const answers = Array.from(
    quizCheckboxContainer.value?.querySelectorAll<HTMLInputElement>(
      "input[type=checkbox]",
    ),
  );
  const userAnswers = answers.map((cb) => (cb.checked ? 1 : 0));
  // count matches between user answers and correct answers and map to 0-5
  const correctCount = userAnswers.reduce<number>(
    (sum, bit, i) => sum + (bit === correctAnswers[i] ? 1 : 0),
    0,
  );
  const total = correctAnswers.length;
  const scaled = (correctCount / total) * 5;
  // mark correctly answered
  answers?.forEach((answer, id) => {
    const label = quizCheckboxContainer.value!.querySelector<HTMLLabelElement>(
      `label[for="${CSS.escape(answer.id)}"]`,
    )!;
    (answer.checked ? 1 : 0) === correctAnswers[id]
      ? label.classList.add("correct")
      : label.classList.add("incorrect");
  });
  // store kv pair
  const key = `${quiz.value?.quizId ?? "quiz"}:${quiz.value?.title}`;
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
