<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="w-fit rounded-md bg-bg-transparent p-1"
      :class="{
        correct: selected[answerId] === correctAnswer,
        incorrect:
          selected[answerId] !== '' && selected[answerId] !== correctAnswer,
      }"
      :data-blank-id="answerId.toString()"
    >
      {{ answerText || "Wähle..." }}
    </DropdownMenuTrigger>
    <DropdownMenuContent
      v-model="answerText"
      class="rounded-md bg-background p-1 text-text"
    >
      <!-- @select="answerText = option.singleAnswer" – replace default answer with selected -->
      <DropdownMenuItem
        v-for="option in options"
        :key="option.singleAnswer"
        :value="option.singleAnswer"
        class="hover:text-text-invert"
        @select="answerText = option.singleAnswer"
      >
        {{ option.singleAnswer }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { FillTheBlankQuiz } from "~/model/interaction-content";

const props = defineProps<{
  answerId: number;
}>();

// inject quiz and shared selection map
const quiz = inject("quiz") as Ref<FillTheBlankQuiz | null>;
const selected = inject("selected") as Record<number, string>;

// pull answersArray for slot
const options = computed(() => {
  const group = quiz.value?.answers.find(
    (group) => group.answerId === props.answerId,
  );
  return group?.answersArray ?? [];
});

// figure out which singleAnswer is correct
const correctAnswer = computed(() => {
  const grp = quiz.value?.answers.find((g) => g.answerId === props.answerId);
  return grp?.answersArray.find((opt) => opt.correct === 1)?.singleAnswer!;
});

// answerText v-model proxy to bind directly into shared map
const answerText = ref(selected[props.answerId]);
watch(answerText, (value) => {
  selected[props.answerId] = value;
});
watch(
  () => selected[props.answerId],
  (value) => {
    answerText.value = value;
  },
);
</script>

<style scoped>
.correct {
  color: var(--color-accent);
}
.incorrect {
  color: var(--color-red-600);
}
</style>
