<template>
  <Header preload class="px-site-spacing" />
  <div
    class="bottom-0 flex flex-col gap-md bg-background px-site-spacing font-atkinson text-text"
  >
    <slot></slot>
  </div>
  <Footer loading="lazy" />
</template>

<style scoped></style>

<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/LazyFooter.vue";
</script>
