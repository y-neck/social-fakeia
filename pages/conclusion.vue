<template>
  <div class="flex flex-col gap-lg">
    <h1 class="self-center">Gratulation!</h1>
    <p class="mx-16 text-center text-wrap">
      Gratulation, du hast es geschafft! In den letzten Minuten hast du dich
      vertieft mit visueller und audiovisueller Desinformation auf Social-Media
      in der Schweiz auseinandergesetzt. Wieviel hast du wohl dabei gelernt?
    </p>
    <span class="text-center">Schauen wir es uns an:</span>
    <div id="conclusion-graph" class="mx-auto h-64 w-full md:h-128">
      <canvas ref="conclusionChartRef"></canvas>
    </div>
    <p class="mx-16 text-center text-wrap">
      Hoffentlich konntest du durch dieses interaktive Spiel deine Kenntnisse zu
      Desinformation auf Social Media verbessern. Bleibe kritisch ;)
    </p>
    <LazyButton
      content="Zurück zur Startseite"
      textStyling="text-primary text-fsize-h2 font-bold"
      id="start-experience-button"
      class="self-center"
      @click="navigateTo('/')"
    ></LazyButton>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import LazyButton from "~/components/common/LazyButton.vue";
import { usePlayTabs } from "~/composables/usePlayTabs";
const { tabs } = usePlayTabs();

ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
);
import {
  generalResult,
  currentDisinformationResult,
  audiovisualDisinformationResult,
  analysisResult,
  type QuizResult,
} from "~/utils/conclusionGraphData";

const conclusionChartRef = ref<HTMLCanvasElement | null>(null);
const quizResults: QuizResult[] = [];

onMounted(() => {
  // load quiz results
  for (const key of Object.keys(sessionStorage)) {
    // extract keys
    const raw = sessionStorage.getItem(key);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      // only keep quiz results items
      if (parsed && typeof parsed.topic === "string") {
        quizResults.push(parsed as QuizResult);
      }
    } catch {
      return;
    }
  }

  // accumulate values for categories
  const selfAssessmentValue = sessionStorage.getItem("selfAssessment");
  const selfAssessment = selfAssessmentValue ? Number(selfAssessmentValue) : 0;

  const quizTopics = [
    "general",
    "current-disinformation",
    "audiovisual-disinformation",
    "results",
  ];
  // lookup table for topics assignments
  const chartLabelsLut = [
    "Allgemein",
    ["Aktuelle", "Desinformation"],
    ["Audiovisuelle", "Desinformation"],
    "Resultate",
  ];

  const data = {
    labels: chartLabelsLut,
    datasets: [
      {
        label: "Selbsteinschätzung",
        data: tabs.value.map(() => selfAssessment),
        // define styling
        fill: true,
        backgroundColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-secondary-transparent"),
        borderColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-secondary"),
        pointBackgroundColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-secondary-transparent"),
        pointBorderColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-text"),
      },
      {
        label: "Dein Ergebnis",
        data: [
          generalResult(quizResults),
          currentDisinformationResult(quizResults),
          audiovisualDisinformationResult(quizResults),
          analysisResult(quizResults),
        ],
        fill: true,
        backgroundColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-primary-transparent"),
        borderColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-primary"),
        pointBackgroundColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-primary-transparent"),
        pointBorderColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--color-text"),
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: "Lernerfolg",
        color: getComputedStyle(document.documentElement).getPropertyValue(
          "--color-text",
        ),
      },
      legend: {
        position: "top",
        labels: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-secondary",
          ),
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-text",
          ),
        },
        grid: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-text",
          ),
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
    deferred: {
      delay: 200,
    },
    animation: {
      duration: 1000, // duration of animation in ms
      easing: "easeInOutCubic", // You can change the easing function if desired
    },
  };
  // instantiate the chart
  if (conclusionChartRef.value) {
    new ChartJS(conclusionChartRef.value, {
      type: "radar",
      data,
      options,
    });
  }
});

useSeoMeta({
  title: "Lernkontrolle" /* Page title */,
  ogTitle: "Lernkontrolle" /* Page title without branding */,
  description: "",
  ogDescription: "",
});
definePageMeta({
  title: "Ziel",
  layout: "default",
});
</script>

<style scoped></style>
