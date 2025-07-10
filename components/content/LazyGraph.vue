<template>
  <ClientOnly>
    <div class="flex flex-col items-center">
      <div class="chart-container w-4/5">
        <component
          v-if="chartComponent && chartData"
          :is="chartComponent"
          :data="chartData"
          :options="chartOptions"
          :width="width"
          :height="height"
          loading="lazy"
        />
      </div></div
  ></ClientOnly>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
// @see https://chartjs-plugin-deferred.netlify.app/guide/
import ChartDeferred from "chartjs-plugin-deferred";
import type { ChartTypeRegistry } from "chart.js";
import * as VueChartJS from "vue-chartjs";
// register Chart.js controllers & scales
ChartJS.register(Title, Tooltip, Legend, ChartDeferred);
// define props
const props = defineProps<{
  src: string; // dataset path .json
  chartPath: string; // chart config path
  title?: string;
  width?: number;
  height?: number;
}>();
const chartData = ref();
const chartOptions = ref();
const chartComponent = ref<any>(null);
// import chart-config module
async function loadConfig() {
  // fetch data
  const rawData = await fetch(props.src).then((res) => res.json());
  // load config helper
  const modules = import.meta.glob("../../utils/charts/*.js", { eager: true });
  const key = `../../utils/charts/${props.chartPath}.js`;
  const module = (modules[key] as any)?.default || modules[key];
  if (!module || !module.getChartConfig || !module.getChartType) {
    console.error(`Chart config module not found: ${key}`);
    return;
  }
  const type = module.getChartType();
  const ChartComp = (VueChartJS as any)[
    type.charAt(0).toUpperCase() + type.slice(1)
  ];
  if (!ChartComp) {
    console.error("No component found for type", type);
    return;
  }
  /* build config */
  // get css variables
  const root = getComputedStyle(document.documentElement);
  const primary = root.getPropertyValue("--color-primary").trim();
  const text = root.getPropertyValue("--color-text").trim();
  const background = root.getPropertyValue("--color-background").trim();
  const textInverted = root.getPropertyValue("--color-text-invert").trim();
  const textTransparent = root
    .getPropertyValue("--color-text-transparent")
    .trim();
  const { data, options } = module.getChartConfig(rawData);
  chartComponent.value = ChartComp;
  /* chart data */
  chartData.value = data;
  /* chart options */
  chartOptions.value = {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      ...(options.plugins || {}),
      title: {
        ...(options.plugins?.title || {}),
        display: !!props.title,
        text: props.title,
        color: primary,
        font: { size: 16 },
      },
      legend: {
        ...(options.plugins?.legend || {}),
        labels: {
          ...(options.plugins?.legend?.labels || {}),
          color: text,
        },
      },
      deferred: {
        delay: 200, // delay in ms before the chart is rendered
      },
    },
    scales: {
      ...(options.scales || {}),
      x: {
        ...(options.scales?.x || {}),
        title: {
          ...(options.scales?.x?.title || {}),
          display: true,
          color: text,
        },
        ticks: {
          ...(options.scales?.x?.ticks || {}),
          color: text,
        },
        grid: {
          ...(options.scales?.x?.grid || {}),
          color: textTransparent,
          borderColor: textTransparent,
        },
      },
      y: {
        ...(options.scales?.y || {}),
        title: {
          ...(options.scales?.y?.title || {}),
          display: true,
          color: text,
        },
        ticks: {
          ...(options.scales?.y?.ticks || {}),
          color: text,
        },
        grid: {
          ...(options.scales?.y?.grid || {}),
          color: textTransparent,
          borderColor: textTransparent,
        },
      },
    },
    animation: {
      duration: 1000, // duration of animation in ms
      easing: "easeInOutCubic", // You can change the easing function if desired
    },
    onResize: (chart: any, size: any) => {
      const newPos = size.width < 512 ? "top" : "right";
      chart.options.plugins.legend.position = newPos;
      chart.update();
    },
  };
}
onMounted(() => {
  loadConfig();
});
</script>

<style scoped></style>
