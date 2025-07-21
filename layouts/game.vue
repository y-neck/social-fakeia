<template>
  <Header class="bg-background px-site-spacing" preload />
  <div
    class="bottom-0 flex flex-col gap-md bg-background px-4 md:px-site-spacing font-atkinson text-text"
  >
    <ProgressBar />
    <slot></slot>
  </div>
  <Footer loading="lazy" />
</template>

<style scoped></style>

<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/LazyFooter.vue";
import ProgressBar from "~/components/layout/ProgressBar.vue";
</script>
